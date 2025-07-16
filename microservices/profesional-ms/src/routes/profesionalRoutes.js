// microservices/profesional-service/src/routes/profesionalRoutes.js
const express = require("express");
const router = express.Router();
const profesionalController = require("../controllers/profesionalController");

router.get("/", profesionalController.getAllProfesionales);
router.get("/:id", profesionalController.getProfesionalById);
router.post("/", profesionalController.createProfesional);

module.exports = router;
