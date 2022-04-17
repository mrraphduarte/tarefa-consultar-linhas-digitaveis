const { validarInfoCodigoPC, converterLinhaParaCódigoPC } = require('../controller/business/pagamentosConcessionarias')
const { pagamentoConcessionaria } = require("../controller/business/constError") 

test('Validar retorno pagamento Concessionária com data de pagamento', async() => {
    let linhaDigitavel = '848900000002404201622015806051904292586034111220'

    let infoCD = converterLinhaParaCódigoPC(linhaDigitavel)
    let valor = validarInfoCodigoPC(infoCD)

    expect(valor).toEqual({
        "barCode": "84890000000404201622018060519042958603411122",
        "amount": "40.42",
        "expirationDate": "2018-06-05"
    })
});

test('Validar retorno pagamento Concessionária sem data de pagamento', async() => {
    let linhaDigitavel = '826200000006674100970914016338677419196247068931'
    
    let infoCD = converterLinhaParaCódigoPC(linhaDigitavel)
    let valor = validarInfoCodigoPC(infoCD)

    expect(valor).toEqual({
        "barCode": "82620000000674100970910163386774119624706893",
        "amount": "67.41"
    })
});

test('Validar retorno pagamento Concessionária com validador DAC MODULO 10 incorreto', async() => {
    let linhaDigitavel = '846900000002404201622015806051904292586034111220'
    
    let infoCD = converterLinhaParaCódigoPC(linhaDigitavel)

    expect(() => {
        validarInfoCodigoPC(infoCD)
    }).toThrowError(new Error(pagamentoConcessionaria.DACModulo10))
});

test('Validar retorno pagamento Concessionária com validador DAC MODULO 11 incorreto', async() => {
    let linhaDigitavel = '829200000006674100970914016338677419196247068931'
    
    let infoCD = converterLinhaParaCódigoPC(linhaDigitavel)

    expect(() => {
        validarInfoCodigoPC(infoCD)
    }).toThrowError(new Error(pagamentoConcessionaria.DACModulo11))
});

test('Validar retorno pagamento Concessionária com validador DAC MODULO não identificado', async() => {
    let linhaDigitavel = '841900000002404201622015806051904292586034111220'
    
    let infoCD = converterLinhaParaCódigoPC(linhaDigitavel)

    expect(() => {
        validarInfoCodigoPC(infoCD)
    }).toThrowError(new Error(pagamentoConcessionaria.moduloDesconhecido))
});