import { puppeteerInstance } from "../shared/puppeteer/initPuppeteer.js";
import { ProxyService } from "../shared/services/proxy.js";
import { delay } from "../shared/helpers/index.js";

const proxy = new ProxyService();
export class WorthItOrWoke {
  name = "Worth it or Woke";
  alias = "wiow";
  url = "https://worthitorwoke.com/category/";
  shows = [];
  showsAmount = null;

  async crawl() {
    return await proxy.useProxy(async () => {
      const { browser, page } = await puppeteerInstance();

      await page.goto("https://worthitorwoke.com/category/recommend/");

      const movieNames = new Set();

      while (true) {
        const movieElements = await page.$$("h2.bt_bb_headline_tag a");
        for (const element of movieElements) {
          const movieName = await page.evaluate(
            (el) => el.textContent,
            element
          );
          movieNames.add(movieName);
        }

        console.log(`[crawler] @wiow: ${movieNames.size} movies`);

        const olderPostsLink = await page.$("p.pageNext a");
        if (!olderPostsLink) {
          break;
        }

        await Promise.all([page.waitForNavigation(), olderPostsLink.click()]);
        await delay(1000);
      }

      await browser.close();

      this.showsAmount = movieNames.size;
      this.shows = [...movieNames];

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
