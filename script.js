// Seleciona os elementos do HTML
const botao = document.getElementById('btnToggle');
const conteudo = document.getElementById('conteudoInfo');

// Adiciona o evento de clique no botão
botao.addEventListener('click', () => {
  // Verifica se o conteúdo está escondido
  if (conteudo.style.display === 'none' || conteudo.style.display === '') {
    conteudo.style.display = 'block';
    botao.textContent = 'Fechar';
  } else {
    conteudo.style.display = 'none';
    botao.textContent = 'Saiba Mais';
  }
});
