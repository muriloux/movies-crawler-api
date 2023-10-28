import { NotWokeShows } from "./crawlers/notwokeshows.crawler.js";
import { WorthItOrWoke } from "./crawlers/worthitorwoke.crawler.js";
import { saveSetAsJson } from "./shared/helpers/index.js";
import "dotenv/config";
import { ApiService } from "./shared/services/api.js";
import { Imdb } from "./crawlers/imdb.crawler.js";

export const nws = new NotWokeShows();
export const wiow = new WorthItOrWoke();
export const imdb1 = new Imdb("https://www.imdb.com/list/ls560452969/");
export const imdb2 = new Imdb("https://www.imdb.com/list/ls089242752/");

const apiService = new ApiService();

async function crawlAll() {
  const nwsMovies = await nws.crawl(); // will start crawling imediatelly at this line
  const wiowMovies = await wiow.crawl(); // will start crawling imediatelly at this line
  const imdbMovies = await imdb1.crawl(); // will start crawling imediatelly at this line
  const imdbMovies2 = await imdb2.crawl(); // will start crawling imediatelly at this line

  saveSetAsJson(nwsMovies, "movies_nws");
  saveSetAsJson(wiowMovies, "movies_wiow");
  saveSetAsJson(imdbMovies, "movies_imdb1");
  saveSetAsJson(imdbMovies2, "movies_imdb2");
}

async function main() {
  crawlAll();
  // const movies = await apiService.getMovies();
  // console.log(movies);
  // console.log("[crawlers] done");
}

main();
