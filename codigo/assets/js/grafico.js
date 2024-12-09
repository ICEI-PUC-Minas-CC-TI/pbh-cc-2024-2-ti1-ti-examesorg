document.addEventListener('DOMContentLoaded', function () {
    let accidentChart, monthlyChart;

    function updateChartColors() {
        // Obtenção segura dos elementos
        const adminColorInput = document.getElementById('adminColor');
        const producaoColorInput = document.getElementById('producaoColor');
        const manutencaoColorInput = document.getElementById('manutencaoColor');
        const logisticaColorInput = document.getElementById('logisticaColor');
        const qualidadeColorInput = document.getElementById('qualidadeColor');

        if (adminColorInput && producaoColorInput && manutencaoColorInput && logisticaColorInput && qualidadeColorInput) {
            // Recupera as cores
            const adminColor = adminColorInput.value;
            const producaoColor = producaoColorInput.value;
            const manutencaoColor = manutencaoColorInput.value;
            const logisticaColor = logisticaColorInput.value;
            const qualidadeColor = qualidadeColorInput.value;

            // Atualiza variáveis CSS globais
            document.documentElement.style.setProperty('--setor-admin', adminColor);
            document.documentElement.style.setProperty('--setor-producao', producaoColor);
            document.documentElement.style.setProperty('--setor-manutencao', manutencaoColor);
            document.documentElement.style.setProperty('--setor-logistica', logisticaColor);
            document.documentElement.style.setProperty('--setor-qualidade', qualidadeColor);

            // Atualiza cores do gráfico de linha
            if (accidentChart) {
                const colors = [adminColor, producaoColor, manutencaoColor, logisticaColor, qualidadeColor];
                accidentChart.data.datasets.forEach((dataset, index) => {
                    dataset.borderColor = colors[index];
                });
                accidentChart.update();
            }

            // Atualiza cores do gráfico de barras
            if (monthlyChart) {
                monthlyChart.data.datasets[0].backgroundColor = [
                    adminColor, producaoColor, manutencaoColor, logisticaColor, qualidadeColor,
                ];
                monthlyChart.update();
            }
        }
    }

    // Adiciona event listeners nos pickers
    document.querySelectorAll('.color-picker').forEach(picker => {
        picker.addEventListener('change', updateChartColors);
    });

    // Dados para o gráfico de linha
    const annualData = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
            { label: 'Administrativo', data: [2, 1, 3, 1, 2, 0, 1, 2, 1, 0, 1, 2], borderColor: '#FF6384', tension: 0.4, fill: false },
            { label: 'Produção', data: [5, 4, 6, 3, 4, 5, 3, 4, 5, 3, 4, 5], borderColor: '#36A2EB', tension: 0.4, fill: false },
            { label: 'Manutenção', data: [3, 4, 2, 5, 3, 4, 2, 3, 4, 2, 3, 2], borderColor: '#FFCE56', tension: 0.4, fill: false },
            { label: 'Logística', data: [1, 2, 3, 2, 1, 2, 3, 1, 2, 1, 2, 1], borderColor: '#4BC0C0', tension: 0.4, fill: false },
            { label: 'Qualidade', data: [1, 0, 2, 1, 1, 0, 1, 1, 0, 1, 1, 0], borderColor: '#9966FF', tension: 0.4, fill: false },
        ],
    };

    // Dados para o gráfico de barras
    const monthlyData = {
        labels: ['Administrativo', 'Produção', 'Manutenção', 'Logística', 'Qualidade'],
        datasets: [{
            label: 'Total de Acidentes',
            data: [16, 51, 37, 21, 9],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        }],
    };

    // Inicializa gráfico de linha
    accidentChart = new Chart(document.getElementById('accidentChart').getContext('2d'), {
        type: 'line',
        data: annualData,
        options: {
            responsive: true,
            interaction: { intersect: false, mode: 'index' },
            scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Número de Acidentes' } },
            },
            plugins: {
                title: { display: true, text: 'Evolução de Acidentes por Setor' },
            },
        },
    });

    // Inicializa gráfico de barras
    monthlyChart = new Chart(document.getElementById('monthlyChart').getContext('2d'), {
        type: 'bar',
        data: monthlyData,
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Total de Acidentes' } },
            },
            plugins: {
                title: { display: true, text: 'Total de Acidentes por Setor' },
            },
        },
    });
});
