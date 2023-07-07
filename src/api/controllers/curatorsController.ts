import { FastifyReply, FastifyRequest } from "fastify";
import { wiow, nws } from "../..";
import { nwsMovies, wiowMovies } from "../../shared/data/index";
// const curators = { nws, wiow };

export const curatorsController = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const curators = { nws, wiow };
  var data: Array<{
    name: string;
    alias: string;
    url: string;
    movies: Array<string>;
    totalMovies: number | null;
  }> = [];

  // for (const [key, curator] of Object.entries(curators)) {
  //   const curatorData = {
  //     name: curator.name,
  //     alias: curator.alias,
  //     url: curator.url,
  //     movies: [...curator.getShowsNames()],
  //     moviesAmount: curator.getShowsAmount(),
  //   };

  //   data.push(curatorData);
  // }

  data = [
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

  return data;
};
