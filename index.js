const express = require('express')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 3000// this is very important


async function restdb(){
    const data = {
        nom: "nomNode",
        prenom : "prenomNode"
    }
    const config = {    
        params: {
            q:{'nom':'Brach'}
            // pour le tp sur les articles
            // q:{'email':'seb@emity.io', 'password':'password'}
        },
        headers : {"x-apikey" : "29a59cfcac6ee5b48b1cec695706df5edabce"}
    }

    // modif = put // delete = delete // ajout = post // read = get // voir la doc sur restdb(put,delete etc) et sur axios (voir ce qu'on met dans axios.post/put/...(...))
    // const ajout = await axios.post('https://brachnode-dc82.restdb.io/rest/test1', data, config)
    // const modif = await axios.put('https://brachnode-dc82.restdb.io/rest/test1', data, config)
    // const delete = await axios.delete('https://brachnode-dc82.restdb.io/rest/test1', config)

    //query. association avec params dans config (voir sur axios)
    const url = 'https://brachnode-dc82.restdb.io/rest/test1'
    const query = await axios.get(url, config)

    console.log(query.data[0].nom)
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