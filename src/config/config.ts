import { Iconfig } from "../shared/types";

export const config: Iconfig = {
  useProxy: false,
  maxAttempts: 20,
  headless: false,
  crawlIntervalMinutes: 20,
  customChromiumExecutable: false,
};
