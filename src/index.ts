import { startServer } from "./api/server";
import { notWokeShows } from "./crawlers";
import { worthItOrWoke } from "./crawlers/worthitorwoke.crawler";
import { saveSetAsJson } from "./helpers";
import { startCronJobs } from "./schedules";

export const nws = new notWokeShows();
export const wiow = new worthItOrWoke();

async function crawlAll() {
  const nwsMovies = await nws.crawl();
  const wiowMovies = await wiow.crawl();

  saveSetAsJson(nwsMovies as Set<string>, "movies_nws");
  saveSetAsJson(wiowMovies as Set<string>, "movies_wiow");
}

async function main() {
  startServer({ nws, wiow });
  //crawlAll();
  console.log("[crawlers] done");
}

main();
