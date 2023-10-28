import puppeteer, { Browser, Page } from "puppeteer";
import { ProxyService } from "../services/proxy.js";
import { config } from "../../config/config.js";

const proxy = new ProxyService();

const proxyList = proxy.fetchProxyList();

export async function puppeteerInstance() {
  let randomProxy = await proxy.getRandomProxyServer(proxyList);
  const args = config.useProxy ? [`--proxy-server=http://${randomProxy}`] : [];
  const browser = await puppeteer.launch({
    headless: config.headless,
    executablePath: config.customChromiumExecutable
      ? process.env.CUSTOM_CHROMIUM_PATH
      : undefined,
    args,
  });

  const page = await browser.newPage();
  console.log(`[puppeteer instance] using proxy: ${randomProxy}`);

  return { page, browser };
}
