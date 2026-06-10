// Constantes de Configuração Estrutural
const canvas = document.getElementById("campo-jogo");
const ctx = canvas.getContext("2d");

const TAMANHO_BLOCO = 20;
const QUANTIDADE_BLOCOS = canvas.width / TAMANHO_BLOCO;

// Variáveis de Estado de Controle Interno (Requisito de Lógica)
let colheitadeira = [{ x: 10, y: 10 }];
let direcaoX = 0;
let direcaoY = 0;

let producaoAlimento = { x: 5, y: 5 };
let reflorestamentoArvore = { x: 12, y: 12 };
let pragaObstaculo = { x: 8, y: 15 };

let pontosProducao = 0;
let pontosAmbiente = 0;
let loopJogo = null;
let jogoAtivo = false;

// Seleção de Componentes do DOM para Atualização Dinâmica
const txtProducao = document.getElementById("pontos-producao");
const txtAmbiente = document.getElementById("pontos-ambiente");
const txtMensagem = document.getElementById("mensagem-jogo");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnTema = document.getElementById("btn-tema");

// --- 1. Sistema de Inicialização e Loops ---

// Função principal de redesenho periódico
function atualizarCicloJogo() {
    moverEntidades();
    
    if (verificarColisoesFatais()) {
        finalizarPartida();
        return;
    }
    
    processarColheitaEPlanteio();
    renderizarGraficos();
}

function iniciarJogo() {
    if (!jogoAtivo) {
        jogoAtivo = true;
        txtMensagem.textContent = "Safra em andamento! Mantenha o equilíbrio ambiental.";
        loopJogo = setInterval(atualizarCicloJogo, 120); // Velocidade ideal estável
    }
}

// --- 2. Lógica de Movimentação e Posicionamento ---

function moverEntidades() {
    // Calcula a nova coordenada da cabeça da colheitadeira
    const cabecaX = colheitadeira[0].x + direcaoX;
    const cabecaY = colheitadeira[0].y + direcaoY;
    
    // Insere a nova posição no início do vetor
    colheitadeira.unshift({ x: cabecaX, y: cabecaY });
    
    // Remove o último bloco para manter o tamanho estável (a menos que morda um item)
    colheitadeira.pop();
}

function gerarNovaPosicaoValida() {
    return {
        x: Math.floor(Math.random() * QUANTIDADE_BLOCOS),
        y: Math.floor(Math.random() * QUANTIDADE_BLOCOS)
    };
}

// --- 3. Regras de Negócio e Pontuação (Tema Agrinho) ---

function processarColheitaEPlanteio() {
    const cabeca = colheitadeira[0];

    // Caso 1: Colheita de Alimento Saudável
    if (cabeca.x === producaoAlimento.x && cabeca.y === producaoAlimento.y) {
        pontosProducao += 10;
        txtProducao.textContent = pontosProducao; // Atualiza o DOM
        colheitadeira.push({ ...colheitadeira[colheitadeira.length - 1] }); // Cresce a máquina
        producaoAlimento = gerarNovaPosicaoValida();
        
        // Reposiciona o obstáculo dinamicamente para aumentar o desafio
        if (Math.random() > 0.4) pragaObstaculo = gerarNovaPosicaoValida();
    }

    // Caso 2: Reflorestamento e Preservação
    if (cabeca.x === reflorestamentoArvore.x && cabeca.y === reflorestamentoArvore.y) {
        pontosAmbiente += 15;
        txtAmbiente.textContent = pontosAmbiente; // Atualiza o DOM
        reflorestamentoArvore = gerarNovaPosicaoValida();
    }
}

function verificarColisoesFatais() {
    const cabeca = colheitadeira[0];

    // Colisão contra as fronteiras físicas do campo
    if (cabeca.x < 0 || cabeca.x >= QUANTIDADE_BLOCOS || cabeca.y < 0 || cabeca.y >= QUANTIDADE_BLOCOS) {
        return true;
    }

    // Colisão contra o próprio corpo (Superfaturamento / Má gestão de espaço)
    for (let i = 1; i < colheitadeira.length; i++) {
        if (cabeca.x === colheitadeira[i].x && cabeca.y === colheitadeira[i].y) {
            return true;
        }
    }

    // Colisão direta contra a Praga ou foco de Poluição
    if (cabeca.x === pragaObstaculo.x && cabeca.y === pragaObstaculo.y) {
        return true;
    }

    return false;
}

function finalizarPartida() {
    clearInterval(loopJogo);
    jogoAtivo = false;
    txtMensagem.innerHTML = `<span style="color: #e74c3c;">Fim de Jogo!</span> O balanço ecológico falhou.`;
    btnReiniciar.style.display = "block"; // Torna o botão visível no DOM
}

function reiniciarDadosJogo() {
    colheitadeira = [{ x: 10, y: 10 }];
    direcaoX = 0;
    direcaoY = 0;
    pontosProducao = 0;
    pontosAmbiente = 0;
    txtProducao.textContent = "0";
    txtAmbiente.textContent = "0";
    producaoAlimento = gerarNovaPosicaoValida();
    reflorestamentoArvore = gerarNovaPosicaoValida();
    pragaObstaculo = gerarNovaPosicaoValida();
    btnReiniciar.style.display = "none";
    txtMensagem.textContent = "Pressione uma seta ou botão para iniciar o plantio!";
}

// --- 4. Renderização Gráfica no Canvas ---

function renderizarGraficos() {
    // Limpa a tela inteira a cada frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha a Colheitadeira (Cobra) - Segmento por segmento
    colheitadeira.forEach((bloco, indice) => {
        ctx.fillStyle = indice === 0 ? "#1b5e20" : "#2ecc71"; // Cabeça mais escura
        ctx.fillRect(bloco.x * TAMANHO_BLOCO, bloco.y * TAMANHO_BLOCO, TAMANHO_BLOCO - 1, TAMANHO_BLOCO - 1);
    });

    // Desenha o Alimento Seguro (Maçã / Grão)
    ctx.fillStyle = "#e67e22";
    ctx.beginPath();
    let centroX = (producaoAlimento.x * TAMANHO_BLOCO) + TAMANHO_BLOCO / 2;
    let centroY = (producaoAlimento.y * TAMANHO_BLOCO) + TAMANHO_BLOCO / 2;
    ctx.arc(centroX, centroY, TAMANHO_BLOCO / 2 - 1, 0, 2 * Math.PI);
    ctx.fill();

    // Desenha a Árvore de Reflorestamento
    ctx.fillStyle = "#27ae60";
    ctx.fillRect(reflorestamentoArvore.x * TAMANHO_BLOCO + 3, reflorestamentoArvore.y * TAMANHO_BLOCO + 2, TAMANHO_BLOCO - 6, TAMANHO_BLOCO - 4);

    // Desenha a Praga / Nuvem de Poluição
    ctx.fillStyle = "#95a5a6";
    ctx.fillRect(pragaObstaculo.x * TAMANHO_BLOCO + 2, pragaObstaculo.y * TAMANHO_BLOCO + 2, TAMANHO_BLOCO - 4, TAMANHO_BLOCO - 4);
}

// --- 5. Manipulação de Eventos e Acessibilidade ---

function gerenciarEntradaTeclado(evento) {
    if (!jogoAtivo && [37, 38, 39, 40].includes(evento.keyCode)) {
        iniciarJogo();
    }

    switch (evento.keyCode) {
        case 37: // Esquerda
            if (direcaoX !== 1) { direcaoX = -1; direcaoY = 0; }
            break;
        case 38: // Cima
            if (direcaoY !== 1) { direcaoX = 0; direcaoY = -1; }
            break;
        case 39: // Direita
            if (direcaoX !== -1) { direcaoX = 1; direcaoY = 0; }
            break;
        case 40: // Baixo
            if (direcaoY !== -1) { direcaoX = 0; direcaoY = 1; }
            break;
    }
}

// Escutas de Eventos Oficiais do Sistema
document.addEventListener("keydown", gerenciarEntradaTeclado);
btnReiniciar.addEventListener("click", reiniciarDadosJogo);

// Funcionalidade dos botões Mobile
document.getElementById("btn-cima").addEventListener("click", () => { iniciarJogo(); if(direcaoY!==1){direcaoX=0; direcaoY=-1;} });
document.getElementById("btn-baixo").addEventListener("click", () => { iniciarJogo(); if(direcaoY!==-1){direcaoX=0; direcaoY=1;} });
document.getElementById("btn-esquerda").addEventListener("click", () => { iniciarJogo(); if(direcaoX!==1){direcaoX=-1; direcaoY=0;} });
document.getElementById("btn-direita").addEventListener("click", () => { iniciarJogo(); if(direcaoX!==-1){direcaoX=1; direcaoY=0;} });

// Implementação de Melhoria de Acessibilidade (Item 8.3 - Requisito Adicional)
btnTema.addEventListener("click", () => {
    const temaAtual = document.body.getAttribute("data-theme");
    if (temaAtual === "dark") {
        document.body.removeAttribute("data-theme");
    } else {
        document.body.setAttribute("data-theme", "dark");
    }
});

// Renderização inicial estática na tela
renderizarGraficos();
