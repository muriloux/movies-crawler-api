import { Crawler } from "../shared/types";
import { puppeteerInstance } from "../shared/puppeteer/initPuppeteer";
import { ProxyService } from "../shared/services/proxy";
import { delay } from "../shared/helpers/";

const proxy = new ProxyService();
export class NotWokeShows implements Crawler {
  name: string = "Not Woke Shows";
  alias: string = "nws";
  url: string = "https://www.notwokeshows.com/";
  shows: string[] = [];
  showsAmount: number | null = null;

  async crawl() {
    return await proxy.useProxy(async () => {
      const { browser, page } = await puppeteerInstance();
      console.log("[crawler] @nws started");
      await page.goto("https://www.notwokeshows.com/");

      //add event listener on scroll

      await page.evaluate(() => {
        //@ts-ignore
        window.scrollEvent = false;

        const scrollEventTrue = () => {
          //@ts-ignore
          window.scrollEvent = true;
        };
        document.addEventListener("scroll", scrollEventTrue);
      });

      const movieNames: Set<string> = new Set(); // Use a Set instead of an array
      let currentPage = 1;

      while (true) {
        // Close modal
        await page.waitForSelector("#dmPopup");
        await delay(2000);
        await page.keyboard.press("Escape");

        // Wait for the movie names to load
        await page.waitForSelector(".business-directory__item-name");

        // Extract pages amount
        const pagesAmount = await page.$eval(
          "ul.business-directory__pagination li:last-child a",
          (el) => {
            return el.textContent as string;
          }
        );

        // Extract movie names on the current page
        const namesOnPage = await page.$$eval(
          "div.business-directory__item-name",
          (elements: HTMLDivElement[]) => {
            return elements.map((el) => (el.textContent as string).trim());
          }
        );

        namesOnPage.forEach((name) => movieNames.add(name));
        console.log(
          `[crawler] (${currentPage}/${pagesAmount}) @nws: ${movieNames.size} movies`
        );

        // Check if there's a next page
        const nextPageLink = await page.$(
          ".business-directory__pagination .active + li a"
        );
        if (!nextPageLink) {
          break;
        }

        // Navigate to the next page
        await nextPageLink.click();

        //replace with promise based on scroll event

        await page.waitForFunction(() => {
          //@ts-ignore
          if (window.scrollEvent) {
            //@ts-ignore
            window.scrollEvent = false;
            //@ts-ignore
            return window.scrollEvent !== true;
          }
        });
        //await delay(2000);

        // Wait for the page to load
        await page.waitForSelector(".business-directory__item-name");
        currentPage++;
      }

      await browser.close();

      this.showsAmount = movieNames.size;
      this.shows = [...movieNames];

      console.log("[crawler] @nws done");

      return movieNames;
    });
  }

  getShows(): string[] {
    if (this.shows.length === 0) {
      console.log(
        "No shows found. use .crawl().then(() => shows.getShowsNames()) to get them"
      );
      return [];
    }
    return this.shows;
  }

  getShowsAmount(): number | null {
    if (this.showsAmount === null) {
      console.log(
        "No shows found. use .crawl().then(() => shows.getShowsAmount()) to get them"
      );
      return null;
    }
    return this.showsAmount;
  }
}
