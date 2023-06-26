import { notWokeShows } from "./crawlers/index";
import fs from 'fs'

const nws = new notWokeShows();

nws.crawl().then((movieNames) => {
    let names = movieNames as Set<string>;
    console.log(`${names.size} Movie names found:\n${movieNames}`);
    const movieNamesArray = Array.from(names);
    const jsonContent = JSON.stringify(movieNamesArray, null, 2);
    fs.writeFileSync('movies_nws.json', jsonContent);
}).catch((error) => console.error(error));
