// let titulo = document.querySelector('h1'); //query.selector selecionará apenas o h1 dentro do html
// titulo.innerHTML = 'Jogo do número secreto'; //titulo.innerHTML inserirá o texto dentro da variável título no html

// let paragrafo = document.querySelector('p');
// paragrado.innerHTML = 'Escolha um número entre 1 e 10';

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoTela(tag, texto) { //com essa função diminui-se o código, utilizando o parametro "tag" e "texto" subistituo por tudo que quero chamar, h1 e p
    let campo = document.querySelector(tag); //let campo é qual o lugar no html que estarei chamando definido na tag
    campo.innerHTML = texto; //dentro de campo no html pegar texto, em cada tag no html haverá um texto
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); //"responsiveVoice" se comunica com o script src no HTML, "speak" add a função de fala, "texto" define o que será falado, juntamente com o idioma, já "rate" define a velocidade da voz.
}

function mensagensIniciais() {
    exibirTextoTela('h1', 'Jogo do número secreto');
    exibirTextoTela('p', 'Escolha um número entre 1 a 10');
}

mensagensIniciais();

function verificarChute() { //cria-se a função utilizando o mesmo nome do "onclick" no html
    let chute = document.querySelector('input').value; //variável chute é criada para descobrir o valor do input, campo que o usuário inserirá os dados, .value é usado para sinalizar o objetivo de armazenar um valor e não texto.
    
    if (chute == numeroSecreto) {
        exibirTextoTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? `tentativas` : `tentativa`; // "?" significa "se/if" ":" significa "senão/else"
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); //getElementById buscará no HTML o Id "reiniciar", removeAttribute desabilita no HTML o comando de "disabled"
    } else {
        if (chute > numeroSecreto) {
            exibirTextoTela('p', 'O número secreto é menor');
        } else {
            exibirTextoTela('p', 'O número secreto é maior');
        }
        // tentativas = tentativas + 1;
        tentativas++; //ou seja, a cada tentativa errada contará mais uma tentativa.
        limparCampo();
    }; //verifica se a informação inserida no input é igual(==) a variável numerosecreto
}

// function gerarNumeroAleatorio() {
//     return parseInt(Math.random() * 10 + 1);  //return é usado para mostrar no console o número gerado na função matemática, math.random é usado para funções matemáticas e parseInt para transformar números decimais em inteiros.
// }

function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // é criado a variável que verificará os "números escolhidos" e o "número limite" que poderá ser digitado
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; //cria-se variável com a quantidade de números sorteados
   if (quantidadeDeElementosNaLista == numeroLimite) { //compara se a qtde de números sorteados é igual ao número limete da lista.
    listaDeNumerosSorteados = [] //caso a comparação seja verdadeira será "zerado" a contagem 
   }
   
   if (listaDeNumerosSorteados.includes(numeroEscolhido)) { //na condicional verificará se o número escolhido está "includes/incluido" dentro da lista (array)
    return gerarNumeroAleatorio();
   } else {
        listaDeNumerosSorteados.push(numeroEscolhido); //método push() adiciona o elemento que passamos nos parênteses ao final da lista.
        return numeroEscolhido; //o elemento não estando na lista retorna ao número escolhido.
   }  
}

function limparCampo() {
    chute = document.querySelector('input'); // não é colocado .value, pois não se quer pegar algum valor e sim, obter um campo vazio.
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagensIniciais();
    document.getElementById('reiniciar').setAttribute('disabled', true); // para desabilitar botão novo jogo após reiniciar jogo, é usado "true" em setAttribute confirmando sua desabilitação.
}