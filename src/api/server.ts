import fastify from "fastify";
import { NotWokeShows } from "../crawlers/notwokeshows.crawler";
import { WorthItOrWoke } from "../crawlers/worthitorwoke.crawler";
import routes from "./routes";

export function startServer(curators: {
  nws: NotWokeShows;
  wiow: WorthItOrWoke;
}) {
  const server = fastify();

  routes(server);

  server.listen(
    {
      port: 3333,
    },
    (err, address) => {
      err
        ? console.log(`[server] Error: ${err}`)
        : console.log(`[server] listening on ${address}`);
    }
  );
}
