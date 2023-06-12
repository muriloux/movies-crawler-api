import puppeteer from "puppeteer";
import { Proxy } from "../services/proxy";

const proxy = new Proxy();

export class notWokeShows {
  private showsNames: string[] = [];
  private showsAmount: number | null = null;

  async crawl() {
    try {
      let testProxy = "139.162.78.109:80";
      let randomProxy = await proxy.getRandomProxyServer();
      console.log(`[crawler@notwokeshows] using proxy: ${randomProxy}`);
      const browser = await puppeteer.launch({
        headless: "new",
        args: [`--proxy-server=http://${randomProxy}`],
      });
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
    } catch (error) {
      console.log(
        `[crawler] Error trying to crawl notwokeshows.com:\n${error}`
      );
      process.exit();
    }
  }
}
