// Função para mudar a cor de fundo
function changeBackgroundColor() {
    // Obtém o valor da cor do input
    const colorPicker = document.getElementById('corfavorita');
    const selectedColor = colorPicker.value;

    // Define a cor de fundo da página
    document.body.style.backgroundColor = selectedColor;
}
