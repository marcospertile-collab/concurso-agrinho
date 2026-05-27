// MODO ESCURO

const darkBtn = document.getElementById('darkMode');

darkBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// BOTÃO TOPO

const topBtn = document.getElementById("topBtn");

window.onscroll = function () {

  if(document.body.scrollTop > 300 || document.documentElement.scrollTop > 300){

    topBtn.style.display = "block";

  }else{

    topBtn.style.display = "none";

  }

};

topBtn.addEventListener("click", () => {

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

});

// ANIMAÇÃO AO ROLAR

const cards = document.querySelectorAll('.card');

window.addEventListener('scroll', () => {

  cards.forEach(card => {

    const top = card.getBoundingClientRect().top;

    if(top < window.innerHeight - 100){

      card.style.opacity = 1;
      card.style.transform = "translateY(0)";

    }

  });

});

cards.forEach(card => {

  card.style.opacity = 0;
  card.style.transform = "translateY(50px)";
  card.style.transition = "0.6s";

});
