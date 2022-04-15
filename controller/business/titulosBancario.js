
const { DETERMINANTE_DIVISAO, DETERMINANTE_SUBTRACAO_COD_BARRAS } = require("./const")

exports.converterLinhaParaCódigo = function(linha){

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
        codigobarras: posicao1 + posicao2 + posicao9 + posicao3 + posicao5 + posicao7, 
        digitosVerificadosres:{
            primeiro: posicao4, 
            segundo: posicao6, 
            terceiro: posicao8
        }
    }
}

exports.validarInfoCodigo = function(linhaDigitavel, infoCD){

    let { codigobarras, digitosVerificadosres} = infoCD
    
    let campo1 = linhaDigitavel.substr(0,9)
    let digitoVer1 = linhaDigitavel.substr(9,1)
    let validador1 = calculoComposicaoLinha(campo1, digitoVer1, digitosVerificadosres.primeiro, 2)
    
    let campo2 = linhaDigitavel.substr(10,10)
    let digitoVer2 = linhaDigitavel.substr(20,1)
    let validador2 = calculoComposicaoLinha(campo2, digitoVer2, digitosVerificadosres.segundo, 1)

    let campo3 = linhaDigitavel.substr(21,10)
    let digitoVer3 = linhaDigitavel.substr(31,1)
    let validador3 = calculoComposicaoLinha(campo3, digitoVer3, digitosVerificadosres.terceiro, 1)

    let validadorCodeBar = calculoComposicaoDigitoVerificador(codigobarras)

    if(!validador1 || !validador2 || !validador3){
        throw Error("Por favor verifique os dados informados da linha digitável.")
    }

    if(!validadorCodeBar){
        throw Error("Dígito verificador do código de barras incorreto, entrar em contato com time de sistemas")
    }

    return BuscarValoresCodigoBarras(codigobarras)

}

function calculoComposicaoLinha(item, digitoVerificador, dvLinhas, multiplicador){

    let validar = false
    var  produto = multiplicador
    let itemValorComposicao = 0

    for (let i = 0; i < item.length; i++) {
        let element =  (parseFloat(item[i]) * produto).toString();

        if(element.length > 1){
            itemValorComposicao = itemValorComposicao + (parseFloat(element[0]) + parseFloat(element[1]))  
        }else{
            itemValorComposicao = itemValorComposicao + parseFloat(element)
        }

        produto === 2 ? produto = 1 : produto = 2
    }

    let resto = itemValorComposicao % DETERMINANTE_DIVISAO 
    let valorDecimalComposicao = (parseFloat(itemValorComposicao.toString()[0]) + 1) * 10
    let dvCodigo = (valorDecimalComposicao - resto).toString()[1]
    
    if(digitoVerificador === dvCodigo && dvCodigo === dvLinhas) { validar = true } 
    
    return validar
}

function calculoComposicaoDigitoVerificador(codigobarras){

    let multiplicador = 2
    let digitoVerificador = codigobarras.substr(4,1)
    let valorComposicao = 0

    let composicaoValorCodeBar = `${codigobarras.substr(0,4)}${codigobarras.substr(5,codigobarras.length)}`
    composicaoValorCodeBar = [...composicaoValorCodeBar].reverse().join("")

    for (let i = 0; i < composicaoValorCodeBar.length; i++) {
        const element = parseFloat(composicaoValorCodeBar[i]);

        valorComposicao = valorComposicao + (element * multiplicador)
        multiplicador > 8 ? multiplicador = 2 : multiplicador = multiplicador + 1
    }

    let resto = valorComposicao % DETERMINANTE_SUBTRACAO_COD_BARRAS
    let valorDigito = DETERMINANTE_SUBTRACAO_COD_BARRAS - resto
    let resultadoDigitoValidador = [0, 10, 11].includes(valorDigito) ? 1 : valorDigito

    return digitoVerificador === resultadoDigitoValidador.toString()
}

function BuscarValoresCodigoBarras(codigobarras){

    let valor = codigobarras.substr(9,10)
    let fatorVencimento = parseInt(codigobarras.substr(5,4)) - 1000

    let dataVencimento = new Date(2000, 07, 03)
    dataVencimento = new Date(dataVencimento.setDate(dataVencimento.getDate() + fatorVencimento))
   
    valor = `${parseFloat(valor.substr(0, 8))}.${valor.substr(8, 2)}`
    
    return{
        barCode: codigobarras,
        amount: valor,
        expirationDate: `${dataVencimento.getFullYear().toString().padStart(4, '0')}-${dataVencimento.getMonth().toString().padStart(2, '0')}-${dataVencimento.getDate().toString().padStart(2, '0')}`
    }  
}


