export interface Iconfig {
  useProxy: boolean;
  maxAttempts: number;
  headless: boolean | "new";
  crawlIntervalMinutes: number;
  customChromiumExecutable: boolean;
}

export type Crawler = {
  shows: string[];
  showsAmount: number | null;
  crawl: () => Promise<Set<string> | undefined>;
  getShows: () => string[];
  getShowsAmount: () => number | null;
};

export interface Movie {
  title: string;
  curatorName: string;
}
