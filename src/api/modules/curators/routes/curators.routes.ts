import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { CuratorsController } from "../controllers/CuratorsController";

const curatorsController = new CuratorsController();

export const curatorsRoutes: FastifyPluginCallback = (
  server: FastifyInstance,
  _,
  done
) => {
  server.route({
    method: "GET",
    url: "/curators",
    handler: curatorsController.index,
  });

  new Promise((resolve) => resolve(done()));
};
