// função para adicionar um novo user a lista
function adicionarUsuario() {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const cpf = document.getElementById("cpf").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;

    // Verificar textos nas caixas
    if (!nome || !idade || !cpf || !telefone || !email) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // adicionando um funcionario na tabela
    const tabela = document.getElementById("tabela-usuarios").getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();
    novaLinha.insertCell(0).textContent = nome;
    novaLinha.insertCell(1).textContent = idade;
    novaLinha.insertCell(2).textContent = cpf;
    novaLinha.insertCell(3).textContent = telefone;
    novaLinha.insertCell(4).textContent = email;
     // redirecionar para a próxima página
     window.location.href = 'resumo.html';

    // clear das caixas depois de adicionar usuario
    document.getElementById("cadastro-form").reset();
}
// função para importar um arquivo CSV
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
            if (index === 0) return; // Ignora a primeira linha (cabeçalho) se necessário
            const dados = linha.split(",");
            if (dados.length === 5) {
                adicionarLinhaTabela(dados);
            }
        });
    };
    reader.readAsText(file);
}

// adicionar uma linha à tabela com dados do CSV
function adicionarLinhaTabela(dados) {
    const tabela = document.getElementById("tabela-usuarios").getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();
    novaLinha.insertCell(0).textContent = dados[0];
    novaLinha.insertCell(1).textContent = dados[1];
    novaLinha.insertCell(2).textContent = dados[2];
    novaLinha.insertCell(3).textContent = dados[3];
    novaLinha.insertCell(4).textContent = dados[4];
}

// exportar o arquivo csv 
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
