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

document.addEventListener('DOMContentLoaded', () => {
    const valorPlano = localStorage.getItem('selectedPlanValue'); 

    if (valorPlano && !isNaN(valorPlano)) {
        document.getElementById('valor-plano').innerText = `R$ ${parseFloat(valorPlano).toFixed(2)}`; 

        const parcelasSelect = document.getElementById('installments'); 
        parcelasSelect.addEventListener('change', () => {
            const numeroParcelas = parseInt(parcelasSelect.value, 10);
            const valorParcela = (parseFloat(valorPlano) / numeroParcelas).toFixed(2);
            document.getElementById('valor-parcela').innerText = `R$ ${valorParcela}`;

            // Atualizar todos os valores das parcelas na tabela
            const parcelasTable = document.querySelector('.parcelas-tabela');
            parcelasTable.innerHTML = ''; // Limpa a tabela

            for (let i = 1; i <= numeroParcelas; i++) {
                const valor = (parseFloat(valorPlano) / numeroParcelas).toFixed(2);
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${i}x de R$ ${valor} sem juros</td>
                `;
                parcelasTable.appendChild(row);
            }
        });

        // Trigger cálculo inicial
        parcelasSelect.dispatchEvent(new Event('change'));
    } else {
        alert('Nenhum plano selecionado. Retorne à página anterior para escolher um plano.');
        window.location.href = 'planos.html';
    }
});

document.querySelector('.Botao').addEventListener('click', (event) => {
    event.preventDefault();
    if (validateForm()) {
        saveToLocalStorage();
        showPaymentSuccess();
    }
});

