import fs from "fs";
import path from "path";

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function saveSetAsJson(moviesSet, filename) {
  return new Promise((resolve, reject) => {
    try {
      let names = moviesSet;
      const movieNamesArray = Array.from(names);
      const jsonContent = JSON.stringify(movieNamesArray, null, 2);
      fs.writeFileSync(
        path.resolve(`src/shared/data/${filename}.json`),
        `${jsonContent}`
      );
      console.log(
        `[file saver] src/shared/data/${filename}.json was saved successfully`
      );
      resolve(true);
    } catch (error) {
      console.log(
        `[file saver] error saving src/data/${filename}.json:\n${error}`
      );
      reject(error);
    }
  });
}
