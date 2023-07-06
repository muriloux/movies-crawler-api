import puppeteer from "puppeteer";

export class Imdb {
  async crawlMovieNames(url: string): Promise<Set<string>> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const movieNames = new Set<string>();

    try {
      await page.goto(url);
      let currentPage = 1;
      const nextPageButton = await page.waitForSelector("lister-page-next");
      let hasNextPage = nextPageButton !== null;

      while (hasNextPage) {
        const movieElements = await page.$$(
          ".lister-item-content h3.lister-item-header a"
        );

        for (const movieElement of movieElements) {
          const movieName = await page.evaluate(
            (element) => element.textContent,
            movieElement
          );
          movieNames.add(movieName as string);
        }

        if (hasNextPage) {
          currentPage++;
          await nextPageButton?.click();
          await page.waitForNavigation({ waitUntil: "networkidle0" });
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      await browser.close();
    }

    return movieNames;
  }
}

// (async () => {
//   const movieNames = await crawlMovieNames(
//     "https://www.imdb.com/list/ls560452969/"
//   );
//   console.log(movieNames);
// })();
