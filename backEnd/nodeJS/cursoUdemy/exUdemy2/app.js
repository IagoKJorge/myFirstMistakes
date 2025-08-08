const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();

let produtos = [{id: 1, nome: "livro", preco: "R$12,99"},{id: 2,nome: "cadeira", preco: "R$20,00"},{id: 3,nome: "Lâmpada", preco: "R$2,99"}]

app.engine('handlebars', engine({defaultLayout: `main`}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home', {produtos: produtos});
});

app.get('/produto/:id', (req, res) => {
  const produtoId = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === produtoId);
  
  if (!produto) {
    return res.status(404).send('Produto não encontrado');
  }
  
  res.render('produto', { produto });
});

app.listen(8080);