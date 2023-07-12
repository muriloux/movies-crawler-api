import { FastifyInstance } from "fastify";
import { curatorsRoutes } from "../modules/curators/routes/curators.routes";
import { moviesRoutes } from "../modules/movies/routes/movies.routes";

export const routes = async (server: FastifyInstance) => {
  server.get("/", (_, reply) => {
    reply.status(200).send("Success");
  });

  await server.register(moviesRoutes);
  await server.register(curatorsRoutes);
};
