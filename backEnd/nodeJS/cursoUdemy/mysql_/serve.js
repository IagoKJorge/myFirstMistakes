const express = require("express");
const { engine } = require('express-handlebars');
const mysql = require("mysql");

const app = express();

app.engine('handlebars', engine({
  defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');
app.set('view', './views');

app.use(express.static('public'));

app.use(express.urlencoded({
  extended: true,
}))
app.use(express.json());

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Página Inicial',
        message: 'Bem-vindo ao nosso site!'
    });
});

const conn = mysql.createConnection({
  host: "localhost",
  user: "iago",
  password: "iagoLindo",
  database: "nodemysql1",
});

conn.connect(function(err){
  if(err){
    console.log(err);
  }

  console.log("Deu certinho!")
})

app.listen(3000);