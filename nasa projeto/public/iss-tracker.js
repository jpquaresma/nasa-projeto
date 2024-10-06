document.addEventListener('DOMContentLoaded', () => {
    const issInfo = document.getElementById('iss-info');

    // Função para buscar a posição da ISS
    async function fetchISSPosition() {
        try {
            const response = await fetch('http://api.open-notify.org/iss-now.json');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar a posição da ISS:', error);
            return null;
        }
    }

    // Função para exibir informações da ISS
    function displayISSInfo(issData) {
        if (issData) {
            issInfo.innerHTML = `
                <h2>Posição Atual da ISS</h2>
                <p><strong>Latitude:</strong> ${issData.iss_position.latitude}</p>
                <p><strong>Longitude:</strong> ${issData.iss_position.longitude}</p>
                <p><strong>Timestamp:</strong> ${new Date(issData.timestamp * 1000).toLocaleString()}</p>
            `;
        } else {
            issInfo.innerHTML = '<p>Não foi possível obter informações da ISS. Por favor, tente novamente mais tarde.</p>';
        }
    }

    // Atualizar a posição da ISS a cada 10 segundos
    function updateISSPosition() {
        fetchISSPosition().then(displayISSInfo);
    }

    updateISSPosition();
    setInterval(updateISSPosition, 10000);
});