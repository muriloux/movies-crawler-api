import cron from "node-cron";

import { NotWokeShows } from "../../crawlers";
import { WorthItOrWoke } from "../../crawlers";
import { saveSetAsJson } from "../helpers";
import { config } from "../../config/config";

const nws = new NotWokeShows();
const wiow = new WorthItOrWoke();

const nwsCron = cron.schedule(
  `*/${config.crawlIntervalMinutes} * * * *`,
  async () => {
    try {
      nws.crawl().then((movieNames) => {
        saveSetAsJson(movieNames as Set<string>, "movies_nws");
      });
    } catch (error) {
      console.log(`[scheduler] @nws ${error}`);
    }
  }
);

const wiowCron = cron.schedule(
  `*/${config.crawlIntervalMinutes} * * * *`,
  async () => {
    try {
      wiow.crawl().then((movieNames) => {
        saveSetAsJson(movieNames as Set<string>, "movies_nws");
      });
    } catch (error) {
      console.log(`[scheduler] @wiow ${error}`);
    }
  }
);

export function startCronJobs() {
  nwsCron.start();
  wiowCron.start();
  console.log(
    `[scheduler] Jobs scheduled to run every ${config.crawlIntervalMinutes} minutes`
  );
}
