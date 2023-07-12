import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { MoviesController } from "../controllers/moviesController";
import { movieSchema } from "../schemas/MovieSchema";
import { moviesSchema } from "../schemas/MoviesSchema";

const moviesController = new MoviesController();

export const moviesRoutes: FastifyPluginCallback = (
  server: FastifyInstance,
  _,
  done
) => {
  server.route({
    method: "GET",
    url: "/movie",
    handler: moviesController.index,
  });

  server.route({
    method: "POST",
    url: "/movie",
    handler: moviesController.createOne,
    schema: { body: movieSchema },
  });

  server.route({
    method: "POST",
    url: "/movies",
    handler: moviesController.createMany,
    schema: { body: moviesSchema },
  });

  new Promise((resolve) => resolve(done()));
};
