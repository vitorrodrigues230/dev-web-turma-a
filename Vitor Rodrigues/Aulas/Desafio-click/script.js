// Seleciona o botão pelo ID
const botao = document.getElementById('meuBotao');
const imagem = document.getElementById('imagem');

// Adiciona um evento de clique ao botão
botao.addEventListener('click', function() {
    if (imagem.style.display === 'none') {
        imagem.style.display = 'block';
        botao.textContent = 'Esconder Imagem';
    } else {
        imagem.style.display = 'none';
        botao.textContent = 'Mostrar Imagem';
    }
});

// feito pelo professor

function toggleImage() {
    let img = document.getElementById("imagem")
    img.style.display = img.style.display === "none" ? "block" : "none";
}