import { FastifyInstance } from "fastify";
import { MoviesController } from "../controllers/moviesController";

const moviesController = new MoviesController();

export default function moviesRoutes(server: FastifyInstance) {
  server.get("/movies", moviesController.index);
}
