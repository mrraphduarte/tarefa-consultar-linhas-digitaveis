const DETERMINANTE_DIVISAO_TP = 10
const DETERMINANTE_SUBTRACAO_COD_BARRAS_TP = 11

const DETERMINANTE_DAC_MODULO_10 = {
    determinante: 10,
    restoCondicional: [0],
    resultadoDeterminante: "0"
}

const DETERMINANTE_DAC_MODULO_11 = {
    determinante: 11,
    restoCondicional_0: [0, 1],
    restoCondicional_1: [10],
    resultadoDeterminante_0: "0",
    resultadoDeterminante_1: "1"
}

const TIPO_BOLETOS = {
    tituloBancario:{
        quantidadeCaracter: 47,
        descricao: "Título bancário"
    },
    pagamentoConcessionarias: {
        quantidadeCaracter: 48,
        descricao: "Pagamento concessionárias"
    }
}

exports.TIPO_BOLETOS = TIPO_BOLETOS
exports.DETERMINANTE_DAC_MODULO_10 = DETERMINANTE_DAC_MODULO_10
exports.DETERMINANTE_DAC_MODULO_11 = DETERMINANTE_DAC_MODULO_11
exports.DETERMINANTE_DIVISAO_TP = DETERMINANTE_DIVISAO_TP
exports.DETERMINANTE_SUBTRACAO_COD_BARRAS_TP = DETERMINANTE_SUBTRACAO_COD_BARRAS_TP