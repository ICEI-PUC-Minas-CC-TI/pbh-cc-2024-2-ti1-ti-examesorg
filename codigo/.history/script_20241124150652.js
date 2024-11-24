document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const timeSlots = document.getElementById("timeSlots");
    const selectedDate = document.getElementById("selectedDate");
    const notes = document.getElementById("notes");

    // Horários disponíveis
    const availableSlots = [
        "08:00", "09:00", "10:00", "11:00",
        "13:00", "14:00", "15:00", "16:00"
    ];

    // Exibir os horários disponíveis
    window.showCalendar = () => {
        calendar.style.display = "block";
        populateTimeSlots(availableSlots);
    };

   // Preencher os horários disponíveis
const populateTimeSlots = (slots) => {
    timeSlots.innerHTML = ""; // Limpa os horários
    slots.forEach(slot => {
        const li = document.createElement("li");
        li.textContent = slot;
        li.onclick = () => selectTimeSlot(li);
        timeSlots.appendChild(li);
    });
};

// Selecionar um horário
const selectTimeSlot = (element) => {
    const previouslySelected = document.querySelector("#timeSlots .selected");
    if (previouslySelected) {
        previouslySelected.classList.remove("selected");
    }
    element.classList.add("selected");
};
            

    // Agendar e adicionar à tabela
    window.scheduleAppointment = () => {
        const date = selectedDate.value;
        const selectedSlot = document.querySelector("#timeSlots .selected");
        const userNotes = notes.value;

        if (!date) {
            alert("Por favor, selecione uma data.");
            return;
        }

        if (!selectedSlot) {
            alert("Por favor, selecione um horário.");
            return;
        }

        // Capturar dados do formulário principal
        const nome = document.getElementById("nome").value;
        const idade = document.getElementById("idade").value;
        const cpf = document.getElementById("cpf").value;
        const telefone = document.getElementById("telefone").value;
        const email = document.getElementById("email").value;

        // Verificar se os campos principais estão preenchidos
        if (!nome || !idade || !cpf || !telefone || !email) {
            alert("Por favor, preencha todos os campos do formulário.");
            return;
        }

        // Adicionar dados à tabela
        const tabela = document.getElementById("tabela-usuarios").getElementsByTagName("tbody")[0];
        const novaLinha = tabela.insertRow();
        novaLinha.innerHTML = `
            <td>${nome}</td>
            <td>${idade}</td>
            <td>${cpf}</td>
            <td>${telefone}</td>
            <td>${email}</td>
            <td>${date}</td>
            <td>${selectedSlot.textContent}</td>
            <td>${userNotes || "Nenhuma"}</td>
        `;

        alert("Funcionário e agendamento cadastrados com sucesso!");

        // Limpar campos após cadastro
        calendar.style.display = "none";
        selectedDate.value = "";
        notes.value = "";
        timeSlots.innerHTML = "";

        // Resetar o formulário principal
        document.getElementById("cadastro-form").reset();
    };
});
