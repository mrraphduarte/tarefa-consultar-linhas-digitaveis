const { validacoesInfoBoleto } = require('../controller/business/validacoesInfoBoleto')
const { errosGerais } = require("../controller/business/constError") 

test('Erro ao enviar linha digitavel com espaço', async() => {
    let linhaDigitavel = '212900011921100012109044756174 05975870000002000'
    
    expect(() => {
        validacoesInfoBoleto(linhaDigitavel)
    }).toThrowError(new Error(errosGerais.espacoBrancoLetras))
});

test('Erro ao enviar linha digitavel com letras Maiúscula', async() => {
    let linhaDigitavel = '212900011921100012T090E4756174A05975870000002000'
    
    expect(() => {
        validacoesInfoBoleto(linhaDigitavel)
    }).toThrowError(new Error(errosGerais.espacoBrancoLetras))
});

test('Erro ao enviar linha digitavel com letras minúscula', async() => {
    let linhaDigitavel = '212900011921100012t090e4756174a05975870000002000'
    
    expect(() => {
        validacoesInfoBoleto(linhaDigitavel)
    }).toThrowError(new Error(errosGerais.espacoBrancoLetras))
});

test('Erro ao enviar linha digitavel quantidade de caracteres menores', async() => {
    let linhaDigitavel = '21299758700000020000001121100012100447561740'
    
    expect(() => {
        validacoesInfoBoleto(linhaDigitavel)
    }).toThrowError(new Error(errosGerais.quantidadeCarater))
});