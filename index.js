const express = require('express')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 3000// this is very important


var restdb = {
    method: 'GET',
    url: 'https://brachnode-dc82.restdb.io/rest/test1',
    headers: 
    {   'cache-control': 'no-cache',
        'x-apikey': '29a59cfcac6ee5b48b1cec695706df5edabce' 
    } 
};

axios.get(restdb, function (body) {
    console.log(body);
});

app.get('/', async function (req, res) {
  const yes = axios.get(restdb)
  const print = axios.get('https://brachnode-dc82.restdb.io/rest/test1')
  console.log(print)
  res.json(print)
})

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})