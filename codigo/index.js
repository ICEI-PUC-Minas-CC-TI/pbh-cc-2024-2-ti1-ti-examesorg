function validateForm() {
    const inputs = document.querySelectorAll('input[required]');
    for (let input of inputs) {
        if (input.value.trim() === '') {
            alert('Por favor, preencha todos os campos obrigatórios.');
            input.focus();
            return false;
        }
    }
    return true;
}

function showPaymentSuccess() {
    const paymentMessage = document.getElementById('payment-success');
    paymentMessage.classList.remove('hidden');
    setTimeout(() => {
        paymentMessage.classList.add('show');
    }, 100);

    setTimeout(() => {
        paymentMessage.classList.remove('show');
        setTimeout(() => {
            paymentMessage.classList.add('hidden');
        }, 1000);
    }, 3000);
}

function saveToLocalStorage() {
    const formData = {};
    const inputs = document.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        if (input.name) {
            formData[input.name] = input.value;
        }
    });

    localStorage.setItem('formPaymentData', JSON.stringify(formData));
    console.log('Dados salvos no Local Storage:', formData);
}

document.querySelector('.Botao').addEventListener('click', (event) => {
    event.preventDefault();
    if (validateForm()) {
        saveToLocalStorage();
        showPaymentSuccess();
    }
});

window.addEventListener('load', function () {
    const valorExameSelecionado = localStorage.getItem('valorExameSelecionado');
    const selectParcelas = document.getElementById('installments');

    if (valorExameSelecionado) {
        const valorTotal = parseFloat(valorExameSelecionado);
        let parcelaValue = 0;

        const options = selectParcelas.querySelectorAll('option');
        options.forEach(option => {
            const numParcelas = parseInt(option.value);
            parcelaValue = (valorTotal / numParcelas).toFixed(2); 
            option.textContent = `${numParcelas}x de R$ ${parcelaValue} sem juros`; 
        });
    }
});
