import axios from "axios";
import { Movie } from "../types";

export class ApiService {
  postMovies = async (movies: Movie[]): Promise<any> => {
    try {
      const response = await axios.post(
        `${process.env.API_URL as string}/movies`,
        {
          movies,
        }
      );
      return response.data;
    } catch (error) {
      console.log(`Failed to post movies: ${error}`);
    }
  };

  getMovies = async (): Promise<Movie[] | undefined> => {
    try {
      const response = await axios.get<Movie[]>(
        `${process.env.API_URL as string}/movies`
      );
      return response.data;
    } catch (error) {
      // Handle the error here (e.g., log or throw)
      console.log(`Failed to get movies: ${error}`);
    }
  };
}
