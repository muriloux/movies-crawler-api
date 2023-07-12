import { FastifyReply, FastifyRequest } from "fastify";

import { ListMoviesService } from "../services/ListMoviesService";
import { CreateMoviesService } from "../services/CreateMoviesService";
import { CreateMovieService } from "../services/CreateMovieService";

export class MoviesController {
  public async index(req: FastifyRequest, res: FastifyReply) {
    const listMovies = new ListMoviesService();
    const movies = await listMovies.execute();

    return res.status(200).send(movies);
  }

  public async createOne(
    req: FastifyRequest<{ Body: { movie: string } }>,
    res: FastifyReply
  ) {
    const { movie } = req.body;
    const createMovies = new CreateMovieService();
    const moviesCreated = await createMovies.execute(movie);

    return res.status(201).send(moviesCreated);
  }

  public async createMany(
    req: FastifyRequest<{ Body: { movies: string[] } }>,
    res: FastifyReply
  ) {
    const { movies } = req.body;
    const createMovies = new CreateMoviesService();
    const moviesCreated = await createMovies.execute(movies);

    return res.status(201).send(moviesCreated);
  }
}
