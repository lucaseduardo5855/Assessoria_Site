// Section home inicio (mantido fora do DOMContentLoaded, como estava no seu original)
var hamburguerBtn = document.querySelector('.hamburguer-btn');
var navList = document.querySelector('.nav-list');
var navListItems = document.querySelectorAll('.nav-list li a');

hamburguerBtn.addEventListener('click', activeClass);

function activeClass() {
    hamburguerBtn.classList.toggle('active'); //ativa e desativa mediante ao click btnHamburguer 
    navList.classList.toggle('active');
}

for (var i = 0; i < navListItems.length; i++) {//Contagem dos items do navlist
    navListItems[i].addEventListener('click', listItemClicked);
}

//Sempre que um item do Navlist for clicado ele sai do background com os items
function listItemClicked() {
    hamburguerBtn.classList.remove('active');
    navList.classList.remove('active');
}

// Junta todos os blocos DOMContentLoaded em um único
document.addEventListener('DOMContentLoaded', function () {
    // =========================================================
    // 1. CÓDIGO DA NAVBAR E EFEITO SCROLL
    // =========================================================
    const navbar = document.querySelector('.main-navbar');
    const scrollThreshold = 50;

    function toggleNavbarClass() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled-navbar');
        } else {
            navbar.classList.remove('scrolled-navbar')
        }
    }

    window.addEventListener('scroll', toggleNavbarClass);
    toggleNavbarClass();

    // =========================================================
    // 2. SWIPER SLIDER DA HOME
    // =========================================================
    const homeSwiper = new Swiper('.home-slider', {
        loop: true, // Carrossel infinito
        effect: 'fade', // Efeito de transição: 'fade'
        speed: 1000, // Tempo de transição (1 segundo)

        // Paginação (Bolinhas)
        pagination: {
            el: '.home-pagination',
            clickable: true,
        },

        // Autoplay
        autoplay: {
            delay: 5000, // 5 segundos por slide
            disableOnInteraction: false, // Continua o autoplay
        },
    });

    // =========================================================
    // 3. ANIMAÇÃO DE REVELAÇÃO (MÁSCARA/RISCO - MÚLTIPLOS SLIDES)
    // =========================================================
    const textContainer = document.querySelector('.text-reveal-container');
    const typingElement = document.querySelector('.animated-text');

    // Array de textos a serem animados (Índice 0 = Slide 1, Índice 1 = Slide 2, etc.)
    const animatedTexts = [
        "NASCIDOS PARA CORRER", // Texto para o Slide 1 (realIndex 0)
        "SUPERE SEUS LIMITES",   // Texto para o Slide 2 (realIndex 1)
        "COMECE HOJE MESMO"      // Texto para o Slide 3 (realIndex 2)
    ];


    function handleSlideChange() {
        // 1. Remove a classe de animação e limpa o texto
        textContainer.classList.remove('slide-active-animation');
        typingElement.textContent = ''; 

        // Obtém o índice real do slide ativo
        const activeIndex = homeSwiper.realIndex;

        // Timeout para garantir que o CSS volte ao estado inicial antes de animar novamente
       setTimeout(() => {
        // 2. Verifica se existe um texto definido para este índice
        if (animatedTexts[activeIndex]) {
            // A) Define o texto
            typingElement.textContent = animatedTexts[activeIndex];
            
            // B) Dispara a animação CSS (inicia o slide do texto e do risco)
            textContainer.classList.add('slide-active-animation');
        } 
        // 3. SE NÃO HOUVER TEXTO DEFINIDO (else), O CAMPO FICARÁ VAZIO, como desejado.
    }, 50); // Pequeno atraso para garantir a redefinição da animação CSS
}

    // Adiciona o evento para quando a transição do slide terminar
    homeSwiper.on('slideChangeTransitionEnd', handleSlideChange);

    // Inicia o processo no carregamento da página (para animar o slide inicial)
    handleSlideChange(); 

    // =========================================================
    // 4. SWIPER FEEDBACKS (MANTIDO)
    // =========================================================
    const swiper = new Swiper('.js-testimonials-slider', {
        grabCursor: true,
        spaceBetween: 30,

        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },

        pagination: {
            el: '.js-testimonials-pagination',
            clickable: true
        },
        breakpoints: {
            767: {
                slidesPerView: 2
            }
        }
    });

    // =========================================================
    // 5. TABELA DE PREÇOS (MANTIDO)
    // =========================================================
    const priceData = {
        corrida: {
            mensal: { price: "80", period: "/mês", currency: "R$" },
            semestral: { price: "430", period: "/6 meses", currency: "R$" },
            anual: { price: "840", period: "/ano", currency: "R$" }
        },
        musculacao: {
            mensal: { price: "120", period: "/mês", currency: "R$" },
            semestral: { price: "650", period: "/6 meses", currency: "R$" },
            anual: { price: "840", period: "/ano", currency: "R$" }
        },
        combo: {
            mensal: { price: "180", period: "/mês", currency: "R$" },
            semestral: { price: "650", period: "/6 meses", currency: "R$" },
            anual: { price: "1200", period: "/ano", currency: "R$" }
        }
    };

    const tabButtons = document.querySelectorAll('.tabs-navigation .tab-button');
    const priceSpans = document.querySelectorAll('.pricing-card .price');

    function updatePrices(duration) {
        priceSpans.forEach(span => {
            const id = span.id;
            const planName = id.split('-')[1];

            if (priceData[planName] && priceData[planName][duration]) {
                const data = priceData[planName][duration];
                const [value] = data.price.split('.');

                span.innerHTML = `${data.currency} ${value}`;
                document.getElementById(`period-${planName}`).textContent = data.period;
            }
        });
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const newDuration = button.getAttribute('data-duration');
            updatePrices(newDuration);
        });
    });

    updatePrices('mensal');
});