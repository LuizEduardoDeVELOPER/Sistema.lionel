/**
 * LEONEL TATTOO STUDIO - Core Coreography & Interactive Engine
 * Architecture: Vanilla Enterprise JS
 */

document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================
    // 1. MOTOR DO CANVAS: LOUSA GEOMÉTRICA INTERATIVA
    // ==========================================
    const canvas = document.getElementById('lousaGeometrica');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const maxParticles = 80;
        const connectionRadius = 140;
        const mouse = { x: null, y: null, radius: 180 };

        function initCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', initCanvas);
        initCanvas();

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.6;
                this.vy = (Math.random() - 0.5) * 0.6;
                this.baseRadius = 2.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce boundaries
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Mouse interaction physics
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        let force = (mouse.radius - distance) / mouse.radius;
                        // Sutil força de atração geométrica para o mouse
                        this.x += (dx / distance) * force * 0.8;
                        this.y += (dy / distance) * force * 0.8;
                    }
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.baseRadius, 0, Math.PI * 2);
                ctx.fillStyle = '#e5c475';
                ctx.fill();
            }
        }

        // População inicial
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Conexões de malha matemática (Geometria Sagrada)
                for (let j = i + 1; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionRadius) {
                        let alpha = (1 - (dist / connectionRadius)) * 0.22;
                        ctx.strokeStyle = `rgba(229, 196, 117, ${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateCanvas);
        }
        animateCanvas();
    }

    // ==========================================
    // 2. SISTEMA INTERATIVO DE TABS (SOBRE/PROCESSO)
    // ==========================================
    const tabCards = document.querySelectorAll(".processo-card");
    const tabContents = document.querySelectorAll(".tab-content");

    if (tabCards.length > 0) {
        tabCards.forEach(card => {
            card.addEventListener("click", function () {
                tabCards.forEach(c => c.classList.remove("active"));
                tabContents.forEach(content => content.classList.remove("active"));

                this.classList.add("active");
                const targetTab = this.getAttribute("data-tab");
                const activeContent = document.getElementById(`tab-content-${targetTab}`);
                if (activeContent) {
                    activeContent.classList.add("active");
                }
            });
        });
    }

    // ==========================================
    // 3. ENGENHARIA DO FORMULÁRIO E MODAL DE ORÇAMENTO
    // ==========================================
    const modal = document.getElementById("modalOrcamento");
    const btnFechar = document.getElementById("btnFecharModal");
    const formOrcamento = document.getElementById("formOrcamento");

    // Interceptador global de triggers de orçamento
    document.addEventListener("click", function (e) {
        if (e.target && (e.target.classList.contains("btn-solicitar") || e.target.closest("#btnFlutuanteAgendar") || e.target.classList.contains("btn-agendar-flutuante"))) {
            e.preventDefault();
            if (modal) {
                modal.classList.add("open");
                document.body.style.overflow = "hidden";
            }
        }
    });

    if (btnFechar && modal) {
        btnFechar.addEventListener("click", function () {
            modal.classList.remove("open");
            document.body.style.overflow = "auto";
        });

        window.addEventListener("click", function (e) {
            if (e.target === modal) {
                modal.classList.remove("open");
                document.body.style.overflow = "auto";
            }
        });
    }

    if (formOrcamento) {
        formOrcamento.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const nome = document.getElementById("nome").value;
            const estilo = document.getElementById("estilo").value;
            const local = document.getElementById("local").value;
            const tamanho = document.getElementById("tamanho").value;
            const ideia = document.getElementById("ideia").value;

            // Configuração do Telefone Comercial do Cliente (Formato Internacional)
            const numeroComercial = "5511999999999"; 

            // Payload de Vendas formatada para conversão imediata
            const textoMensagem = `*SOLICITAÇÃO DE ORÇAMENTO EXCLUSIVO*\n\n` +
                                 `• *Cliente:* ${nome}\n` +
                                 `• *Estilo:* ${estilo.toUpperCase()}\n` +
                                 `• *Anatomia (Local):* ${local}\n` +
                                 `• *Dimensões Aprox.:* ${tamanho}\n` +
                                 `• *Briefing do Conceito:* _${ideia}_`;

            const urlWhatsApp = `https://wa.me/${numeroComercial}?text=${encodeURIComponent(textoMensagem)}`;
            window.open(urlWhatsApp, "_blank");
            
            modal.classList.remove("open");
            document.body.style.overflow = "auto";
            formOrcamento.reset();
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Inicializa o Efeito Tilt 3D nos Cards
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".js-tilt"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.2
        });
    }

    // 2. Animação de Scroll Reveal (Surgimento das Seções)
    function revealAnimation() {
        const reveals = document.querySelectorAll(".reveal");
        const windowHeight = window.innerHeight;
        
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                element.classList.add("active");
            }
        });
    }
    window.addEventListener("scroll", revealAnimation);
    window.addEventListener("load", revealAnimation);

    // 3. Sistema de Controle de Abas do Processo
    const cards = document.querySelectorAll(".processo-card");
    const contents = document.querySelectorAll(".tab-content");

    cards.forEach(card => {
        card.addEventListener("click", function () {
            cards.forEach(c => c.classList.remove("active"));
            contents.forEach(content => content.classList.remove("active"));

            this.classList.add("active");
            const targetTab = this.getAttribute("data-tab");
            
            const activeContent = document.getElementById(`tab-content-${targetTab}`);
            if (activeContent) {
                activeContent.classList.add("active");
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modalOrcamento");
    const btnFechar = document.getElementById("btnFecharModal");
    const btnFlutuante = document.getElementById("btnFlutuanteAgendar");

    function abrirModal(e) {
        if (e) e.preventDefault();
        if (modal) {
            modal.classList.add("open");
        }
    }

    function fecharModal() {
        if (modal) {
            modal.classList.remove("open");
        }
    }

    if (btnFlutuante) {
        btnFlutuante.addEventListener("click", abrirModal);
    }

    // Escuta cliques em qualquer botão de "Solicitar Orçamento" da página
    document.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("btn-solicitar")) {
            e.preventDefault();
            abrirModal();
        }
    });

    if (btnFechar) btnFechar.addEventListener("click", fecharModal);
    
    window.addEventListener("click", function (e) {
        if (e.target === modal) fecharModal();
    });
});