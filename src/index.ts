import { notWokeShows } from "./crawlers";
import { worthItOrWoke } from "./crawlers/worthitorwoke.crawler";
import { saveSetAsJson } from "./helpers";
import { startCronJobs } from "./schedules";

const nws = new notWokeShows();
const wiow = new worthItOrWoke();

async function main() {
  const nwsMovies = await nws.crawl();
  const wiowMovies = await wiow.crawl();

  saveSetAsJson(nwsMovies as Set<string>, "movies_nws");
  saveSetAsJson(wiowMovies as Set<string>, "movies_wiow");
}

main();
