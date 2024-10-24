function createMap() {
    var map = L.map('map').setView([33, -95], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    for (let i = 1; i <= 3; i++) {
        const latitude = getRandomInRange(30, 35, 3);
        const longitude = getRandomInRange(-90, -100, 3); 

        L.marker([latitude, longitude]).addTo(map);


        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
                const locality = data.locality;

                document.getElementById(`marker${i}`).textContent = 
                    `Marker ${i}: Latitude: ${latitude}, Longitude: ${longitude}`;
                document.getElementById(`locality${i}`).textContent = 
                    `Locality: ${locality}`;
            });
    }
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
    }

window.onload = createMap;
