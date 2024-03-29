const { default: axios } = require("axios")
const DBurl = 'https://brachnode-dc82.restdb.io/rest/article'
const headers = { 
    'x-apikey': '29a59cfcac6ee5b48b1cec695706df5edabce' 
}

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

async function getArticleByUserId(id) {
    config = {
        headers : headers
    }
    const dataArticle = await axios.get('https://brachnode-dc82.restdb.io/rest/article?q={"idUser._id" : "'+id+'"}', config)
    return(dataArticle)
}


async function getAllArticle() {
    config = {
        headers : headers
    }
    const allArticle = await axios.get(DBurl, config)
    return(allArticle)
}

async function addArticle(data) {
    config = {
        headers : headers,
    }
    const addArticle = await axios.post(DBurl, data, config)
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
    const modif = await axios.put(DBurl+`/${id}`, newData, config)
    return(modif);
}

module.exports = {
    getArticleById : getArticleById,
    getAllArticle : getAllArticle,
    addArticle : addArticle,
    deleteArticle : deleteArticle,
    updateArticle : updateArticle,
    getArticleByUserId : getArticleByUserId,
}