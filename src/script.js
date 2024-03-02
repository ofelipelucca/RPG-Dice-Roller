let limite_dados = 13;
let qnt_dados = 0;
let dados = {
    4: 0,
    6: 0,
    10: 0,
    20: 0,
    100: 0,
};

function add() {
    let dados_escolhidos = document.getElementById('DadosEscolhidos');
    let resultado = document.getElementById('Numero'); 
    
    if (resultado.innerHTML != "") limpar({limparVariaveis: true});

    limpar({limparResultadoHTML: true})

    var valor = document.getElementById('Select').value;
    if (valor != 0 && qnt_dados != limite_dados) {
        dados[valor] += 1;
        qnt_dados += 1;

        document.getElementById('Qnt_Dados').innerHTML = qnt_dados;
        dados_escolhidos.innerHTML += " d" + valor;
    }
}

function remove() {
    let dados_escolhidos = document.getElementById('DadosEscolhidos'); 
    let resultado = document.getElementById('Numero');

    if (resultado.innerHTML != "") limpar({limparVariaveis: true});

    limpar({limparResultadoHTML: true})


    var valor = document.getElementById('Select').value;
    if (valor != 0 && qnt_dados > 0 && dados[valor] > 0) {
        dados[valor] -= 1;
        qnt_dados -= 1;

        document.getElementById('Qnt_Dados').innerHTML = qnt_dados;
        let dado_removido = "d" + valor;
        let novo_texto = dados_escolhidos.innerHTML.replace(dado_removido, '');

        dados_escolhidos.innerHTML = novo_texto;
    }
}

function roll() {
    let dado = document.getElementById('Dado');
    let numero = document.getElementById('Numero');
    let dados_escolhidos = document.getElementById('DadosEscolhidos');
    let count_dados = document.getElementById('Qnt_Dados');

    numero.innerHTML = '';
    dado.innerHTML = '';
    dados_escolhidos.innerHTML = '';
    count_dados.innerHTML = '';

    if (qnt_dados > 0) {
        let resultado = 0; 

        for (let dado in dados) {
            for (let i = 0; i < dados[dado]; i++) {
                resultado += Math.floor(Math.random() * parseInt(dado)) + 1;
            }
        }

        numero.innerHTML = resultado;
    }
}

function limpar(config) {
    if (config && typeof config === 'object') {
        if (config.limparVariaveis) {
            dados = {
                4: 0,
                6: 0,
                10: 0,
                20: 0,
                100: 0,
            };
            qnt_dados = 0;
        }
        if (config.limparHTML) {
            let dados_escolhidos = document.getElementById('DadosEscolhidos');
            let qnt_dados_div = document.getElementById('Qnt_Dados');
            let resultado = document.getElementById('Numero');
            
            dados_escolhidos.innerHTML = '';
            qnt_dados_div.innerHTML = '';
            resultado.innerHTML = '';
        }
        if (config.limparResultadoHTML) {
            let resultado = document.getElementById('Numero');

            resultado.innerHTML = '';
        }
    } else {
        console.error('Objeto de configuração inválido.');
    }
}

function piscar(config) {
    if (config && typeof config === 'object') {
        if (config.Texto) {
            // todo: implementaçao de animaçao do elemento
        }
        if (config.Background) {
            // todo: implementaçao de animaçao do elemento
        }
    }
}