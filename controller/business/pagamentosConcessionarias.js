const { DETERMINANTE_DAC_MODULO_10, DETERMINANTE_DAC_MODULO_11, TIPO_MODULO } = require("./const")
const { pagamentoConcessionaria } = require("./constError")

exports.converterLinhaParaCódigoPC = function(linha){

    let posicao1 = linha.substr(0,11)
    let digitoVerificador1 = linha.substr(11,1)
    let posicao2 = linha.substr(12,11)
    let digitoVerificador2 = linha.substr(23,1)
    let posicao3 = linha.substr(24,11)
    let digitoVerificador3 = linha.substr(35,1)
    let posicao4 = linha.substr(36,11)
    let digitoVerificador4 = linha.substr(47,1)
    
    return {
        codigoBarras: posicao1 + posicao2 + posicao3 + posicao4, 
        codigoMoeda: linha.substr(2,1),
        digitosVerificadosres:{
            primeiro: digitoVerificador1, 
            segundo: digitoVerificador2, 
            terceiro: digitoVerificador3,
            quarto: digitoVerificador4
        }
    }
}

exports.validarInfoCodigoPC = function(infoCD){

    let { codigoBarras, codigoMoeda } = infoCD
    let { DAC_MODULO_10, DAC_MODULO_11 } = TIPO_MODULO

    let validadorCodeBarMod = false

    if(DAC_MODULO_10.includes(codigoMoeda)){

        validadorCodeBarMod = calculoComposicaoDigitoVerificadorMod10(codigoBarras)
        
        if(!validadorCodeBarMod){
            throw Error(pagamentoConcessionaria.DACModulo10)
        }
        
    }else if(DAC_MODULO_11.includes(codigoMoeda)){
        
        validadorCodeBarMod = calculoComposicaoDigitoVerificadorMod11(codigoBarras)
       
        if(!validadorCodeBarMod){
            throw Error(pagamentoConcessionaria.DACModulo11)
        }
       
    }else{
        throw Error(pagamentoConcessionaria.moduloDesconhecido)
    }
    
    return BuscarValoresCodigoBarras(codigoBarras)
    
}

function calculoComposicaoDigitoVerificadorMod10(codigoBarras){
    let { determinante } = DETERMINANTE_DAC_MODULO_10
    let multiplicador = 2
    let digitoVerificador = codigoBarras.substr(3,1)
    let valorComposicao = 0

    let composicaoValorCodeBar = `${codigoBarras.substr(0,3)}${codigoBarras.substr(4,codigoBarras.length)}`
    composicaoValorCodeBar = [...composicaoValorCodeBar].reverse().join("")

    for (let i = 0; i < composicaoValorCodeBar.length; i++) {
        let element =  (parseFloat(composicaoValorCodeBar[i]) * multiplicador).toString();

        if(element.length > 1){
            valorComposicao = valorComposicao + (parseFloat(element[0]) + parseFloat(element[1]))  
        }else{
            valorComposicao = valorComposicao + parseFloat(element)
        }

        multiplicador === 2 ? multiplicador = 1 : multiplicador = 2
    }

    let resto = valorComposicao % determinante
    let valorDigito = determinante - resto
    let resultadoDigitoValidador = valorDigito.toString()

    if(DETERMINANTE_DAC_MODULO_10.restoCondicional.includes(resto)){
    
        resultadoDigitoValidador = DETERMINANTE_DAC_MODULO_10.resultadoDeterminante
        
    }

    return digitoVerificador === resultadoDigitoValidador
}

function calculoComposicaoDigitoVerificadorMod11(codigoBarras){

    let { determinante } = DETERMINANTE_DAC_MODULO_11 
    let multiplicador = 2
    let digitoVerificador = codigoBarras.substr(3,1)
    let valorComposicao = 0

    let composicaoValorCodeBar = `${codigoBarras.substr(0,3)}${codigoBarras.substr(4,codigoBarras.length)}`
    composicaoValorCodeBar = [...composicaoValorCodeBar].reverse().join("")

    for (let i = 0; i < composicaoValorCodeBar.length; i++) {
        const element = parseFloat(composicaoValorCodeBar[i]);

        valorComposicao = valorComposicao + (element * multiplicador)
        multiplicador > 8 ? multiplicador = 2 : multiplicador = multiplicador + 1
    }

    let resto = valorComposicao % determinante
    let valorDigito = determinante - resto
    let resultadoDigitoValidador = valorDigito.toString()

    if(DETERMINANTE_DAC_MODULO_11.restoCondicional_0.includes(resto)){
        
        resultadoDigitoValidador = DETERMINANTE_DAC_MODULO_11.resultadoDeterminante_0
        
    }else if(DETERMINANTE_DAC_MODULO_11.restoCondicional_1.includes(resto)){
        
        resultadoDigitoValidador = DETERMINANTE_DAC_MODULO_11.resultadoDeterminante_1

    }

    return digitoVerificador === resultadoDigitoValidador
}

function BuscarValoresCodigoBarras(codigoBarras){

    let valor = codigoBarras.substr(5,11)
    let fatorVencimento = codigoBarras.substr(19,8)
    let dataValidade = {}
    
    valor = `${parseFloat(valor.substr(0, 8))}.${valor.substr(8, 2)}`

    if(new Date(fatorVencimento.substr(0, 4),fatorVencimento.substr(4, 2),fatorVencimento.substr(6, 2)) >= new Date(2000, 7, 3)){
        dataValidade = {
            expirationDate: `${fatorVencimento.substr(0, 4)}-${fatorVencimento.substr(4, 2)}-${fatorVencimento.substr(6, 2)}`
        }
    }
    
    return{
        barCode: codigoBarras,
        amount: valor,
        ...dataValidade
    }  
}


exports.calculoComposicaoDigitoVerificadorMod10 = calculoComposicaoDigitoVerificadorMod10
exports.calculoComposicaoDigitoVerificadorMod11 = calculoComposicaoDigitoVerificadorMod11