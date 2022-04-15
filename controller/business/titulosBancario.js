
const { DETERMINANTE_DIVISAO_TP, DETERMINANTE_SUBTRACAO_COD_BARRAS_TP } = require("./const")
const { titulosBancarios } = require("./constError")

exports.converterLinhaParaCódigoTB = function(linha){

    let posicao1 = linha.substr(0,3)
    let posicao2 = linha.substr(3,1)
    let posicao3 = linha.substr(4,5)
    let posicao4 = linha.substr(9,1)
    let posicao5 = linha.substr(10,10)
    let posicao6 = linha.substr(20,1)
    let posicao7 = linha.substr(21,10)
    let posicao8 = linha.substr(31,1)
    let posicao9 = linha.substr(32, linha.length)
    
    return {
        codigoBarras: posicao1 + posicao2 + posicao9 + posicao3 + posicao5 + posicao7, 
        digitosVerificadosres:{
            primeiro: posicao4, 
            segundo: posicao6, 
            terceiro: posicao8
        }
    }
}

exports.validarInfoCodigoTP = function(linhaDigitavel, infoCD){

    let { codigoBarras, digitosVerificadosres} = infoCD
    
    let campo1 = linhaDigitavel.substr(0,9)
    let digitoVer1 = linhaDigitavel.substr(9,1)
    let validador1 = calculoComposicaoLinha(campo1, digitoVer1, digitosVerificadosres.primeiro)
    
    let campo2 = linhaDigitavel.substr(10,10)
    let digitoVer2 = linhaDigitavel.substr(20,1)
    let validador2 = calculoComposicaoLinha(campo2, digitoVer2, digitosVerificadosres.segundo)

    let campo3 = linhaDigitavel.substr(21,10)
    let digitoVer3 = linhaDigitavel.substr(31,1)
    let validador3 = calculoComposicaoLinha(campo3, digitoVer3, digitosVerificadosres.terceiro)

    let validadorCodeBar = calculoComposicaoDigitoVerificador(codigoBarras)

    if(!validador1 || !validador2 || !validador3){
        throw Error(titulosBancarios.linhaDigitavel)
    }

    if(!validadorCodeBar){
        throw Error(titulosBancarios.titulosBancarios)
    }

    return BuscarValoresCodigoBarras(codigoBarras)

}

function calculoComposicaoLinha(item, digitoVerificador, dvLinhas){

    let validar = false
    var  multiplicador = 2
    let itemValorComposicao = 0
    let composicaoitem = [...item].reverse().join("")

    for (let i = 0; i < composicaoitem.length; i++) {
        let element =  (parseFloat(composicaoitem[i]) * multiplicador).toString();

        if(element.length > 1){
            itemValorComposicao = itemValorComposicao + (parseFloat(element[0]) + parseFloat(element[1]))  
        }else{
            itemValorComposicao = itemValorComposicao + parseFloat(element)
        }

        multiplicador === 2 ? multiplicador = 1 : multiplicador = 2
    }

    let valorDecimalComposicao = (parseFloat(itemValorComposicao.toString()[0]) + 1) * 10
    let dvCodigo = (valorDecimalComposicao - itemValorComposicao).toString()
    dvCodigo === 10 ? dvCodigo = 0 : dvCodigo
    
    if(digitoVerificador === dvCodigo && dvCodigo === dvLinhas) { validar = true } 
    
    return validar
}

function calculoComposicaoDigitoVerificador(codigoBarras){

    let multiplicador = 2
    let digitoVerificador = codigoBarras.substr(4,1)
    let valorComposicao = 0

    let composicaoValorCodeBar = `${codigoBarras.substr(0,4)}${codigoBarras.substr(5,codigoBarras.length)}`
    composicaoValorCodeBar = [...composicaoValorCodeBar].reverse().join("")

    for (let i = 0; i < composicaoValorCodeBar.length; i++) {
        const element = parseFloat(composicaoValorCodeBar[i]);

        valorComposicao = valorComposicao + (element * multiplicador)
        multiplicador > 8 ? multiplicador = 2 : multiplicador = multiplicador + 1
    }

    let resto = valorComposicao % DETERMINANTE_SUBTRACAO_COD_BARRAS_TP
    let valorDigito = DETERMINANTE_SUBTRACAO_COD_BARRAS_TP - resto
    let resultadoDigitoValidador = [0, 10, 11].includes(valorDigito) ? 1 : valorDigito

    return digitoVerificador === resultadoDigitoValidador.toString()
}

function BuscarValoresCodigoBarras(codigoBarras){

    let valor = codigoBarras.substr(9,10)
    let fatorVencimento = parseInt(codigoBarras.substr(5,4)) - 1000

    let dataVencimento = new Date(2000, 07, 03)
    dataVencimento = new Date(dataVencimento.setDate(dataVencimento.getDate() + fatorVencimento))
   
    valor = `${parseFloat(valor.substr(0, 8))}.${valor.substr(8, 2)}`
    
    return{
        barCode: codigoBarras,
        amount: valor,
        expirationDate: `${dataVencimento.getFullYear().toString().padStart(4, '0')}-${dataVencimento.getMonth().toString().padStart(2, '0')}-${dataVencimento.getDate().toString().padStart(2, '0')}`
    }  
}


