async function carregarAcessibilidade() {
    const response = await fetch('acessibilidade.json');
    acessibilidadeData = await response.json();
}

function aplicarAcessibilidade() {
    const body = document.body;


    if (acessibilidadeData.contrasteAlto) {
        body.style.backgroundColor = '#000';
        body.style.color = '#000';
    } else {
        body.style.backgroundColor = '';
        body.style.color = '';
    }

    // Alterar tamanho da fonte
    if (acessibilidadeData.aumentoDeFonte) {
        body.style.fontSize = '1.5em';
    } else {
        body.style.fontSize = '';
    }
}

function toggleAccessibility() {
    acessibilidadeData.contrasteAlto = !acessibilidadeData.contrasteAlto;
    acessibilidadeData.aumentoDeFonte = !acessibilidadeData.aumentoDeFonte;
    aplicarAcessibilidade();
}

window.onload = () => {
    carregarAcessibilidade();
};


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.formularioEmpresa');
    
    // Função para aplicar as máscaras de entrada
    function applyMasks() {
        const cnpjInput = document.getElementById('cnpj');
        const celularInput = document.getElementById('celular');
        const inscricaoInput = document.getElementById('inscricao');
        const inicioAtividadeInput = document.getElementById('inicio-atividade');

        cnpjInput.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1/$2')
                .replace(/(\d{4})(\d)/, '$1-$2')
                .substring(0, 18);
        });

        celularInput.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .substring(0, 15);
        });

        inscricaoInput.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, ''); // Apenas números
        });

        inicioAtividadeInput.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '$1/$2')
                .replace(/(\d{2})(\d)/, '$1/$2')
                .substring(0, 5); // DD/MM
        });
    }

    // Função para validar a data
    function isValidDate(dateString) {
        const parts = dateString.split('/');
        if (parts.length !== 2) return false; // Valida o formato DD/MM

        const day = parseInt(parts[0], 10);
        const year = parseInt(parts[1], 10);

        // Para o ano, assumimos que o formato é AA (00-99)
        const fullYear = year < 100 ? 2000 + year : year;

        const date = new Date(fullYear, 0, day); // Janeiro é 0
        return date.getFullYear() === fullYear && date.getDate() === day;
    }

    // Função para salvar os dados no localStorage
    function saveToLocalStorage() {
        const cnpj = document.getElementById('cnpj').value;
        const celular = document.getElementById('celular').value;
        const inscricao = document.getElementById('inscricao').value;
        const inicioAtividade = document.getElementById('inicio-atividade').value;
        const email = document.getElementById('email').value;

        const empresaData = {
            cnpj,
            celular,
            inscricao,
            inicioAtividade,
            email
        };

        // Salva no localStorage
        localStorage.setItem('empresaData', JSON.stringify(empresaData));
    }

    // Função para carregar os dados do localStorage
    function loadFromLocalStorage() {
        const savedData = localStorage.getItem('empresaData');
        if (savedData) {
            const empresaData = JSON.parse(savedData);
            document.getElementById('cnpj').value = empresaData.cnpj;
            document.getElementById('celular').value = empresaData.celular;
            document.getElementById('inscricao').value = empresaData.inscricao;
            document.getElementById('inicio-atividade').value = empresaData.inicioAtividade;
            document.getElementById('email').value = empresaData.email;
        }
    }

    // Validação e envio do formulário
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        let isValid = true;

        // Verifica campos obrigatórios
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('is-invalid'); // Adiciona classe para destacar campos inválidos
            } else {
                field.classList.remove('is-invalid');
            }
        });

        // Validação do e-mail
        const emailInput = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validação de e-mail
        if (!emailPattern.test(emailInput.value.trim())) {
            isValid = false;
            emailInput.classList.add('is-invalid');
            alert("Por favor, insira um e-mail válido.");
        } else {
            emailInput.classList.remove('is-invalid');
        }

        // Validação do celular
        const celularInput = document.getElementById('celular');
        if (celularInput.value.length < 14) { // Verifica se o número está completo
            isValid = false;
            celularInput.classList.add('is-invalid');
            alert("Por favor, insira um número de celular válido.");
        } else {
            celularInput.classList.remove('is-invalid');
        }

        // Validação do CNPJ
        const cnpjInput = document.getElementById('cnpj');
        if (cnpjInput.value.length < 18) { // Verifica se o CNPJ está completo
            isValid = false;
            cnpjInput.classList.add('is-invalid');
            alert("Por favor, insira um CNPJ válido.");
        } else {
            cnpjInput.classList.remove('is-invalid');
        }

        // Validação do número de inscrição
        const inscricaoInput = document.getElementById('inscricao');
        if (!/^\d+$/.test(inscricaoInput.value.trim())) { // Verifica se só contém números
            isValid = false;
            inscricaoInput.classList.add('is-invalid');
            alert("O número de inscrição deve conter apenas números.");
        } else {
            inscricaoInput.classList.remove('is-invalid');
        }

        // Validação da data de início de atividade
        const inicioAtividadeInput = document.getElementById('inicio-atividade');
        if (!isValidDate(inicioAtividadeInput.value.trim())) {
            isValid = false;
            inicioAtividadeInput.classList.add('is-invalid');
            alert("Por favor, insira uma data válida no formato DD/MM/AA.");
        } else {
            inicioAtividadeInput.classList.remove('is-invalid');
        }

        if (isValid) {
            saveToLocalStorage(); // Salva os dados no localStorage
            alert("Formulário enviado com sucesso!");
            window.location.href = 'cdf.html'; // Substitua pela URL da página de destino
        } else {
            alert("Por favor, preencha todos os campos obrigatórios corretamente.");
        }
    });

    applyMasks(); // Aplica as máscaras de entrada
    loadFromLocalStorage(); // Carrega os dados salvos ao carregar a página
});
