import { PrismaClient } from "@prisma/client";
import { nwsMovies, wiowMovies } from "../../src/shared/data/index";

const prisma = new PrismaClient();

async function seed() {
  try {
    nwsMovies.forEach(async (movie) => {
      await prisma.movie.create({
        data: { title: movie },
      });
    });

    wiowMovies.forEach(async (movie, index) => {
      await prisma.movie.create({
        data: { title: movie },
      });
    });

    console.log(
      `Seeded ${nwsMovies.length + wiowMovies.length} movies successfully.`
    );
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
