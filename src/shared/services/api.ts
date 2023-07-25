import axios from "axios";
import { Movie } from "../types";

export class ApiService {
  postMovies = async (movies: Movie[]): Promise<any> => {
    try {
      const response = await axios.post(process.env.API_URL as string, {
        movies,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to post movies: ${error}`);
    }
  };

  getMovies = async (): Promise<Movie[]> => {
    try {
      const response = await axios.get<Movie[]>(process.env.API_URL as string);
      return response.data;
    } catch (error) {
      // Handle the error here (e.g., log or throw)
      throw new Error(`Failed to get movies: ${error}`);
    }
  };
}
