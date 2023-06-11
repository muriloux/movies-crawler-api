import puppeteer from "puppeteer";

export class notWokeShows {
  private showsNames: string[] = [];
  private showsAmount: number | null = null;

  async crawl() {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto("https://www.notwokeshows.com/");

      await page.waitForSelector(".business-directory__list");

      this.showsNames = await page.$$eval(
        ".business-directory__item-name a",
        (anchors) =>
          anchors.map((anchor) => (anchor.textContent as string).trim())
      );
      this.showsAmount = this.showsNames.length;

      console.log("Movie Names:");
      console.log(this.showsNames);
      console.log("Total Movies:", this.showsAmount);

      await browser.close();
    } catch (error) {
      console.log(
        `[crawler] Error trying to crawl notwokeshows.com:\n${error}`
      );
    }
  }
}
