import { FastifyReply, FastifyRequest } from "fastify";
import { wiow, nws } from "../../../..";

import { ListCuratorsService } from "../services/ListCuratorsService";
// const curators = { nws, wiow };

export class CuratorsController {
  public async index(req: FastifyRequest, res: FastifyReply) {
    const listCurators = new ListCuratorsService();
    const curators = await listCurators.execute();

    return res.status(200).send(curators);
  }
}
