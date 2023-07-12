import { PrismaClient } from "@prisma/client";
import { nwsMovies, wiowMovies } from "../../src/shared/data/index";

const prisma = new PrismaClient();

async function seed() {
  let movies: Set<string> = new Set();
  let moviesArray: string[] = [];

  try {
    nwsMovies.forEach(async (movie) => {
      movies.add(movie);
    });
    wiowMovies.forEach(async (movie) => {
      movies.add(movie);
    });
    moviesArray = Array.from(movies);

    moviesArray.forEach(async (movie) => {
      await prisma.movie.create({
        data: { title: movie },
      });
    });

    console.log(
      `Seeded ${nwsMovies.length + wiowMovies.length} movies successfully.`
    );
    await prisma.$disconnect();
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
