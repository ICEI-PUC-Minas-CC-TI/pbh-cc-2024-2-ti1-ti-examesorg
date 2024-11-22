document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("file-input");
    const userTable = document.getElementById("user-table");

    fileInput.addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch("/upload", { // URL do backend
                    method: "POST",
                    body: formData,
                });
                const usuarios = await response.json();

                // Renderizar dados na tabela
                userTable.innerHTML = "";
                usuarios.forEach(usuario => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${usuario.nome}</td>
                        <td>${usuario.idade}</td>
                        <td>${usuario.cpf}</td>
                        <td>${usuario.endereco}</td>
                    `;
                    userTable.appendChild(row);
                });
            } catch (error) {
                console.error("Erro ao importar arquivo:", error);
            }
        }
    });
});
