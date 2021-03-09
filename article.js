const { default: axios } = require("axios")

const DBurl = 'https://brachnode-dc82.restdb.io/rest/article'
const headers = { 'x-apikey': '29a59cfcac6ee5b48b1cec695706df5edabce' }

async function getArticleById(id) {
    config = {
        params: {
            q : { _id: id }
        },
        headers : headers
    }
    const idArticle = await axios.get(DBurl, config)
    return(idArticle)
}

async function getAllArticle() {
    config = {
        headers : headers
    }
    const allArticle = await axios.get(DBurl, config)
    return(allArticle)
}

async function addArticle(nom) {
    config = {
        headers : headers
    }
    const addArticle = await axios.post(DBurl, {titre : nom}, config)
    return(addArticle)
}

async function deleteArticle(id) {
    config = {
        headers : headers,
    }
    const deleteArticle = await axios.delete(DBurl+`/${id}`, config)
    return(deleteArticle)
}

async function updateArticle(newData, id) {
    config = {
        headers : headers
    }
    const modif = await axios.put(DBurl+`/${id}`, {titre : newData}, config)
    return(modif);
}

module.exports = {
    getArticleById : getArticleById,
    getAllArticle : getAllArticle,
    addArticle : addArticle,
    deleteArticle : deleteArticle,
    updateArticle : updateArticle,
}