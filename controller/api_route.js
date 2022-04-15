var api_controller = require("./api_controller")
var restify = require("restify")

const corsMiddleware = require("restify-cors-middleware2")
const cors = corsMiddleware({
    origins: ["*"],
    allowHeaders: ["*"]
})

// CONFIG AXIOS GLOBALMENTE
const https = require('https')
const axios = require('axios')
axios.interceptors.request.use(function(config) {
    config.httpsAgent = new https.Agent({ rejectUnauthorized: false })
    return config;
});

// CRIANDO O SERVER
var server = restify.createServer()

server.pre(cors.preflight)
server.use(cors.actual)

//TODO: Validar necessidade de se ter
server.use(restify.plugins.fullResponse())
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.queryParser())

server.get("/boleto/:idBoleto", api_controller.getLinhaBoleto)

exports.server = server