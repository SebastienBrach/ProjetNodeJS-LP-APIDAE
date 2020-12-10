const express = require('express')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 3000// this is very important


// var restdb = {
//     method: 'GET',
//     url: 'https://brachnode-dc82.restdb.io/rest/test1',
//     headers: 
//     {   'cache-control': 'no-cache',
//         'x-apikey': '29a59cfcac6ee5b48b1cec695706df5edabce' 
//     } 
// };

async function restdb(){
    const data = {
        nom: "nomNode",
        prenom : "prenomNode"
    }
    const config = {    
        headers : {"x-apikey" : "29a59cfcac6ee5b48b1cec695706df5edabce"}
    }

    const reponse = await axios.post('https://brachnode-dc82.restdb.io/rest/test1', data, config)
    console.log(reponse)
}
restdb()

// app.get('/', async function (req, res) {
//   const yes = axios.get(restdb)
//   const print = axios.get('https://brachnode-dc82.restdb.io/rest/test1')
//   console.log(print)
//   res.json(print)
// })

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})