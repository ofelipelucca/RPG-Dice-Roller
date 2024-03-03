const limite_dados = 10;
let qnt_dados = 0;
let dados = {
    4: 0,
    6: 0,
    10: 0,
    20: 0,
    100: 0,
};
let animacao_em_andamento = false;

function adicionar() {
    let dados_escolhidos = document.getElementById('DadosEscolhidos');
    let resultado = document.getElementById('Numero'); 
    
    if (resultado.innerHTML != "" || animacao_em_andamento) {
        limpar({limparVariaveis: true});
        animacao_em_andamento = false;
    }

    limpar({limparResultadoHTML: true});

    var valor = document.getElementById('Select').value;
    if (valor != 0 && qnt_dados != limite_dados) {
        dados[valor] += 1;
        qnt_dados += 1;

        document.getElementById('Qnt_Dados').innerHTML = qnt_dados;
        dados_escolhidos.innerHTML += " d" + valor;
        animar('DadosEscolhidos', 'piscar-texto', 250);
    }
}

function remove() {
    let dados_escolhidos = document.getElementById('DadosEscolhidos'); 
    let resultado = document.getElementById('Numero');

    if (resultado.innerHTML != "" || animacao_em_andamento) {
        limpar({limparVariaveis: true});
        animacao_em_andamento = false;
    }

    limpar({limparResultadoHTML: true});

    var valor = document.getElementById('Select').value;
    if (valor != 0 && qnt_dados > 0 && dados[valor] > 0) {
        dados[valor] -= 1;
        qnt_dados -= 1;

        if (qnt_dados == 0) {
            document.getElementById('Qnt_Dados').innerHTML = '';
        } else {
            document.getElementById('Qnt_Dados').innerHTML = qnt_dados;
        }

        let dado_removido = "d" + valor;
        let novo_texto = dados_escolhidos.innerHTML.replace(dado_removido, '');

        dados_escolhidos.innerHTML = novo_texto;
        animar('DadosEscolhidos', 'piscar-texto', 250);
    }
}

function roll() {
    let dado_container = document.getElementById('Dado');
    let numero = document.getElementById('Numero');
    let dados_escolhidos = document.getElementById('DadosEscolhidos');
    let count_dados = document.getElementById('Qnt_Dados');
    
    numero.innerHTML = '';
    dados_escolhidos.innerHTML = '';
    count_dados.innerHTML = '';

    if (qnt_dados > 0) {
        let resultado = 0;

        animacao_em_andamento = true;
        botoes("desativar");

        for (let dado in dados) {
            for (let i = 0; i < dados[dado]; i++) {
                resultado += Math.floor(Math.random() * parseInt(dado)) + 1;
            }
        }

        if (dado_container.firstChild) {
            dado_container.removeChild(dado_container.firstChild);
        }

        let novo_dado = document.createElement('img');
        novo_dado.src = './media/d20roll.gif?' + new Date().getTime();
        novo_dado.id = 'Dado';
        dado_container.appendChild(novo_dado);

        animar('Dado', 'aparecer', 500);

        setTimeout(function() {
            dado_container.removeChild(dado_container.firstChild);

            let novo_dado_stop = document.createElement('img');
            novo_dado_stop.src = './media/d20stop.gif?' + new Date().getTime();
            novo_dado_stop.id = 'Dado';
            dado_container.appendChild(novo_dado_stop);

            numero.innerHTML = resultado;
            animar('Numero', 'piscar-texto', 250);
            
            animacao_em_andamento = false;
            botoes("ativar");
        }, 2500);
    } 
    else if (!animacao_em_andamento) {
        animacao_em_andamento = true;
        animar('ButtonAdd', 'piscar-background', 1000);

        setTimeout(function() {
            animacao_em_andamento = false;
        }, 1000);
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
            animacao_em_andamento = false;
        }
        if (config.limparHTML) {
            let dados_escolhidos = document.getElementById('DadosEscolhidos');
            let qnt_dados_div = document.getElementById('Qnt_Dados');
            let resultado = document.getElementById('Numero');
            let dado = document.getElementById('Dado');
            
            dados_escolhidos.innerHTML = '';
            qnt_dados_div.innerHTML = '';
            resultado.innerHTML = '';
            dado.innerHTML = '';
            botoes('ativar');
        }
        if (config.limparResultadoHTML) {
            let resultado = document.getElementById('Numero');
            let dado = document.getElementById('Dado');

            resultado.innerHTML = '';
            dado.innerHTML = '';
            botoes('ativar');
        }
    } else {
        console.error('Objeto de configuração inválido.');
    }
}

function animar(id_elemento, animacao, tempo) {
    let elemento = document.getElementById(id_elemento);
    elemento.classList.add(animacao);
    setTimeout(function() {
        elemento.classList.remove(animacao);
    }, tempo);
}

function botoes(opcao) { 
    let botao_roll = document.getElementById('ButtonRoll');
    let botao_add = document.getElementById('ButtonAdd');
    let botao_remove = document.getElementById('ButtonRemove');

    if (opcao == "ativar") {
        botao_roll.onclick = roll;
        botao_add.onclick = adicionar;
        botao_remove.onclick = remove;
    } 
    if (opcao == "desativar") {
        botao_roll.onclick = null;
        botao_add.onclick = null;
        botao_remove.onclick = null;
    }
}