import { MovieRepository } from "../prisma/repositories/MovieRepository";

interface IMovie {
  id: number;
  title: string;
}

export class ListMoviesService {
  async execute() {
    const movieRepository = new MovieRepository();
    const moviesData: IMovie[] = await movieRepository.findAll();
    var movies: string[] = [];
    for (let movie of moviesData) {
      movies.push(movie.title);
    }

    return {
      movies,
    };
  }
}
