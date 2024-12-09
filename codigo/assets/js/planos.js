
document.addEventListener('DOMContentLoaded', () => {
    const planoIndividual = document.getElementById('plano-individual');
    const descricaoIndividual = document.getElementById('descricao-individual');
    const imagemIndividual = document.getElementById('imagem-individual');
    const planoEmpresarial = document.getElementById('plano-empresarial');
    const descricaoEmpresarial = document.getElementById('descricao-empresarial');
    const imagemEmpresarial = document.getElementById('imagem-empresarial');
    const planoPremium = document.getElementById('plano-premium');
    const descricaoPremium = document.getElementById('descricao-premium');
    const imagemPremium = document.getElementById('imagem-premium');
    const botaoComprar = document.getElementById('botao-comprar');
    const valorComprar = document.getElementById('valor-comprar');

    let precoIndividual = [150, 250, 400]; 
    let precoEmpresarial = [100, 180, 300]; 
    let precoPremium = [300, 500, 800]; 

    let valorExameSelecionado = 0; 

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

       
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const region = getRegion(latitude, longitude);
                ajustarPrecos(region);
            })
            .catch(err => console.error('Erro ao buscar dados da API:', err));
    }

    function error() {
        console.error("Não foi possível obter a localização.");
    }

    
    function getRegion(latitude, longitude) {
        if (latitude >= -5.0 && longitude >= -74.0 && longitude < -60.0) {
            return 'Norte'; 
        } else if (latitude >= -5.0 && longitude >= -60.0 && longitude < -34.0) {
            return 'Nordeste'; 
        } else if (latitude >= -15.0 && longitude >= -60.0 && longitude < -45.0) {
            return 'Centro-Oeste'; 
        } else if (latitude >= -23.0 && longitude >= -50.0 && longitude < -34.0) {
            return 'Sudeste'; 
        } else if (latitude >= -30.0 && longitude >= -60.0) {
            return 'Sul'; 
        }
        return 'Desconhecida'; 
    }

    function ajustarPrecos(regiao) {
        const ajuste = {
            'Norte': [50, 30, 70],
            'Nordeste': [40, 20, 60],
            'Centro-Oeste': [30, 10, 50],
            'Sudeste': [20, 5, 30],
            'Sul': [10, 5, 20]
        };

        if (ajuste[regiao]) {
            precoIndividual = precoIndividual.map((preco, index) => preco + ajuste[regiao][0]);
            precoEmpresarial = precoEmpresarial.map((preco, index) => preco + ajuste[regiao][1]);
            precoPremium = precoPremium.map((preco, index) => preco + ajuste[regiao][2]);
        }

        document.querySelector('#exame-6-meses-individual + label').innerText = `Exame de 6 meses: R$ ${precoIndividual[0]},00`;
        document.querySelector('#exame-1-ano-individual + label').innerText = `Exame de 1 ano: R$ ${precoIndividual[1]},00`;
        document.querySelector('#exame-2-anos-individual + label').innerText = `Exame de 2 anos: R$ ${precoIndividual[2]},00`;

        document.querySelector('#exame-6-meses-empresarial + label').innerText = `Exame de 6 meses: R$ ${precoEmpresarial[0]},00 por funcionário`;
        document.querySelector('#exame-1-ano-empresarial + label').innerText = `Exame de 1 ano: R$ ${precoEmpresarial[1]},00 por funcionário`;
        document.querySelector('#exame-2-anos-empresarial + label').innerText = `Exame de 2 anos: R$ ${precoEmpresarial[2]},00 por funcionário`;

        document.querySelector('#exame-6-meses-premium + label').innerText = `Exame de 6 meses: R$ ${precoPremium[0]},00`;
        document.querySelector('#exame-1-ano-premium + label').innerText = `Exame de 1 ano: R$ ${precoPremium[1]},00`;
        document.querySelector('#exame-2-anos-premium + label').innerText = `Exame de 2 anos: R$ ${precoPremium[2]},00`;

        document.querySelector('input[name="exame"][value="150"]').value = precoIndividual[0];
        document.querySelector('input[name="exame"][value="250"]').value = precoIndividual[1];
        document.querySelector('input[name="exame"][value="400"]').value = precoIndividual[2];
        document.querySelector('input[name="exame"][value="100"]').value = precoEmpresarial[0];
        document.querySelector('input[name="exame"][value="180"]').value = precoEmpresarial[1];
        document.querySelector('input[name="exame"][value="300"]').value = precoEmpresarial[2];
        document.querySelector('input[name="exame"][value="300"]').value = precoPremium[0];
        document.querySelector('input[name="exame"][value="500"]').value = precoPremium[1];
        document.querySelector('input[name="exame"][value="800"]').value = precoPremium[2];

        atualizarValorBotao();
    }

    function atualizarValorBotao() {
        const selectedPlan = document.querySelector('input[name="exame"]:checked');
        if (selectedPlan) {
            valorExameSelecionado = selectedPlan.value; 
            valorComprar.textContent = valorExameSelecionado + ',00'; 
        } else {
            valorComprar.textContent = '0,00'; 
        }
    }

    planoIndividual.addEventListener('click', () => {
        descricaoEmpresarial.style.display = 'none';
        imagemEmpresarial.style.display = 'none';
        descricaoPremium.style.display = 'none';
        imagemPremium.style.display = 'none';

        descricaoIndividual.style.display = descricaoIndividual.style.display === 'block' ? 'none' : 'block';
        imagemIndividual.style.display = imagemIndividual.style.display === 'block' ? 'none' : 'block';
    });

    planoEmpresarial.addEventListener('click', () => {
        descricaoIndividual.style.display = 'none';
        imagemIndividual.style.display = 'none';
        descricaoPremium.style.display = 'none';
        imagemPremium.style.display = 'none';

        descricaoEmpresarial.style.display = descricaoEmpresarial.style.display === 'block' ? 'none' : 'block';
        imagemEmpresarial.style.display = imagemEmpresarial.style.display === 'block' ? 'none' : 'block';
    });

    planoPremium.addEventListener('click', () => {
        descricaoIndividual.style.display = 'none';
        imagemIndividual.style.display = 'none';
        descricaoEmpresarial.style.display = 'none';
        imagemEmpresarial.style.display = 'none';

        descricaoPremium.style.display = descricaoPremium.style.display === 'block' ? 'none' : 'block';
        imagemPremium.style.display = imagemPremium.style.display === 'block' ? 'none' : 'block';
    });

document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', () => {
        atualizarValorBotao();
    });
});

function verificarSelecao() {
    const radiosSelecionados = document.querySelector('input[type="radio"]:checked');

    if (!radiosSelecionados) {
        const modal = new bootstrap.Modal(document.getElementById('avisoModal'));
        modal.show();
    } else {
        window.location.href = 'pagamento.html';
    }
}
document.querySelector('#botao-comprar').addEventListener('click', (event) => {
    event.preventDefault();

    const selectedPlan = document.querySelector('input[name="exame"]:checked');
    if (selectedPlan) {
        const selectedValue = selectedPlan.value;
        localStorage.setItem('selectedPlanValue', selectedValue); 
        window.location.href = 'pagamento.html'; 
    } else {
        alert('Por favor, selecione um plano antes de prosseguir.');
    }
});
});