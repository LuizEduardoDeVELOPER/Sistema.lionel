document.addEventListener('DOMContentLoaded', () => {
    // Efeito sutil de revelação ao rolar a página (Scroll Reveal)
    const elementsToReveal = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = () => {
        elementsToReveal.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            // Se o elemento estiver visível a 85% da tela, adiciona a classe ativa
            if (elementTop < windowHeight * 0.85) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Configuração inicial das seções para a animação funcionar de forma limpa
    elementsToReveal.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    // Ativa o scroll listener
    window.addEventListener('scroll', revealOnScroll);
    // Executa uma vez no início caso o usuário dê refresh no meio da página
    revealOnScroll();
});