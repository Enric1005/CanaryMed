document.addEventListener("DOMContentLoaded", function () {

    setTimeout(function () {

        const map = L.map('map').setView([28.123, -15.43], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);

        L.marker([28.127251059139592, -15.429341986907705])
            .addTo(map)
            .bindPopup("Vithas");

        L.marker([28.137397841717938, -15.430286318014362])
            .addTo(map)
            .bindPopup("Perpetuo Socorro");

        L.marker([27.74973226113439, -15.60701695427746])
            .addTo(map)
            .bindPopup("San Roque");

        L.marker([28.14324267975433, -15.432499119442806])
            .addTo(map)
            .bindPopup("San José");

    }, 600);

});
