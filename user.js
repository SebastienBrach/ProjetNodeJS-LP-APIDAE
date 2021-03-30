const { default: axios } = require("axios")
const jwt = require('jsonwebtoken')
const secret = "monPetitSecret"

const DBurl = 'https://brachnode-dc82.restdb.io/rest/member'
const headers = { 
    'x-apikey': '29a59cfcac6ee5b48b1cec695706df5edabce',  
    'content-type': 'application/x-www-form-urlencoded'
}

async function createAccount(email, pass) {
    const url = 'https://brachnode-dc82.restdb.io/rest/member'
    const config = {
        headers: {
            'x-apikey': '29a59cfcac6ee5b48b1cec695706df5edabce'
        }
    }
    const data = {
        mail : email, 
        password : pass
    }
    const response = await axios.post(url, data, config)
    return(response)
}


async function userLogin(userEmail, userPassword) {
    if (!userEmail || !userPassword) {
        return({ error: 'Complétez tout les champs' })
    }
    config = {
        params: {
            q: { mail : userEmail}
        },
        headers : headers
    }
    const user = await axios.get(DBurl, config)
    const bdEmail = user.data[0].mail
    const bdPassword = user.data[0].password
    if (!user || userPassword !== bdPassword) {
        return({ error: 'L\'email ou le mot de passe ne sont pas correct' })
    }
    const userJwt = jwt.sign({ user: bdEmail }, secret)
    return(userJwt) 
}

module.exports = {
    createAccount : createAccount,
    userLogin : userLogin,
}
