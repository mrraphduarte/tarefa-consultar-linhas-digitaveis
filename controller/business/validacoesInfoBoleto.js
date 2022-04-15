
const { converterLinhaParaCódigo, validarInfoCodigo } = require("./titulosBancario")

exports.validacoesInfoBoleto = function(idBoleto){
    
    let infoBoleto = validacoesGerais(idBoleto)

    return infoBoleto
        
}

function validacoesGerais(linhaValidar){
   
    let infoBoleto = null

    if ((linhaValidar.toUpperCase().match(/[A-Z]/) != null) || linhaValidar.match(/\s/g))
        throw Error("Dados do boleto informados incorretamente, a cadeia deve possuir apenas números, por favor verifique se a cadeia possui espaços e/ou letras.")

    if(![47, 48].includes(linhaValidar.length))
        throw Error("Por favor verifique o tipo de boleto a ser enviado: títulos bancários ou pagamentos de concessionárias")

    if(linhaValidar.length === 47){
        
        //BOLETO PADRAO VALIDACAO 47 CARACTER LINHA DIGITAVEL
        // TODO: títulos bancários  
        let retornoInfoCode = converterLinhaParaCódigo(linhaValidar)
    
        infoBoleto = validarInfoCodigo(linhaValidar, retornoInfoCode)

    } else {

        //BOLETO CONCEISSIONARIA 48 CARACTER LINHA DIGITAVEL
        // TODO pagamentos de concessionárias
    }
    
    return infoBoleto
}
