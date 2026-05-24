const modal = document.getElementById('modalImagem')
const btnAbrir = document.getElementById('btnAbrirModal')
const btnFechar = document.getElementById('btnFecharModal')
const form = document.getElementById('formImagem')
const tabela = document.getElementById('tabelaImagens')

const tituloInput = document.getElementById('tituloImagem')
const categoriaInput = document.getElementById('categoriaImagem')
const descricaoInput = document.getElementById('descricaoImagem')
const arquivoInput = document.getElementById('arquivoImagem')
const preview = document.getElementById('previewImagem')
const linhaEditando = document.getElementById('linhaEditando')
const modalTitulo = document.getElementById('modalTitulo')

let imagemAtual = ''

btnAbrir.addEventListener('click', () => {
    abrirModalNovo()
})

btnFechar.addEventListener('click', () => {
    fecharModal()
})

function abrirModalNovo(){
    modalTitulo.textContent = 'Nova Imagem'
    form.reset()
    linhaEditando.value = ''
    imagemAtual = ''
    preview.style.display = 'none'
    modal.classList.add('open')
}

function fecharModal(){
    modal.classList.remove('open')
}

arquivoInput.addEventListener('change', () => {
    const file = arquivoInput.files[0]

    if(file){
        imagemAtual = URL.createObjectURL(file)
        preview.src = imagemAtual
        preview.style.display = 'block'
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const titulo = tituloInput.value
    const categoria = categoriaInput.value
    const descricao = descricaoInput.value
    const imagem = imagemAtual || '/images/braco-geometria.jpeg'

    if(linhaEditando.value){
        const linha = document.querySelector(`[data-id="${linhaEditando.value}"]`)

        linha.children[0].querySelector('img').src = imagem
        linha.children[1].textContent = titulo
        linha.children[2].innerHTML = `<span class="tag">${categoria}</span>`
        linha.children[3].textContent = descricao
    } else {
        const id = Date.now()

        const novaLinha = document.createElement('tr')
        novaLinha.setAttribute('data-id', id)

        novaLinha.innerHTML = `
            <td><img src="${imagem}" class="table-img"></td>
            <td>${titulo}</td>
            <td><span class="tag">${categoria}</span></td>
            <td>${descricao}</td>
            <td><span class="status on">Publicado</span></td>
            <td>
                <button class="icon-btn editar">✎</button>
                <button class="icon-btn deletar">🗑</button>
            </td>
        `

        tabela.appendChild(novaLinha)
    }

    fecharModal()
})

tabela.addEventListener('click', (e) => {
    const btn = e.target
    const linha = btn.closest('tr')

    if(btn.classList.contains('deletar')){
        if(confirm('Deseja excluir esta imagem?')){
            linha.remove()
        }
    }

    if(btn.classList.contains('editar')){
        const id = linha.getAttribute('data-id') || Date.now()
        linha.setAttribute('data-id', id)

        modalTitulo.textContent = 'Editar Imagem'
        linhaEditando.value = id

        tituloInput.value = linha.children[1].textContent
        categoriaInput.value = linha.children[2].innerText
        descricaoInput.value = linha.children[3].textContent

        imagemAtual = linha.children[0].querySelector('img').src
        preview.src = imagemAtual
        preview.style.display = 'block'

        modal.classList.add('open')
    }
})