import { FastifyReply, FastifyRequest } from "fastify";

import { ListMoviesService } from "../services/ListMoviesService";

export class MoviesController {
  public async index(req: FastifyRequest, res: FastifyReply) {
    const listMovies = new ListMoviesService();
    const movies = await listMovies.execute();

    return res.status(200).send(movies);
  }
}
