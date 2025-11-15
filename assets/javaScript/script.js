
// =========================================================
// 0. NAVEGAÇÃO MOBILE E HAMBURGUER
// (Mantido fora do DOMContentLoaded, como estava no seu original)
// =========================================================
var hamburguerBtn = document.querySelector('.hamburguer-btn');
var navList = document.querySelector('.nav-list');
var navListItems = document.querySelectorAll('.nav-list li a');
var closeMenuBtn = document.querySelector('.close-menu-btn'); // Verifique se esta classe existe no seu HTML

if (hamburguerBtn) {
    hamburguerBtn.addEventListener('click', activeClass);
}
if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMenu);
}

function activeClass() {
    hamburguerBtn.classList.add('active');
    navList.classList.add('active');
}

function closeMenu() {
    hamburguerBtn.classList.remove('active');
    navList.classList.remove('active');
}

for (var i = 0; i < navListItems.length; i++) {
    navListItems[i].addEventListener('click', listItemClicked);
}

function listItemClicked() {
    hamburguerBtn.classList.remove('active');
    navList.classList.remove('active');
}


// Junta todos os blocos DOMContentLoaded em um único
document.addEventListener('DOMContentLoaded', function () {
    // Permitir que o navegador mantenha a posição de scroll ao usar botão voltar/avançar (desktop e mobile)
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
    }

    // Variável para controlar se é a primeira carga da página
    let isFirstLoad = !sessionStorage.getItem('pageLoaded');
    
    // Só rola para o topo na primeira carga da página (sem hash)
    if (isFirstLoad) {
        window.addEventListener('load', function () {
            if (!window.location.hash) {
                window.scrollTo(0, 0);
            }
            sessionStorage.setItem('pageLoaded', 'true');
        });
    }
    
    // Garantir que o botão voltar no mobile mantenha a posição
    window.addEventListener('pageshow', function(event) {
        // Se for uma navegação usando cache (botão voltar), não faz nada
        // O navegador já mantém a posição de scroll automaticamente
        if (event.persisted) {
            // Página foi carregada do cache (botão voltar)
            // Não interfere com a posição de scroll
            return;
        }
    });
    
    // Scroll suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#inicio') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else {
                // Para #inicio ou #, ir direto ao topo
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

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
        loop: true,
        effect: 'fade',
        speed: 500, // Transição da foto (rápida)
        allowTouchMove: true, // Permite movimento com toque
        touchRatio: 1, // Sensibilidade do toque
        touchAngle: 45, // Ângulo permitido para swipe
        grabCursor: true, // Mostra cursor de "mão" no desktop

        pagination: {
            el: '.home-pagination',
            clickable: true,
        },

        autoplay: {
            delay: 6000, // Tempo que cada frase fica na tela
            disableOnInteraction: false,
        },
    });

    // =========================================================
    // 3. ANIMAÇÃO DE REVELAÇÃO (TODAS AS FRASES COM A MESMA VELOCIDADE)
    // =========================================================
    const textContainer = document.querySelector('.text-reveal-container');
    const typingElement = document.querySelector('.animated-text');

    const animatedTexts = [
        "NASCIDOS PARA CORRER", // Texto para o Slide 1 (realIndex 0)
        "SUPERE SEUS LIMITES",   // Texto para o Slide 2 (realIndex 1)
        "COMECE HOJE MESMO"      // Texto para o Slide 3 (realIndex 2)
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

                // B) Dispara a animação CSS (TODAS USAM A MESMA VELOCIDADE DO CSS)
                textContainer.classList.add('slide-active-animation');
            }
        }, 50);
    }

    homeSwiper.on('slideChangeTransitionEnd', handleSlideChange);
    handleSlideChange(); // Inicia o processo no carregamento

    // =========================================================
    // 4. SWIPER FEEDBACKS
    // =========================================================
    const swiper = new Swiper('.js-testimonials-slider', {
        grabCursor: true,
        spaceBetween: 30,

        autoplay: {
            delay: 6000,
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
    // 5. TABELA DE PREÇOS E ATUALIZAÇÃO DE ABAS
    // =========================================================
    const priceData = {
        corrida: {
            mensal: { price: "80,00", period: "/mês", currency: "R$" },
            semestral: { price: "349,90", period: "/6 meses", currency: "R$" },
            anual: { price: "719,90", period: "/ano", currency: "R$" }
        },
        musculacao: {
            mensal: { price: "80,00", period: "/mês", currency: "R$" },
            semestral: { price: "349,00", period: "/6 meses", currency: "R$" },
            anual: { price: "719,00", period: "/ano", currency: "R$" }
        },
        combo: {
            mensal: { price: "119,90", period: "/mês", currency: "R$" },
            semestral: { price: "614,90", period: "/6 meses", currency: "R$" },
            anual: { price: "899,90", period: "/ano", currency: "R$" }
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
                const [reais, centavos] = data.price.split(',');

                span.innerHTML =
                    `<small class="currency-unit">${data.currency}</small>` +
                    ` ${reais}` +
                    `<small class="currency-unit">,${centavos}</small>`;

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

    // =========================================================
    // 6. BOTÃO "QUERO TREINAR COM VOCÊS"
    // =========================================================
    const btnSobre = document.querySelector('.btn-sobre[data-whatsapp]');
    if (btnSobre) {
        btnSobre.addEventListener('click', () => {
            const waUrl = btnSobre.getAttribute('data-whatsapp');
            if (waUrl) {
                window.open(waUrl, '_blank', 'noopener');
            }
        });
    }

    // =========================================================
    // 8. WHATSAPP DINÂMICO
    // =========================================================

    const whatsappBaseUrl = "https://wa.me/5543996905705?text=";
    const whatsappButtons = document.querySelectorAll('.btn-choose-link');

    whatsappButtons.forEach(link => {
        link.addEventListener('click', (event) => {

            event.preventDefault();

            // Salvar a posição atual do scroll antes de abrir o WhatsApp
            const pricingSection = document.getElementById('pricing-z4-perfomance');
            if (pricingSection) {
                const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                sessionStorage.setItem('pricingScrollPosition', scrollPosition);
            }

            // Coleta de Dados
            const planName = link.getAttribute('data-plan-name');
            const activeDuration = document.querySelector('.tab-button.active').getAttribute('data-duration');

            // Determinar o seletor do ID do plano (combo, corrida, musculacao)
            let planSelector;
            if (planName === "Corrida + Musculação") {
                planSelector = 'combo';
            } else if (planName === "Corrida") {
                planSelector = 'corrida';
            } else {
                planSelector = 'musculacao';
            }

            // Monta o seletor para pegar o preço dinâmico no DOM (usando ID)
            const priceElement = document.getElementById(`price-${planSelector}`);
            const periodElement = document.getElementById(`period-${planSelector}`);

            // Extrai e formata o preço
            let currentPriceValue = 'preço não encontrado';
            if (priceElement && periodElement) {
                const priceText = priceElement.textContent.replace('R$', '').trim();
                const periodText = periodElement.textContent.trim();
                currentPriceValue = `R$ ${priceText} ${periodText}`;
            }

            // Lógica para montar a mensagem
            let message = '';
            if (planName === "Corrida" || planName === "Musculação") {
                message = `Olá! Gostaria de saber mais sobre o plano ${planName} (${activeDuration}). No valor de ${currentPriceValue}.`;
            } else {
                message = `Olá! Gostaria de escolher o plano ${planName} (${activeDuration}). O preço é ${currentPriceValue}.`;
            }

            // Codifica a mensagem e abre o WhatsApp
            const encodedMessage = encodeURIComponent(message);
            window.open(whatsappBaseUrl + encodedMessage, '_blank');

            // Restaurar posição quando a página receber foco novamente
            window.addEventListener('focus', function restoreScrollPosition() {
                const savedPosition = sessionStorage.getItem('pricingScrollPosition');
                if (savedPosition) {
                    const pricingSectionEl = document.getElementById('pricing-z4-perfomance');
                    if (pricingSectionEl) {
                        setTimeout(() => {
                            window.scrollTo({
                                top: parseInt(savedPosition),
                                behavior: 'smooth'
                            });
                            sessionStorage.removeItem('pricingScrollPosition');
                        }, 100);
                    }
                }
                window.removeEventListener('focus', restoreScrollPosition);
            }, { once: true });
        });
    });

    // =========================================================
    // 10. SCROLL REVEAL - Animações de revelação ao rolar
    // =========================================================
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            distance: '50px',
            duration: 800,
            easing: 'ease-out',
            reset: false,
            mobile: true,
            viewFactor: 0.2
        });

        // Seção Sobre
        sr.reveal('.sobre-coluna-esquerda', { origin: 'left', delay: 0 });
        sr.reveal('.sobre-coluna-direita', { origin: 'right', delay: 200 });

        // Seção Modalidades
        sr.reveal('.section-header', { origin: 'bottom', delay: 0 });
        sr.reveal('.servico-link:nth-child(1)', { origin: 'bottom', delay: 100 });
        sr.reveal('.servico-link:nth-child(2)', { origin: 'bottom', delay: 200 });
        sr.reveal('.servico-link:nth-child(3)', { origin: 'bottom', delay: 300 });
        sr.reveal('.servico-link:nth-child(4)', { origin: 'bottom', delay: 400 });

        // Seção Treinadora
        sr.reveal('.section-header-treinadora', { origin: 'bottom', delay: 0 });
        sr.reveal('.bio-coluna-texto', { origin: 'left', delay: 200 });
        sr.reveal('.bio-coluna-foto', { origin: 'right', delay: 400 });

        // Seção Planos
        sr.reveal('.section-title', { origin: 'bottom', delay: 0 });
        sr.reveal('.tabs-navigation', { origin: 'bottom', delay: 100 });
        sr.reveal('.pricing-card:nth-child(1)', { origin: 'bottom', delay: 200 });
        sr.reveal('.pricing-card:nth-child(2)', { origin: 'bottom', delay: 300 });
        sr.reveal('.pricing-card:nth-child(3)', { origin: 'bottom', delay: 400 });

        // Seção Consultoria
        sr.reveal('.consultoria-coluna-esquerda', { origin: 'left', delay: 0 });
        sr.reveal('.consultoria-coluna-direita', { origin: 'right', delay: 200 });

        // Seção Feedbacks
        sr.reveal('.feedbacks .section-header', { origin: 'bottom', delay: 0 });
    }
});