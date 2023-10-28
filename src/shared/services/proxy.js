import axios from "axios";
import { config } from "../../config/config.js";

export class ProxyService {
  async fetchProxyList() {
    if (config.useProxy) {
      try {
        console.log("[proxy] fetching proxy list");
        const response = await axios.get("https://api.proxyscrape.com/v2/", {
          params: {
            request: "displayproxies",
            protocol: "http",
            timeout: 5000,
            country: "all",
            ssl: "all",
            anonymity: "anonymous",
          },
        });
        const proxyList = response.data.split("\r\n");
        return proxyList;
      } catch (error) {
        console.error("Error fetching new proxy list:", error);
        return [];
      }
    } else {
      return [];
    }
  }

  async getRandomProxyServer(pxList) {
    let proxyList = await pxList;
    try {
      if (proxyList.length === 0) {
        throw Error(
          `proxyList has 0 items, use fetchProxyList() before using getRandomProxyServer()`
        );
      }
      let random = Math.floor(Math.random() * proxyList.length);
      return proxyList[random];
    } catch (error) {
      console.log(`[proxy] ${error}`);
    }
  }

  async useProxy(callback) {
    if (config.useProxy) {
      for (let i = 0; i <= config.maxAttempts; i++) {
        try {
          let result = await callback();
          if (result) {
            return result;
          }
        } catch (error) {
          if (i === config.maxAttempts) {
            throw new Error(
              `[proxy] ${error}, max attempts reached, aborting...`
            );
          }
          console.log(`[proxy] ${error}, retrying...`);
          continue;
        }
      }
    } else {
      console.log("[proxy] not using proxy");
      let result = await callback();
      return result;
    }
  }
}
