import fastify from "fastify";

const server = fastify();

server.get("/", async (req, res) => {
  return "Success";
});

server.listen(
  {
    port: 3000,
  },
  (err, address) => {
    err
      ? console.log(`Error: ${err}`)
      : console.log(`Server listening on ${address}`);
  }
);
