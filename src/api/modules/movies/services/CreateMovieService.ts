import { MovieRepository } from "../prisma/repositories/MovieRepository";

export class CreateMovieService {
  async execute(movie: string) {
    if (!movie) {
      console.log("No movie provided");
      return;
    }
    const movieRepository = new MovieRepository();

    if (await movieRepository.find(movie)) {
      console.log("Movie already exists");
      return { Error: "Movie already exists" };
    }

    const createdMovie = await movieRepository.create(movie);

    return createdMovie;
  }
}
