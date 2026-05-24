document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('lousaCanvas')
    const btnLimpar = document.getElementById('btnLimparLousa')

    if (!canvas) {
        console.error('Canvas lousaCanvas não encontrado')
        return
    }

    const ctx = canvas.getContext('2d')
    let pontos = []
    let desenhando = false

    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
        redesenhar()
    }

    function getPos(e) {
        const rect = canvas.getBoundingClientRect()
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    }

    function adicionarPonto(e) {
        const pos = getPos(e)
        const hue = Math.floor((pos.x / canvas.width) * 360)

        pontos.push({
            x: pos.x,
            y: pos.y,
            hue
        })

        if (pontos.length > 220) {
            pontos.shift()
        }

        canvas.style.boxShadow = `
            0 0 45px hsla(${hue}, 95%, 60%, .35),
            inset 0 0 60px hsla(${hue}, 95%, 60%, .16)
        `

        redesenhar()
    }

    function redesenhar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (let i = 0; i < pontos.length; i++) {
            const p1 = pontos[i]

            for (let j = i + 1; j < pontos.length; j++) {
                const p2 = pontos[j]
                const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y)

                if (dist < 165) {
                    ctx.beginPath()
                    ctx.moveTo(p1.x, p1.y)
                    ctx.lineTo(p2.x, p2.y)

                    ctx.shadowBlur = 14
                    ctx.shadowColor = `hsl(${p1.hue}, 100%, 65%)`
                    ctx.strokeStyle = `hsla(${p1.hue}, 100%, 65%, ${1 - dist / 165})`
                    ctx.lineWidth = 1.6

                    ctx.stroke()
                }
            }

            ctx.beginPath()
            ctx.arc(p1.x, p1.y, 4.5, 0, Math.PI * 2)

            ctx.shadowBlur = 18
            ctx.shadowColor = `hsl(${p1.hue}, 100%, 65%)`
            ctx.fillStyle = `hsl(${p1.hue}, 100%, 65%)`

            ctx.fill()
        }

        ctx.shadowBlur = 0
    }

    canvas.addEventListener('mousedown', (e) => {
        desenhando = true
        adicionarPonto(e)
    })

    canvas.addEventListener('mousemove', (e) => {
        if (!desenhando) return
        adicionarPonto(e)
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
            canvas.style.boxShadow = ''
            redesenhar()
        })
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
})