import axios from "axios";

export class ApiService {
  postMovies = async (movies) => {
    try {
      const response = await axios.post(`${process.env.API_URL}/movies`, {
        movies,
      });
      return response.data;
    } catch (error) {
      console.log(`Failed to post movies: ${error}`);
    }
  };

  getMovies = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/movies`);
      return response.data;
    } catch (error) {
      // Handle the error here (e.g., log or throw)
      console.log(`Failed to get movies: ${error}`);
    }
  };
}
