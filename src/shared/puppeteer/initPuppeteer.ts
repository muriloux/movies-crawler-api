import puppeteer, { Browser, Page } from "puppeteer";
import { Proxy } from "../services/proxy";
import { config } from "../../config/config";

const proxy = new Proxy();

const proxyList = proxy.fetchProxyList();

export async function puppeteerInstance(): Promise<{
  page: Page;
  browser: Browser;
}> {
  let randomProxy = await proxy.getRandomProxyServer(proxyList);
  const args = config.useProxy ? [`--proxy-server=http://${randomProxy}`] : [];
  const browser = await puppeteer.launch({
    headless: config.headless,
    args,
  });

  const page = await browser.newPage();
  console.log(`[puppeteer instance] using proxy: ${randomProxy}`);

  return { page, browser };
}
