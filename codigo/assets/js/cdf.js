document.addEventListener("DOMContentLoaded", () => {
    const tabela = document.getElementById("tabela-usuarios").getElementsByTagName('tbody')[0];

    // Função para adicionar um novo usuário
    function adicionarUsuario() {
        const nome = document.getElementById("nome").value;
        const idade = document.getElementById("idade").value;
        const cpf = document.getElementById("cpf").value;
        const telefone = document.getElementById("telefone").value;
        const email = document.getElementById("email").value;
        const data = document.getElementById("selectedDate").value;

        if (!nome || !idade || !cpf || !telefone || !email || !data) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        const novoFuncionario = { nome, idade, cpf, telefone, email, data };
        adicionarLinhaTabela(novoFuncionario);
        salvarNoLocalStorage(novoFuncionario);

        // Limpa os campos do formulário após adicionar
        document.getElementById("cadastro-form").reset();
        alert("Funcionário cadastrado com sucesso!");
    }

    // Função para adicionar uma nova linha na tabela
    function adicionarLinhaTabela(funcionario) {
        const novaLinha = tabela.insertRow();

        // Adicionar dados do funcionário nas células
        novaLinha.insertCell(0).textContent = funcionario.nome;
        novaLinha.insertCell(1).textContent = funcionario.idade;
        novaLinha.insertCell(2).textContent = funcionario.cpf;
        novaLinha.insertCell(3).textContent = funcionario.telefone;
        novaLinha.insertCell(4).textContent = funcionario.email;
        novaLinha.insertCell(5).textContent = funcionario.data;

        // Criar botão "X" para remover o funcionário
        const acaoCell = novaLinha.insertCell(6);
        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "X";
        botaoRemover.style.backgroundColor = "red";
        botaoRemover.style.color = "white";
        botaoRemover.style.border = "none";
        botaoRemover.style.padding = "5px";
        botaoRemover.style.cursor = "pointer";

        botaoRemover.addEventListener("click", function () {
            removerFuncionario(novaLinha);
        });

        acaoCell.appendChild(botaoRemover);
    }

    // Função para remover funcionário da tabela e do localStorage
    function removerFuncionario(linha) {
        const nome = linha.cells[0].textContent; // Captura o nome do funcionário
        linha.remove(); // Remove a linha da tabela

        // Atualiza o localStorage removendo o funcionário
        let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
        funcionarios = funcionarios.filter(funcionario => funcionario.nome !== nome);
        localStorage.setItem("funcionarios", JSON.stringify(funcionarios));

        alert("Funcionário removido com sucesso!");
    }

    // Função para salvar funcionário no localStorage
    function salvarNoLocalStorage(funcionario) {
        let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
        funcionarios.push(funcionario);
        localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
    }

    // Função para carregar os dados do localStorage
    function carregarDoLocalStorage() {
        const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
        funcionarios.forEach(adicionarLinhaTabela);
    }

    // Função para importar CSV
    function importarCSV() {
        const input = document.getElementById("importar-csv");
        const file = input.files[0];
        if (!file) {
            alert("Por favor, selecione um arquivo CSV!");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            const linhas = event.target.result.split("\n");
            linhas.forEach((linha, index) => {
                if (index === 0) return;
                const dados = linha.split(",");
                if (dados.length === 6) {
                    const funcionario = {
                        nome: dados[0],
                        idade: dados[1],
                        cpf: dados[2],
                        telefone: dados[3],
                        email: dados[4],
                        data: dados[5]
                    };
                    adicionarLinhaTabela(funcionario);
                    salvarNoLocalStorage(funcionario);
                }
            });
        };
        reader.readAsText(file);
    }

    // Função para exportar para CSV
    function exportarParaCSV() {
        const linhas = document.querySelectorAll("table tr");
        let csv = [];

        linhas.forEach((linha) => {
            const colunas = linha.querySelectorAll("td, th");
            const dados = Array.from(colunas).map(coluna => coluna.innerText);
            csv.push(dados.join(","));
        });

        const csvContent = csv.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "funcionarios.csv";
        link.click();
    }

    // Máscara de CPF
    const cpfInput = document.getElementById("cpf");
    cpfInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, '') 
            .replace(/(\d{3})(\d)/, '$1.$2') 
            .replace(/(\d{3})(\d)/, '$1.$2') 
            .replace(/(\d{3})(\d)/, '$1-$2') 
            .substring(0, 14);
    });

    // Máscara de Celular
    const telefoneInput = document.getElementById("telefone");
    telefoneInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, '') 
            .replace(/(\d{2})(\d)/, '($1) $2') 
            .replace(/(\d{5})(\d)/, '$1-$2') 
            .substring(0, 15);
    });

    // Adiciona o evento de submit no formulário
    document.getElementById("cadastro-form").addEventListener("submit", (event) => {
        event.preventDefault();
        adicionarUsuario();
    });

    // Adiciona o evento para importar CSV
    document.getElementById("importar-csv").addEventListener("change", importarCSV);

    // Carrega os dados do localStorage
    carregarDoLocalStorage();

    // Adiciona o evento de exportação
    document.getElementById("botao-exportar").addEventListener("click", exportarParaCSV);
});

function irParaProximaPagina() {
    window.location.href = "captcha.html";
}