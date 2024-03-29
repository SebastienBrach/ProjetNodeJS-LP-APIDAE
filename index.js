const express = require("express");
const axios = require('axios')
const bodyParser = require("body-parser");
const passport = require('passport')
const passportJWT = require('passport-jwt')
const cors = require('cors')
const app = express();
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const PORT = process.env.PORT || 3001;
const secret = "monPetitSecret"
const article = require("./article.js");
const user = require("./user.js");

app.use(bodyParser.json())
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

app.get("/article", async function (req, res) {
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

// ici passport.authenticate('jwt', {session:false})
app.post("/addarticle", urlEncodedParser, async function (req, res) {
  const data = {
    titre : req.body.titre,
    contenu : req.body.contenu,
    mail : req.body.mail
  }
  if(!data.titre || !data.contenu){
    res.json({error : "L'article doit avoir un titre et un contenu"})
  } else {
    const reponse = await article.addArticle(data);
    res.json(reponse.data);
  }
});

// ici passport.authenticate('jwt', {session:false})
app.delete("/article/:id", urlEncodedParser, async function (req, res) {
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

app.post("/register", urlEncodedParser, async function (req, res) {
  const data = {
    mail : req.body.mail,
    password : req.body.password,
  }
  if (!data.mail || !data.password) {
    res.json({ error: 'Complétez tout les champs' })
  } else {
    const NewUser = await user.createAccount(data.mail, data.password)
    res.json(NewUser)
  }
});

app.post("/login", urlEncodedParser, async function (req, res) {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const retourJWT = await user.userLogin(userEmail, userPassword);
  res.json({ jwt: retourJWT });
});

app.listen(PORT, function () {
  console.log("... server on port " + PORT + " running ...");
});