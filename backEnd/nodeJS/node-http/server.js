const http = require("node:http");

const server = http.createServer((request, response) => {
  const path = request.url;

  switch (path) {
    case "/":
      response.writeHead(200,{ "Content-Type": "text/plain; charset=utf-8" });
      response.write("Página inicial");
      break;
    case "/artigos":
      response.writeHead(200,{ "Content-Type": "text/plain; charset=utf-8" });
      response.write("Página de artigos");
      break;
    default:
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.write("Página não encontrada!")

  }
  response.end();
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
