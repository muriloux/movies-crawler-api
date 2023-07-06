import fastify from "fastify";
import { notWokeShows } from "../crawlers";
import { worthItOrWoke } from "../crawlers/worthitorwoke.crawler";
import routes from "./routes";

export function startServer(curators: {
  nws: notWokeShows;
  wiow: worthItOrWoke;
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
