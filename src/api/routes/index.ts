import { FastifyInstance } from "fastify";
import { curatorsController } from "../controllers/curatorsController";

export default function routes(server: FastifyInstance) {
  server.get("/", (req, res) => {
    res.status(200).send("Success");
  });
  server.get("/curators", curatorsController);
}
