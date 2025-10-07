// Section home inicio
var hamburguerBtn = document.querySelector('.hamburguer-btn');
var navList = document.querySelector('.nav-list');
var navListItems = document.querySelectorAll('.nav-list li a');

hamburguerBtn.addEventListener('click', activeClass);

function activeClass(){ 
    hamburguerBtn.classList.toggle('active'); //ativa e desativa mediante ao click btnHamburguer 
    navList.classList.toggle('active');
}

for (var i = 0; i < navListItems.length; i++){//Contagem dos items do navlist
    navListItems[i].addEventListener('click', listItemClicked);
}

//Sempre que um item do Navlist for clicado ele sai do background com os items
function listItemClicked (){
    hamburguerBtn.classList.remove('active');
    navList.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function() {
    // Código da Navbar
    const navbar = document.querySelector('.main-navbar');
    const scrollThreshold = 50;

    function toggleNavbarClass(){
        if(window.scrollY > scrollThreshold){
            navbar.classList.add('scrolled-navbar');
        }else {
            navbar.classList.remove('scrolled-navbar')
        }
    }

    window.addEventListener('scroll', toggleNavbarClass);
    toggleNavbarClass(); 
    
    //----------------------------------------------------
    // SWIPER FEEDBACKS - AGORA INICIALIZA DEPOIS DO DOM
    //----------------------------------------------------
    const swiper = new Swiper('.js-testimonials-slider', {
    grabCursor: true,
    spaceBetween: 30,
    
    // ----------- CONFIGURAÇÃO PARA ROLAGEM AUTOMÁTICA -----------
    autoplay: {
        delay: 4000, // Tempo em milissegundos (5 segundos entre slides)
        disableOnInteraction: false, // Continua rodando automaticamente mesmo depois de o usuário interagir
    },
    // -----------------------------------------------------------

    pagination:{
        el: '.js-testimonials-pagination',
        clickable: true
    },
    breakpoints: {
        767:{
            slidesPerView: 2
        }
    }
});
});