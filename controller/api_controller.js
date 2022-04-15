var { validacoesInfoBoleto } = require('./business/validacoesInfoBoleto')

exports.getLinhaBoleto = async function(req, res, next) {
    try {

        const infoParam = req.params && req.params.idBoleto
        
        if(!infoParam){
            throw Error("Dados do boleto não encontrados, por favor informe corretamente a linha digitável")
        }

        let infoBoleto = validacoesInfoBoleto(infoParam)
        res.send(infoBoleto)


    } catch (error) {
        console.log(error);
        res.status(400);
        res.send({
            mensagem: error.message
        })
    }

    next()
}