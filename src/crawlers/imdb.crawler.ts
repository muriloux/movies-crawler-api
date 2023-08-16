import puppeteer from "puppeteer";
import { Crawler } from "../shared/types";
import { puppeteerInstance } from "../shared/puppeteer/initPuppeteer";
import { ProxyService } from "../shared/services/proxy";

const proxy = new ProxyService();
export class Imdb implements Crawler {
  name: string = "";
  alias: string = "";
  url: string = "";
  shows: string[] = [];
  showsAmount: number | null = null;

  constructor(url: string) {
    this.url = url;
    const listName = url.match(/ls(\d+)/);
    if (listName) {
      this.name = "IMDB - " + listName[0];
      this.alias = listName[0];
    }
  }

  async crawl() {
    return await proxy.useProxy(async () => {
      const { browser, page } = await puppeteerInstance();
      console.log(`[crawler] @imdb/${this.alias} started`);

      const movieNames = new Set<string>();

      try {
        await page.goto(this.url);

        let hasNextPage = true;

        while (hasNextPage) {
          const movieElements = await page.$$(
            ".lister-item-content h3.lister-item-header a"
          );

          for (const movieElement of movieElements) {
            const movieName = await movieElement.evaluate(
              (element) => element.textContent
            );
            movieNames.add(movieName as string);
          }

          await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
          });

          hasNextPage = await page.evaluate(() => {
            const nextPageButton = document.querySelector(
              ".lister-page-next"
            ) as HTMLAnchorElement;
            if (nextPageButton) {
              nextPageButton.click();
              return true;
            }
            return false;
          });

          if (hasNextPage) {
            await page.waitForNavigation({ waitUntil: "networkidle0" });
          }
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        await browser.close();
      }
      //console.log(movieNames);
      return movieNames;
    });
  }

  getShows() {
    if (this.shows.length === 0) {
      console.log(
        "No shows found. use .crawl().then(() => shows.getShowsNames()) to get them"
      );
      return [];
    }
    return this.shows;
  }

  getShowsAmount() {
    if (this.showsAmount === null) {
      console.log(
        "No shows found. use .crawl().then(() => shows.getShowsAmount()) to get them"
      );
      return null;
    }
    return this.showsAmount;
  }
}

// (async () => {
//   const movieNames = await crawlMovieNames(
//     "https://www.imdb.com/list/ls560452969/"
//   );
//   console.log(movieNames);
// })();
