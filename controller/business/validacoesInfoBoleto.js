
const { converterLinhaParaCódigoTB, validarInfoCodigoTP } = require("./titulosBancario")
const { converterLinhaParaCódigoPC, validarInfoCodigoPC } = require("./pagamentosConcessionarias")
const { TIPO_BOLETOS } = require("./const")
const { errosGerais } = require("./constError")

exports.validacoesInfoBoleto = function(idBoleto){
    
    let infoBoleto = validacoesGerais(idBoleto)

    return infoBoleto
        
}

function validacoesGerais(linhaValidar){
   
    let infoBoleto = null
    let { tituloBancario, pagamentoConcessionarias} = TIPO_BOLETOS

    if ((linhaValidar.toUpperCase().match(/[A-Z]/) != null) || linhaValidar.match(/\s/g))
        throw Error(errosGerais.espacoBrancoLetras)

    if(![tituloBancario.quantidadeCaracter, pagamentoConcessionarias.quantidadeCaracter].includes(linhaValidar.length))
        throw Error(errosGerais.quantidadeCarater)

    if(linhaValidar.length === tituloBancario.quantidadeCaracter){
        
        //BOLETO PADRAO VALIDACAO 47 CARACTER LINHA DIGITAVEL
        let retornoInfoCode = converterLinhaParaCódigoTB(linhaValidar)
        infoBoleto = validarInfoCodigoTP(linhaValidar, retornoInfoCode)

    } else {

        //BOLETO CONCEISSIONARIA 48 CARACTER LINHA DIGITAVEL
        let retornoInfoCode = converterLinhaParaCódigoPC(linhaValidar)
        infoBoleto = validarInfoCodigoPC(retornoInfoCode)
    }
    
    return infoBoleto
}
