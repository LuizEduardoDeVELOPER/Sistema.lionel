/* ========================================
   LEONEL TATTOO STUDIO
   HOME.JS
======================================== */


/* ========================================
   NAVBAR PREMIUM
======================================== */

const navbar = document.querySelector('.navbar')

if (navbar) {

    window.addEventListener('scroll', () => {

        if (window.scrollY > 50) {

            navbar.classList.add('scrolled')

        } else {

            navbar.classList.remove('scrolled')

        }

    })

}


/* ========================================
   REVEAL ANIMATIONS
======================================== */

const reveals = document.querySelectorAll('.reveal')

function revealElements() {

    reveals.forEach((element) => {

        const windowHeight = window.innerHeight

        const revealTop =
            element.getBoundingClientRect().top

        const revealPoint = 100

        if (revealTop < windowHeight - revealPoint) {

            element.classList.add('active')

        }

    })

}

window.addEventListener('scroll', revealElements)

revealElements()


/* ========================================
   MODAL ORÇAMENTO PREMIUM
======================================== */

const modal =
    document.getElementById('modalOrcamento')

const btnFecharModal =
    document.getElementById('btnFecharModal')

const botoesOrcamento =
    document.querySelectorAll(
        '.btn-solicitar, .btn-agendar-flutuante, .btn-reserva'
    )
if (modal) {

    /* ABRIR MODAL */

    function abrirModal() {

        modal.classList.add('open')

        document.body.style.overflow = 'hidden'

    }

    /* FECHAR MODAL */

    function fecharModal() {

        modal.classList.remove('open')

        document.body.style.overflow = 'auto'

    }

    /* BOTÕES */

    botoesOrcamento.forEach((botao) => {

        botao.addEventListener('click', (e) => {

            e.preventDefault()

            abrirModal()

        })

    })

    /* FECHAR BOTÃO X */

    if (btnFecharModal) {

        btnFecharModal.addEventListener('click', () => {

            fecharModal()

        })

    }

    /* FECHAR CLICANDO FORA */

    window.addEventListener('click', (e) => {

        if (e.target === modal) {

            fecharModal()

        }

    })

    /* FECHAR COM ESC */

    window.addEventListener('keydown', (e) => {

        if (e.key === 'Escape') {

            fecharModal()

        }

    })

}


/* ========================================
   VANILLA TILT
======================================== */

const tiltElements = document.querySelectorAll('.js-tilt')

if (tiltElements.length > 0) {

    VanillaTilt.init(tiltElements, {

        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2

    })

}


/* ========================================
   SOBRE TABS INTERATIVAS
======================================== */

const processoCards =
    document.querySelectorAll('.processo-card')

const tabContents =
    document.querySelectorAll('.tab-content')

processoCards.forEach((card) => {

    card.addEventListener('click', () => {

        const tab = card.dataset.tab

        /* REMOVE ACTIVE */

        processoCards.forEach((item) => {

            item.classList.remove('active')

        })

        tabContents.forEach((content) => {

            content.classList.remove('active')

        })

        /* ADICIONA ACTIVE */

        card.classList.add('active')

        const activeContent =
            document.getElementById(`tab-content-${tab}`)

        if (activeContent) {

            activeContent.classList.add('active')

        }

    })

})

/* ========================================
   LENIS SMOOTH SCROLL
======================================== */

const lenis = new Lenis({

    duration: 1.2,

    smoothWheel: true,

    smoothTouch: false

})

function raf(time){

    lenis.raf(time)

    requestAnimationFrame(raf)

}

requestAnimationFrame(raf)




/* ========================================
   CORES DINÂMICAS
======================================== */

const gradient =
    document.querySelector('.bg-gradient')

const colors = [

    'rgba(201,169,110,.12)',

    'rgba(140,110,255,.10)',

    'rgba(90,180,255,.10)',

    'rgba(255,120,120,.08)'

]

let colorIndex = 0

setInterval(() => {

    if(!gradient) return

    colorIndex++

    if(colorIndex >= colors.length){

        colorIndex = 0

    }

    gradient.style.background = `
        radial-gradient(
            circle,
            ${colors[colorIndex]},
            transparent 70%
        )
    `

}, 4000)

/* ========================================
   LOUSA GEOMÉTRICA INTERATIVA
======================================== */

const canvas = document.getElementById('lousaCanvas')
const btnLimparLousa = document.getElementById('btnLimparLousa')

if (canvas) {
    const ctx = canvas.getContext('2d')
    let pontos = []

    function ajustarCanvas() {
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
        desenhar()
    }

    function desenhar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        pontos.forEach((ponto, index) => {
            for (let i = index + 1; i < pontos.length; i++) {
                const outro = pontos[i]
                const distancia = Math.hypot(ponto.x - outro.x, ponto.y - outro.y)

                if (distancia < 150) {
                    ctx.beginPath()
                    ctx.moveTo(ponto.x, ponto.y)
                    ctx.lineTo(outro.x, outro.y)
                    ctx.strokeStyle = `hsla(${ponto.hue}, 85%, 62%, ${1 - distancia / 150})`
                    ctx.lineWidth = 1.2
                    ctx.stroke()
                }
            }

            ctx.beginPath()
            ctx.arc(ponto.x, ponto.y, 3.5, 0, Math.PI * 2)
            ctx.fillStyle = `hsl(${ponto.hue}, 90%, 65%)`
            ctx.fill()
        })
    }

    function adicionarPonto(e) {
        const rect = canvas.getBoundingClientRect()

        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const hue = Math.floor((x / rect.width) * 360)

        pontos.push({ x, y, hue })

        if (pontos.length > 120) {
            pontos.shift()
        }

        desenhar()
    }

    window.addEventListener('load', ajustarCanvas)
    window.addEventListener('resize', ajustarCanvas)

    canvas.addEventListener('mousemove', adicionarPonto)

    canvas.addEventListener('click', adicionarPonto)

    if (btnLimparLousa) {
        btnLimparLousa.addEventListener('click', () => {
            pontos = []
            desenhar()
        })
    }
}

/* ========================================
   LOUSA GEOMÉTRICA INTERATIVA
======================================== */

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('lousaCanvas')
    const btnLimpar = document.getElementById('btnLimparLousa')

    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let desenhando = false
    let pontos = []

    function ajustarCanvas() {
        const rect = canvas.getBoundingClientRect()

        canvas.width = rect.width
        canvas.height = rect.height
    }

    function pegarPosicao(e) {
        const rect = canvas.getBoundingClientRect()

        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    }

    function desenharPonto(x, y) {
        const hue = Math.floor((x / canvas.width) * 360)

        pontos.push({ x, y, hue })

        if (pontos.length > 150) {
            pontos.shift()
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        pontos.forEach((ponto, index) => {
            ctx.beginPath()
            ctx.arc(ponto.x, ponto.y, 4, 0, Math.PI * 2)
            ctx.fillStyle = `hsl(${ponto.hue}, 90%, 65%)`
            ctx.fill()

            for (let i = index + 1; i < pontos.length; i++) {
                const outro = pontos[i]
                const dist = Math.hypot(ponto.x - outro.x, ponto.y - outro.y)

                if (dist < 140) {
                    ctx.beginPath()
                    ctx.moveTo(ponto.x, ponto.y)
                    ctx.lineTo(outro.x, outro.y)
                    ctx.strokeStyle = `hsla(${ponto.hue}, 90%, 65%, ${1 - dist / 140})`
                    ctx.lineWidth = 1
                    ctx.stroke()
                }
            }
        })
    }

    canvas.addEventListener('mousedown', (e) => {
        desenhando = true
        const pos = pegarPosicao(e)
        desenharPonto(pos.x, pos.y)
    })

    canvas.addEventListener('mousemove', (e) => {
        if (!desenhando) return

        const pos = pegarPosicao(e)
        desenharPonto(pos.x, pos.y)
    })

    canvas.addEventListener('mouseup', () => {
        desenhando = false
    })

    canvas.addEventListener('mouseleave', () => {
        desenhando = false
    })

    if (btnLimpar) {
        btnLimpar.addEventListener('click', () => {
            pontos = []
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        })
    }

    ajustarCanvas()
    window.addEventListener('resize', ajustarCanvas)
})
/* ========================================
   FUNDO GEOMÉTRICO GLOBAL INTERATIVO
======================================== */

const geometricSections = document.querySelectorAll(
    '.portfolio, .sobre, .pinturas, .loja, .lousa-geometrica, .reserva, .saiba-mais, .localizacao'
)

geometricSections.forEach((section) => {

    section.addEventListener('mousemove', (e) => {

        const rect = section.getBoundingClientRect()

        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100

        const hue = Math.floor((x + y) * 3)

        section.style.setProperty('--x', `${x}%`)
        section.style.setProperty('--y', `${y}%`)
        section.style.setProperty('--geo-color', `${hue}deg`)

    })

    section.addEventListener('mouseleave', () => {

        section.style.setProperty('--x', `50%`)
        section.style.setProperty('--y', `50%`)
        section.style.setProperty('--geo-color', `0deg`)

    })

})

/* ========================================
   SAIBA MAIS INTERATIVO
======================================== */

const infoCards = document.querySelectorAll('.info-card')

infoCards.forEach((card) => {

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect()

        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100

        card.style.setProperty('--x', `${x}%`)
        card.style.setProperty('--y', `${y}%`)
    })

    card.addEventListener('click', () => {
        infoCards.forEach((item) => item.classList.remove('active'))
        card.classList.add('active')
    })

})