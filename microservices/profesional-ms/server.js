require("dotenv").config();
const logger = require("./src/utils/logger");
const app = require("./src/app");
const { connectToDatabase } = require("./src/database/database");

const port = process.env.PORT || 3001;

async function main() {
  await connectToDatabase();

  app.listen(port, () => {
    logger.info(
      `[Profesionales-MS] Servidor Express escuchando en http://localhost:${port}`
    );
  });
}

main();
