var configuracoesAplicacao = require('./ConfiguracoesAplicacao')
var controller = require('./controller')


async function startup(){
    console.log("Iniciando a aplicação tarefa-consultar-linhas-digitaveis")
    
    try {
        controller.server.listen(configuracoesAplicacao.env.http_port, function() {
            console.log("Módulo iniciado")
        })
        
    } catch (error) {
        console.log('Erro ao iniciar a aplicação tarefa-consultar-linhas-digitaveis')
        console.error(error)
        process.exit(1)
    } 
}

startup()