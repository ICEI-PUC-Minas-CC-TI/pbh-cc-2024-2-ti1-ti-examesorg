document.addEventListener("DOMContentLoaded", () => {
    const tabela = document.getElementById("tabela-usuarios").getElementsByTagName('tbody')[0];

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

        document.getElementById("cadastro-form").reset();
        alert("Funcionário cadastrado com sucesso!");
    }

    function adicionarLinhaTabela(funcionario) {
        const novaLinha = tabela.insertRow();
        novaLinha.insertCell(0).textContent = funcionario.nome;
        novaLinha.insertCell(1).textContent = funcionario.idade;
        novaLinha.insertCell(2).textContent = funcionario.cpf;
        novaLinha.insertCell(3).textContent = funcionario.telefone;
        novaLinha.insertCell(4).textContent = funcionario.email;
        novaLinha.insertCell(5).textContent = funcionario.data;
    }

    function salvarNoLocalStorage(funcionario) {
        let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
        funcionarios.push(funcionario);
        localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
    }

    function carregarDoLocalStorage() {
        const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
        funcionarios.forEach(adicionarLinhaTabela);
    }

    function importarCSV() {
        const input = document.getElementById("importar-csv");
        const file = input.files[0];
        if (!file) {
            alert("Por favor, selecione um arquivo CSV!");
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
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

    document.getElementById("cadastro-form").addEventListener("submit", (event) => {
        event.preventDefault();
        adicionarUsuario();
    });

    document.getElementById("importar-csv").addEventListener("change", importarCSV);

    carregarDoLocalStorage(); 

    document.getElementById("botao-exportar").addEventListener("click", exportarParaCSV);
});
