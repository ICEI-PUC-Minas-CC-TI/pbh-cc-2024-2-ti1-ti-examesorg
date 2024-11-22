document.addEventListener("DOMContentLoaded", () => {
    const userTable = document.getElementById("user-table");
    const fileInput = document.getElementById("file-input");
    const importBtn = document.getElementById("import-btn");
    const exportBtn = document.getElementById("export-btn");

    // Dados dos usuários (poderia ser carregado de um backend)
    let usuarios = [
        { nome: "João Silva", idade: 30, cpf: "123.456.789-00", endereco: "Rua A, 123" },
        { nome: "Maria Oliveira", idade: 25, cpf: "987.654.321-00", endereco: "Av. B, 456" }
    ];

    // Renderizar tabela de usuários
    const renderTable = () => {
        userTable.innerHTML = "";
        usuarios.forEach((usuario, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${usuario.nome}</td>
                <td>${usuario.idade}</td>
                <td>${usuario.cpf}</td>
                <td>${usuario.endereco}</td>
                <td class="actions">
                    <button onclick="editarUsuario(${index})">Editar</button>
                    <button onclick="removerUsuario(${index})">Remover</button>
                </td>
            `;
            userTable.appendChild(row);
        });
    };

    // Função para remover usuário
    window.removerUsuario = (index) => {
        usuarios.splice(index, 1);
        renderTable();
    };

    // Função para editar usuário
    window.editarUsuario = (index) => {
        const nome = prompt("Nome:", usuarios[index].nome);
        const idade = prompt("Idade:", usuarios[index].idade);
        const cpf = prompt("CPF:", usuarios[index].cpf);
        const endereco = prompt("Endereço:", usuarios[index].endereco);
        if (nome && idade && cpf && endereco) {
            usuarios[index] = { nome, idade, cpf, endereco };
            renderTable();
        }
    };

    // Exportar JSON
    exportBtn.addEventListener("click", () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(usuarios));
        const downloadAnchor = document.createElement("a");
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "usuarios.json");
        downloadAnchor.click();
    });

    // Importar JSON
    importBtn.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                usuarios = JSON.parse(e.target.result);
                renderTable();
            };
            reader.readAsText(file);
        }
    });

    // Inicializar tabela
    renderTable();
});
