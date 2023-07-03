import fs from "fs";

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function saveSetAsJson(moviesSet: Set<string>, filename: string) {
  console.log(`[file saver] saving`);
  return new Promise((resolve, reject) => {
    try {
      let names = moviesSet as Set<string>;
      const movieNamesArray = Array.from(names);
      const jsonContent = JSON.stringify(movieNamesArray, null, 2);
      fs.writeFileSync(`src/data/${filename}.json`, `${jsonContent}`);
      console.log(
        `[file saver] src/data/${filename}.json was saved successfully`
      );
      resolve(true);
    } catch (error) {
      reject(error as Error);
    }
  });
}
