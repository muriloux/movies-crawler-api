import { notWokeShows } from "./crawlers";
import { saveSetAsJson } from "./helpers";
import { startCronJobs } from "./schedules";

const nws = new notWokeShows();

nws.crawl().then((moviesSet) => {
  saveSetAsJson(moviesSet as Set<string>, "movies_nws");
});
//startCronJobs();
