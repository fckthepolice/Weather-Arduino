function fetchData() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            document.getElementById("presion").textContent = data.presion;
            document.getElementById("temperatura").textContent = data.temperatura;
            document.getElementById("humedad").textContent = data.humedad;
        }
    };
    xhr.open("GET", "/data", true);
    xhr.send();
}

setInterval(fetchData, 2000); // Actualizar cada 2 segundos