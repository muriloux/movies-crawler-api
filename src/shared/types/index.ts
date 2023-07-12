export interface Iconfig {
  useProxy: boolean;
  maxAttempts: number;
  headless: boolean | "new";
  crawlIntervalMinutes: number;
}

export type Crawler = {
  shows: string[];
  showsAmount: number | null;
  crawl: () => Promise<Set<string> | undefined>;
  getShows: () => string[];
  getShowsAmount: () => number | null;
};
