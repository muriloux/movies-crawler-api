import fs from "fs";
import path from "path";

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function saveSetAsJson(moviesSet: Set<string>, filename: string) {
  return new Promise((resolve, reject) => {
    try {
      let names = moviesSet as Set<string>;
      const movieNamesArray = Array.from(names);
      const jsonContent = JSON.stringify(movieNamesArray, null, 2);
      fs.writeFileSync(
        path.resolve(__dirname, `../data/${filename}.json`),
        `${jsonContent}`
      );
      console.log(
        `[file saver] src/data/${filename}.json was saved successfully`
      );
      resolve(true);
    } catch (error) {
      console.log(
        `[file saver] error saving src/data/${filename}.json:\n${error}`
      );
      reject(error as Error);
    }
  });
}
