import { NotWokeShows } from "./crawlers/notwokeshows.crawler";
import { WorthItOrWoke } from "./crawlers/worthitorwoke.crawler";
import { saveSetAsJson } from "./shared/helpers";
import "dotenv/config";
import { ApiService } from "./shared/services/api";
import { Imdb } from "./crawlers";

export const nws = new NotWokeShows();
export const wiow = new WorthItOrWoke();
// export const imdb1 = new Imdb("https://www.imdb.com/list/ls560452969/");
export const imdb2 = new Imdb("https://www.imdb.com/list/ls089242752/");

const apiService = new ApiService();

async function crawlAll() {
  // const nwsMovies = await nws.crawl();
  // const wiowMovies = await wiow.crawl();
  // const imdbMovies = await imdb1.crawl();
  const imdbMovies = await imdb2.crawl();

  // saveSetAsJson(nwsMovies as Set<string>, "movies_nws");
  // saveSetAsJson(wiowMovies as Set<string>, "movies_wiow");
  // saveSetAsJson(imdbMovies as Set<string>, "movies_imdb1");
  saveSetAsJson(imdbMovies as Set<string>, "movies_imdb2");
}

async function main() {
  crawlAll();
  // const movies = await apiService.getMovies();
  // console.log(movies);
  // console.log("[crawlers] done");
}

main();
