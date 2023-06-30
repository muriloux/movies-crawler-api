import { delay } from "../helpers";
import { Proxy } from "../services/proxy";
import { Crawler } from "../types";
import { puppeteerInstance } from "../puppeteer/initPuppeteer";

const proxy = new Proxy();
export class notWokeShows implements Crawler {
  showsNames: string[] = [];
  showsAmount: number | null = null;

  async crawl() {
    return await proxy.useProxy(async () => {
      const { browser, page } = await puppeteerInstance()
      console.log('[crawler] @nws started');
      await page.goto('https://www.notwokeshows.com/');

      const movieNames: Set<string> = new Set(); // Use a Set instead of an array
      let currentPage = 1;

      while (true) {


        // Close modal
        await page.waitForSelector("#dmPopup");
        await delay(2000);
        await page.keyboard.press("Escape");

        // Wait for the movie names to load
        await page.waitForSelector('.business-directory__item-name');

        // Extract pages amount
        const pagesAmount = await page.$eval('ul.business-directory__pagination li:last-child a', (el) => {
          return el.textContent as string;
        });


        // Extract movie names on the current page
        const namesOnPage = await page.$$eval('div.business-directory__item-name', (elements: HTMLDivElement[]) => {
          return elements.map((el) => (el.textContent as string).trim())
        });

        namesOnPage.forEach((name) => movieNames.add(name));
        console.clear()
        console.log(`[crawler] (${currentPage}/${pagesAmount}) @nws: ${movieNames.size} movies`)

        // Check if there's a next page
        const nextPageLink = await page.$('.business-directory__pagination .active + li a');
        if (!nextPageLink) {
          break;
        }

        // Navigate to the next page
        await nextPageLink.click();
        await delay(2000);

        // Wait for the page to load
        await page.waitForSelector('.business-directory__item-name');
        currentPage++;
      }

      await browser.close();

      this.showsAmount = movieNames.size;
      this.showsNames = [...movieNames];

      console.log('[crawler] @nws done');

      return movieNames;
    });
  }

  getShowsNames(): string[] {
    if (this.showsNames.length === 0) {
      console.log('No shows found. use .crawl().then(() => shows.getShowsNames()) to get them');
      return [];
    }
    return this.showsNames
  }

  getShowsAmount(): number | null {
    if (this.showsAmount === null) {
      console.log('No shows found. use .crawl().then(() => shows.getShowsAmount()) to get them');
      return null;
    }
    return this.showsAmount
  }
}
