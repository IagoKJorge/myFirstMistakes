const express = require("express");
const path = require("node:path");
const app = express();
const router = require("./Router.js")

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(router);


app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
