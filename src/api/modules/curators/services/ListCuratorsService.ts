import { nwsMovies, wiowMovies } from "../../../../shared/data/index";

interface ICurator {
  name: string;
  alias: string;
  url: string;
  movies: Array<string>;
  totalMovies: number | null;
}

export class ListCuratorsService {
  async execute() {
    var curators: ICurator[] = [
      {
        name: "Not Woke Shows",
        alias: "nws",
        url: "https://www.notwokeshows.com/",
        movies: nwsMovies,
        totalMovies: nwsMovies.length,
      },
      {
        name: "Worth it or Woke",
        alias: "wiow",
        url: "https://www.worthitorwoke.com/",
        movies: wiowMovies,
        totalMovies: wiowMovies.length,
      },
    ];

    return {
      curators,
    };
  }
}
