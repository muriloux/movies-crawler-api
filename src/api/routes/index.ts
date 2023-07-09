import { FastifyInstance } from "fastify";
import curatorsRoutes from "../modules/curators/routes/curators.routes";
import moviesRoutes from "../modules/movies/routes/movies.routes";

export const routes = (server: FastifyInstance) => {
  server.get("/", (req, res) => res.status(200).send("Success"));
  curatorsRoutes(server);
  moviesRoutes(server);
};
