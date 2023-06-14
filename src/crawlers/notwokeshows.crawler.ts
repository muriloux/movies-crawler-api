import { config } from "../config";
import { delay } from "../helpers";
import { puppeteerInstance } from "./puppeteer";

export class notWokeShows {
  private showsNames: string[] = [];
  private showsAmount: number | null = null;

  async crawl() {
    for (let i = 0; i <= config.maxProxyAttempts; i++) {
      let { page, browser } = await puppeteerInstance();

      try {
        console.log("[crawler] starting scraping @notwokeshows.com.");
        let showsNames = [];

        //navigate

        await page.goto("https://www.notwokeshows.com/");

        //close  modal

        await page.waitForSelector("#dmPopup");
        await delay(2000);
        await page.keyboard.press("Escape");

        //pagination
        await page.waitForSelector(".business-directory__list");
        await page.waitForSelector(".business-directory__pagination");

        const showPageNumbers = await page.$$(
          ".business-directory__pagination li"
        );

        for (let i = 0; i <= showPageNumbers.length - 1; i++) {
          await page.waitForSelector(".business-directory__pagination");
          let numbers = await page.$$(".business-directory__pagination li");

          await numbers[i].click();
          await delay(2000);

          //Get Shows By Page
          showsNames = await page.$$eval(
            ".business-directory__item-name a",
            (anchors) =>
              anchors.map((anchor) => (anchor.textContent as string).trim())
          );

          if (showsNames.length === 0) {
            throw new Error("Got empty shows array.");
          }
          showsNames.forEach((s) => {
            this.showsNames.push(s);
          });
        }

        this.showsAmount = this.showsNames.length;
        console.log("Movie Names:");
        console.log(this.showsNames);
        console.log("Total Movies:", this.showsAmount);
        break;
      } catch (error) {
        console.log(
          `[crawler] Error trying to crawl notwokeshows.com:\n${error}`
        );
        browser.close();
      }
    }
  }
}
