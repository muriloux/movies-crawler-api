import { notWokeShows } from "./crawlers";
import { worthItOrWoke } from "./crawlers/worthitorwoke.crawler";
import { saveSetAsJson } from "./helpers";
import { startCronJobs } from "./schedules";

const nws = new notWokeShows();
const wiow = new worthItOrWoke();

// nws.crawl().then((moviesSet) => {
//   saveSetAsJson(moviesSet as Set<string>, "movies_nws");
// });

wiow.crawl().then((moviesSet) => {
  saveSetAsJson(moviesSet as Set<string>, "movies_wiow");
});
//startCronJobs();
