const express = require('express')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 3000// this is very important


var restdb = {
    method: 'GET',
    url: 'https://brachnode-dc82.restdb.io/',
    headers: 
    {   'cache-control': 'no-cache',
        'x-apikey': '29a59cfcac6ee5b48b1cec695706df5edabce' 
    } 
};

app.get('/', function (req, res) {
  const testAffichage = axios.get(restdb)
  res.send(testAffichage)
})

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})