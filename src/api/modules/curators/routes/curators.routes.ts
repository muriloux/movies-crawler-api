import { FastifyInstance } from "fastify";
import { CuratorsController } from "../controllers/CuratorsController";

const curatorsController = new CuratorsController();

export default function curatorsRoutes(server: FastifyInstance) {
  server.get("/curators", curatorsController.index);
}
