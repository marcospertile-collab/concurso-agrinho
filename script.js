// MENU MOBILE

const menuMobile = document.getElementById('menu-mobile');
const navbar = document.getElementById('navbar');

menuMobile.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

// ANIMAÇÃO AO SCROLL

function revealSections() {
  const reveals = document.querySelectorAll('.reveal');

  reveals.forEach((section) => {
    const windowHeight = window.innerHeight;
    const revealTop = section.getBoundingClientRect().top;
    const revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      section.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealSections);

revealSections();

// BOTÃO VOLTAR AO TOPO

const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    topBtn.style.display = 'block';
  } else {
    topBtn.style.display = 'none';
  }
});

topBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
