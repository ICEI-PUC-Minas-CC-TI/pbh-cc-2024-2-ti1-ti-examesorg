const calendar = document.getElementById('calendar');
const timeslots = document.getElementById('timeslots');

// Dados de exemplo para horários disponíveis
const availableTimes = [
    "08:00 - 08:30",
    "08:30 - 09:00",
    "09:00 - 09:30",
    "09:30 - 10:00",
];

// Função para criar o calendário
function createCalendar() {
    const daysInMonth = 30; // Exemplo: 30 dias no mês
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;
        dayElement.addEventListener('click', () => {
            document.querySelectorAll('.day').forEach(el => el.classList.remove('selected'));
            dayElement.classList.add('selected');
            displayTimeslots();
        });
        calendar.appendChild(dayElement);
    }
}

// Função para exibir os horários disponíveis
function displayTimeslots() {
    timeslots.innerHTML = ''; // Limpa os horários anteriores
    availableTimes.forEach(time => {
        const timeElement = document.createElement('li');
        timeElement.textContent = time;
        timeElement.addEventListener('click', () => {
            document.querySelectorAll('#timeslots li').forEach(el => el.classList.remove('selected'));
            timeElement.classList.add('selected');
            alert(`Agendamento confirmado para ${time}`);
        });
        timeslots.appendChild(timeElement);
    });
}

// Inicializa o calendário
createCalendar();
