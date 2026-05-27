// ABRIR PESQUISAS

const infoBtns = document.querySelectorAll('.info-btn');

infoBtns.forEach(btn => {

  btn.addEventListener('click', () => {

    const content = btn.nextElementSibling;

    if(content.style.display === 'block'){

      content.style.display = 'none';

      btn.innerText = 'Ver Pesquisa';

    }else{

      content.style.display = 'block';

      btn.innerText = 'Fechar Pesquisa';

    }

  });

});
