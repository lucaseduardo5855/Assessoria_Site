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
    // 2. NOVO: SWIPER SLIDER DA HOME
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
    // 3. SWIPER FEEDBACKS
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
    // 4. TABELA DE PREÇOS (EXISTENTE)
    // =========================================================
    // Tabela de Preços: Estrutura a ser consultada.
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

    // Função que atualiza os preços na tela
    function updatePrices(duration) {
        priceSpans.forEach(span => {
            // Pega o ID do span (ex: price-corrida)
            const id = span.id;
            // Extrai o nome do plano (ex: 'corrida')
            const planName = id.split('-')[1];

            // Busca os dados na nossa tabela
            if (priceData[planName] && priceData[planName][duration]) {
                const data = priceData[planName][duration];

                const [value, cents] = data.price.split('.');

                span.innerHTML = `${data.currency} ${value}`;

                // Atualiza a pequena tag de duração (/mês, /ano, etc.)
                document.getElementById(`period-${planName}`).textContent = data.period;
            }
        });
    }

    // Adiciona o evento de clique aos botões de duração
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Limpeza e Ativação do Botão
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 2. Pega a duração (mensal, semestral ou anual)
            const newDuration = button.getAttribute('data-duration');

            // 3. ATUALIZA OS PREÇOS DOS CARDS
            updatePrices(newDuration);
        });
    });

    // Garante que os preços "Mensais" estejam carregados por padrão
    updatePrices('mensal');
});