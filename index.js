// - La seule personne pouvant modifier ou supprimer un article doit être la personne qui l'a créé.

// Le rendu du projet sera
//  - l'URL d'un github contenant les sources de votre projet ainsi qu'un readme qui explique comment lancer/installer le projet.
//  - l'URL de votre API + l'url de l'application finale (avec la partie Vue.js)

const express = require("express");
const axios = require('axios')
const bodyParser = require("body-parser");
const passport = require('passport')
const passportJWT = require('passport-jwt')
const article = require("./article.js");
const user = require("./user.js");
const cors = require('cors')
const app = express();
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const PORT = process.env.PORT || 3001;
const secret = "monPetitSecret"

app.use(bodyParser.json())

// utilisation de cors
app.use(cors())
// var corsOptions = {
//   origin: 'https://brach-node.herokuapp.com/',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// configuration pour récup des data en BD 
const configBD = {
  'baseURL' : 'https://brachnode-dc82.restdb.io/rest/',
  'headers' : { 
    'x-apikey': '29a59cfcac6ee5b48b1cec695706df5edabce',  
    'Content-Type': 'application/json',
    'cache-Control': 'no-cache',
  }
}
// utilisation de la config => ainsi on pourra faire un axios.get/post etc en changeant juste la table (vu dans la doc)
const utilisationDB = axios.create(configBD)

// utilisation de passport comme vu TP
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}
const jwtStrategy = new JwtStrategy(jwtOptions, async function(payload, next) {
  const dataUser = await utilisationDB.get("member")
  const user = dataUser.data.find(user => user.mail === payload.user)
  if (user) {
    next(null, user)
  } else {
    next(null, false)
  }
})
passport.use(jwtStrategy)

app.get("/", async function (req, res) {
  res.json({uneBonneBiere : "https://www.radioclassique.fr/wp-content/thumbnails/uploads/2019/05/bieres-article-tt-width-978-height-383-crop-1-bgcolor-ffffff.jpg"});
});

app.get("/article", urlEncodedParser, async function (req, res) {
  let reponse = await article.getAllArticle();
  res.json(reponse.data);
});

// ici passport.authenticate('jwt', {session:false})
app.get("/article/:id", urlEncodedParser, async function (req, res) {
  const id = req.params.id;
  const reponse = await article.getArticleById(id);
  res.json(reponse.data);
});

// ici passport.authenticate('jwt', {session:false})
app.get("/articleUser/:id", urlEncodedParser, async function (req, res) {
  const id = req.params.id;
  const reponse = await article.getArticleByUserId(id);
  res.json(reponse.data);
});

app.post("/addarticle", urlEncodedParser, async function (req, res) {
  const data = {
    titre : req.body.titre,
    contenu : req.body.contenu,
    mail : req.body.mail
  }
  const reponse = await article.addArticle(data);
  res.json(reponse.data);
});

// ici passport.authenticate('jwt', {session:false})
app.delete("/article/:id", urlEncodedParser, passport.authenticate('jwt', {session:false}), async function (req, res) {
  const id = req.params.id;
  const reponse = await article.deleteArticle(id);
  res.json(reponse.data);
});

// ici passport.authenticate('jwt', {session:false})
app.put("/article/:id", urlEncodedParser, async function (req, res) {
  const id = req.params.id
  const data = {
    titre : req.body.title,
    contenu : req.body.contenu
  }
  const reponse = await article.updateArticle(data, id)
  res.json(reponse.data)
});

// ne fonctionne pas mais aucune idée pourquoi => code 500 lors du axios.post
app.post("/register", urlEncodedParser, async function (req, res) {
  //const addUser = await user.createAccount(req.body.mail, req.body.password);
  //res.json(addUser);
  const NewUser = await user.createAccount(req.body.mail, req.body.password)
  res.send(NewUser)
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
