document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const timeSlots = document.getElementById("timeSlots");
    const selectedDate = document.getElementById("selectedDate");
    const notes = document.getElementById("notes");

    // Horários disponíveis (exemplo)
    const availableSlots = [
        "08:00", "09:00", "10:00", "11:00",
        "13:00", "14:00", "15:00", "16:00"
    ];

    // Função para mostrar o calendário
    window.showCalendar = () => {
        calendar.style.display = "block";
        populateTimeSlots(availableSlots);
    };

    // Função para preencher os horários disponíveis
    const populateTimeSlots = (slots) => {
        timeSlots.innerHTML = ""; // Limpa os horários
        slots.forEach(slot => {
            const li = document.createElement("li");
            li.textContent = slot;
            li.onclick = () => selectTimeSlot(li);
            timeSlots.appendChild(li);
        });
    };

    // Função para selecionar um horário
    const selectTimeSlot = (element) => {
        const previouslySelected = document.querySelector("#timeSlots .selected");
        if (previouslySelected) {
            previouslySelected.classList.remove("selected");
        }
        element.classList.add("selected");
    };

    // Função para agendar
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

        const confirmationMessage = `
            Agendamento realizado com sucesso!
            Data: ${date}
            Horário: ${selectedSlot.textContent}
            Observações: ${userNotes || "Nenhuma"}
        `;
        alert(confirmationMessage);

        // Opcional: Limpar campos após o agendamento
        calendar.style.display = "none";
        selectedDate.value = "";
        notes.value = "";
        timeSlots.innerHTML = "";
    };
});
