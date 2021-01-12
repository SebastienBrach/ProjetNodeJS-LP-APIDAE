const express = require('express')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 3000 

// pour le tp bien organiser son projet, gestion des users dans un fichier, gestion des articles dans l'autre

app.get('/', function (req, res) {
    async function restdb(){
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

        // console.log(query.data[0].nom)
        res.json(query.data[0].nom)

    }
    restdb();
})

app.listen(PORT, function () {
  console.log('Serveur START on PORT ' + PORT + ' !!!!')
})