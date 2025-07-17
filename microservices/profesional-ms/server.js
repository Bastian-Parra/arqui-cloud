// microservices/paciente-ms/server.js
require("dotenv").config();
const app = require("./src/app");
const { connectToDatabase } = require("./src/database/database");

const port = process.env.PORT || 5000;

async function main() {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(
      `[Profesionales-MS] Servidor Express escuchando en http://localhost:${port}`
    );
  });
}

main();
