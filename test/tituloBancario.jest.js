const { validarInfoCodigoTP, converterLinhaParaCódigoTB } = require('../controller/business/titulosBancario')

test('validar retorno título boleto', async() => {
    let linhaDigitavel = '848900000002404201622015806051904292586034111220'
    let infoCD = converterLinhaParaCódigoTB(linhaDigitavel)

    let valor = validarInfoCodigoTP(linhaDigitavel, infoCD)

    expect(valor).toEqual({
        "barCode": "84890000000404201622018060519042958603411122",
        "amount": "40.42",
        "expirationDate": "2018-06-05"
    })
});