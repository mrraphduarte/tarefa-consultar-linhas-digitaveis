const { validarInfoCodigoTP, converterLinhaParaCódigoTB } = require('../controller/business/titulosBancario')
const { titulosBancarios } = require("../controller/business/constError") 

test('validar retorno título bancário', async() => {

    let linhaDigitavel = '21290001192110001210904475617405975870000002000'
    let infoCD = converterLinhaParaCódigoTB(linhaDigitavel)
    let valor = validarInfoCodigoTP(linhaDigitavel, infoCD)

    expect(valor).toEqual({
        barCode: "21299758700000020000001121100012100447561740",
        amount: "20.00",
        expirationDate: "2018-07-16"
    })
});

test('Erro ao validar composicao de campos do título bancário', async() => {
    
    let linhaDigitavel = '21290002192110001210904475617405975870000002000'
    let infoCD = converterLinhaParaCódigoTB(linhaDigitavel)

    expect(() => {
        validarInfoCodigoTP(linhaDigitavel, infoCD)
    }).toThrowError(new Error(titulosBancarios.linhaDigitavel))
});

test('Erro ao validar código de barras do título bancário', async() => {

    let linhaDigitavel = '21290001192110001210904475617405975870000002000'
    let infoCD = converterLinhaParaCódigoTB(linhaDigitavel)

    infoCD.codigoBarras = '21299758700000021000000121100012100447561740'

    expect(() => {
        validarInfoCodigoTP(linhaDigitavel, infoCD)
    }).toThrowError(new Error(titulosBancarios.codigoBarras))
});