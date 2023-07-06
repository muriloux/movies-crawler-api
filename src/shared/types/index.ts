export interface Iconfig {
  useProxy: boolean;
  maxAttempts: number;
  headless: boolean | "new";
  crawlIntervalMinutes: number;
}

export type Crawler = {
  showsNames: string[];
  showsAmount: number | null;
  crawl: () => Promise<Set<string> | undefined>
  getShowsNames: () => string[];
  getShowsAmount: () => number | null;
};