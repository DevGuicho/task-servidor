const express = require("express");

function proyectosApi(app) {
  const router = express.Router();
  app.use("/api/proyectos", router);

  router.get("/", (req, res) => {
    res.send("hola");
  });
  router.get("/:id", (req, res) => {
    res.send("hola");
  });
  router.post("/", (req, res) => {
    res.send("hola");
  });
  router.put("/", (req, res) => {
    res.send("hola");
  });
  router.delete("/", (req, res) => {
    res.send("hola");
  });
}
module.exports = proyectosApi;
