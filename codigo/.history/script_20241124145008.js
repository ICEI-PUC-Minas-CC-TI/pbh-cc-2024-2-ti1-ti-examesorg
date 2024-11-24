document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const timeSlots = document.getElementById("timeSlots");
    const selectedDate = document.getElementById("selectedDate");
    const notes = document.getElementById("notes");

    const availableSlots = [
        "08:00", "09:00", "10:00", "11:00",
        "13:00", "14:00", "15:00", "16:00"
    ];

    // Exibir calendário e preencher horários disponíveis
    window.showCalendar = () => {
        calendar.style.display = "block";
        populateTimeSlots(availableSlots);
    };

    const populateTimeSlots = (slots) => {
        timeSlots.innerHTML = "";
        slots.forEach(slot => {
            const li = document.createElement("li");
            li.textContent = slot;
            li.onclick = () => selectTimeSlot(li);
            timeSlots.appendChild(li);
        });
    };

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

        // Captura os dados do formulário principal
        const nome = document.getElementById("nome").value;
        const idade = document.getElementById("idade").value;
        const cpf = document.getElementById("cpf").value;
        const telefone = document.getElementById("telefone").value;
        const email = document.getElementById("email").value;

        // Adicionar à tabela
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

        // Limpar campos e esconder calendário
        calendar.style.display = "none";
        selectedDate.value = "";
        notes.value = "";
        timeSlots.innerHTML = "";

        // Opcional: Resetar formulário
        document.getElementById("cadastro-form").reset();
    };
});