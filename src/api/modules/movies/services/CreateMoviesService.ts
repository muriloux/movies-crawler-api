import { MovieRepository } from "../prisma/repositories/MovieRepository";

export class CreateMoviesService {
  async execute(movies: string[]) {
    if (movies.length === 0) {
      console.log("No movies provided");
      return;
    }

    var moviesToCheck = movies;
    var moviesResult: string[] = [];
    var notAddedMovies: string[] = [];
    const movieRepository = new MovieRepository();

    for (let movie of moviesToCheck) {
      if (await movieRepository.find(movie)) {
        notAddedMovies.push(movie);
        console.log("Movie already exists");
        continue;
      }
      moviesResult.push(movie);
      await movieRepository.create(movie);
    }

    if (notAddedMovies.length > 0) {
      console.log("Some movies were not added.");
      return { movies: moviesResult, notAdded: notAddedMovies };
    }

    return { movies: moviesResult };
  }
}
