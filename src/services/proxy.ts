import axios from "axios";

export class Proxy {
  async getProxyList(): Promise<string[] | []> {
    try {
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

  async getRandomProxyServer() {
    let proxyList = await this.getProxyList();
    let random = Math.floor(Math.random() * proxyList.length);
    let randomProxy = proxyList[random];
    return randomProxy;
  }
}
