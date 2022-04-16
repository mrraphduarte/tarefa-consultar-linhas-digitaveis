const errosGerais = {
    payloadIncorreto: "Dados do boleto não encontrados, por favor informe corretamente a linha digitável",
    espacoBrancoLetras: "Dados do boleto informados incorretamente, a cadeia deve possuir apenas números, por favor verifique se a cadeia possui espaços e/ou letras.",
    quantidadeCarater: "Por favor verifique o tipo de boleto a ser enviado: títulos bancários ou pagamentos de concessionárias"
}

const titulosBancarios = {
    linhaDigitavel: "Por favor verifique os dados informados da linha digitável.",
    codigoBarras: "Dígito verificador do código de barras incorreto, entrar em contato com time de sistemas"
}

const pagamentoConcessionaria = {
    DACModulo10: "Dígito verificador do código de barras incorreto (DAC Módulo 10), entrar em contato com time de sistemas",
    DACModulo11: "Dígito verificador do código de barras incorreto (DAC Módulo 11), entrar em contato com time de sistemas",
    moduloDesconhecido: "Módulo DAC desconhecido, por favor verifique os dados informados da linha digitável."
}

exports.errosGerais = errosGerais
exports.titulosBancarios = titulosBancarios
exports.pagamentoConcessionaria = pagamentoConcessionaria