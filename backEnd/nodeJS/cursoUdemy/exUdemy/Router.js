const express = require("express");
const router = express.Router();
const path = require("node:path");

router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

router.post("/enviar", (req, res) => {
  const nome = req.body.nome;
  res.send(`Nome enviado: ${nome}`);
});

module.exports = router;