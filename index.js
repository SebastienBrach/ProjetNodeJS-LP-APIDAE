// 1 - une route pour créer un compte
// 2 - commenter le code

// - Les routes liées à la creation/suppression/modification d'articles doivent être uniquement accessibles aux personnes connectés.
// - La seule personne pouvant modifier ou supprimer un article doit être la personne qui l'a créé.

// - Les utilisateurs ainsi que les articles seront stockés dans restdb comme vu en TP.

// - Le projet doit être déployé sur Heroku.

// - ATTENTION 1 : l'api doit communiquer uniquement en JSON (res.json avec express).
// - ATTENTION 2 : pour communiquer avec votre serveur express depuis une page web, vous aurez besoin de gérer les CORS. voir le middleware express cors

// Le rendu du projet sera
//  - l'URL d'un github contenant les sources de votre projet ainsi qu'un readme qui explique comment lancer/installer le projet.
//  - l'URL de votre API + l'url de l'application finale (avec la partie Vue.js)

const express = require("express");
const bodyParser = require("body-parser");
const article = require("./article.js");
const user = require("./user.js");
const cors = require('cors')
const app = express();
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const PORT = process.env.PORT || 3000;

app.use(cors())

// var corsOptions = {
//   origin: 'https://brach-node.herokuapp.com/',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.get("/", async function (req, res) {
  res.json('https://www.radioclassique.fr/wp-content/thumbnails/uploads/2019/05/bieres-article-tt-width-978-height-383-crop-1-bgcolor-ffffff.jpg');
});

app.get("/article", async function (req, res) {
  let reponse = await article.getAllArticle();
  res.json(reponse.data);
});

app.get("/article/:id", async function (req, res) {
  const id = req.params.id;
  const reponse = await article.getArticleById(id);
  res.json(reponse.data);
});

app.post("/add/article/:title", async function (req, res) {
  const title = req.params.title;
  const reponse = await article.addArticle(title);
  res.json(reponse.data.titre);
});

app.delete("/delete/article/:id", async function (req, res) {
  const id = req.params.id;
  const reponse = await article.deleteArticle(id);
  res.json(reponse.data);
});

app.put("/update/article/:id", urlEncodedParser, async function (req, res) {
  const id = req.params.id
  const data = req.body.titre
  const reponse = await article.updateArticle(data, id)
  res.json(reponse.data)
});

app.get("/private", async function (req, res) {
  console.log(req.user);
  res.send("Hello " + req.user.email);
});

app.post("/register", urlEncodedParser, async function (req, res) {
  const userEmail = req.body.mail;
  const userPassword = req.body.password;
  const addUser = await user.createAccount(userEmail, userPassword);
  res.send("oui");
});

app.post("/login", urlEncodedParser, async function (req, res) {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const retourLogin = await user.userLogin(userEmail, userPassword);
  res.json({ jwt: retourLogin });
});

app.listen(PORT, function () {
  console.log("... server on port " + PORT + " running ...");
});
