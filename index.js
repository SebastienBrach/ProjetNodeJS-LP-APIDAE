const express = require('express')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 3000// this is very important


var restdb = {
    method: 'GET',
    url: 'https://brachnode-dc82.restdb.io/home/db/5fd1e122dcc309530002b04d/cards/5fd1e252dcc309530002b11b',
    headers: 
    {   'cache-control': 'no-cache',
        'x-apikey': '29a59cfcac6ee5b48b1cec695706df5edabce' 
    } 
};

app.get('/', function (req, res) {
  const yes = axios.get(restdb)
  const print = axios.get('https://brachnode-dc82.restdb.io/rest/Test1?q={"nom": "BRACH"}')
  res.json(print)
})

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})