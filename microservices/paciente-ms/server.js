// microservices/paciente-ms/server.js
const logger = require("./src/utils/logger");
require("dotenv").config();
const app = require("./src/app");
const { connectToDatabase } = require("./src/database/database");

const port = process.env.PORT || 4000;

async function main() {
  await connectToDatabase();

  app.listen(port, () => {
    logger.info(
      `[Paciente-MS] Servidor Express escuchando en http://localhost:${port}`
    );
  });
}


main();
