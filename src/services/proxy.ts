import axios from "axios";

export class Proxy {
  async fetchProxyList() {
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
      const proxyList: string[] = response.data.split("\r\n");
      return proxyList;
    } catch (error) {
      console.error("Error fetching new proxy list:", error);
      return [];
    }
  }

  async getRandomProxyServer(pxList: Promise<string[]>) {
    let proxyList = await pxList;
    if (proxyList.length === 0) {
      throw Error(
        `proxyList has 0 items, use fetchProxyList() before using getRandomProxyServer()`
      );
    }
    let random = Math.floor(Math.random() * proxyList.length);
    return proxyList[random];
  }
}
