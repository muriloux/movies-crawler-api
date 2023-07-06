import { startServer } from "./api/server";
import { NotWokeShows } from "./crawlers/notwokeshows.crawler";
import { WorthItOrWoke } from "./crawlers/worthitorwoke.crawler";
import { saveSetAsJson } from "./shared/helpers";
import { startCronJobs } from "./shared/schedules";

export const nws = new NotWokeShows();
export const wiow = new WorthItOrWoke();

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
