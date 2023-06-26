export interface Iconfig {
  useProxy: boolean;
  maxAttempts: number;
  headless: "new" | false;
}

export type Crawler = {
  showsNames: string[];
  showsAmount: number | null;
  crawl: () => Promise<Set<string> | undefined>
  getShowsNames: () => string[];
  getShowsAmount: () => number | null;
};