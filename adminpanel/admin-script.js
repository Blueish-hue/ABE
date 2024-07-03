document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin Panel Loaded');

    // Show the main content with animation
    const main = document.querySelector('main');
    main.classList.add('show');

    // Show sections with delay for smooth transition
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('show');
        }, index * 300); // 300ms delay between each section
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Initialize the map with Leaflet
    const map = L.map('map').setView([20, 0], 2); // Set the view to a global view

    // Add the tile layer from Mapbox
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=YOUR_MAPBOX_ACCESS_TOKEN', {
        maxZoom: 18,
        id: 'mapbox/dark-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN'
    }).addTo(map);

    // Fetch and add access points to the map
    async function fetchAccessPoints() {
        const response = await fetch('/api/traffic');
        const trafficData = await response.json();

        trafficData.forEach(data => {
            L.marker([data.lat, data.lng]).addTo(map)
                .bindPopup(`IP: ${data.ip} - UserAgent: ${data.userAgent}`)
                .openPopup();
        });
    }

    fetchAccessPoints();

    // Function to update statistics from server data
    async function updateStatistics() {
        const response = await fetch('/api/traffic');
        const trafficData = await response.json();

        const totalUsers = trafficData.length;
        const dailyVisits = trafficData.filter(data =>
            new Date(data.timestamp).toDateString() === new Date().toDateString()
        ).length;

        document.getElementById('total-users').textContent = totalUsers;
        document.getElementById('daily-visits').textContent = dailyVisits;
    }

    updateStatistics();
    setInterval(updateStatistics, 30000); // 30 seconds

    // Function to update activity log from server data
    async function updateActivityLog() {
        const response = await fetch('/api/traffic');
        const trafficData = await response.json();

        const activityLog = document.getElementById('activity-log');
        activityLog.innerHTML = '';

        trafficData.slice(0, 5).forEach(data => {
            const li = document.createElement('li');
            li.textContent = `${data.ip} - ${data.userAgent} - ${new Date(data.timestamp).toLocaleString()}`;
            activityLog.appendChild(li);
        });
    }

    updateActivityLog();
    setInterval(updateActivityLog, 60000); // 1 minute

    // Function to update system status (simulate data update)
    function updateSystemStatus() {
        const statuses = {
            server: ['Online', 'Offline', 'Maintenance'],
            database: ['Connected', 'Disconnected'],
            api: ['Operational', 'Degraded', 'Offline']
        };

        const serverStatus = document.getElementById('server-status');
        const dbStatus = document.getElementById('db-status');
        const apiStatus = document.getElementById('api-status');

        serverStatus.textContent = statuses.server[Math.floor(Math.random() * statuses.server.length)];
        dbStatus.textContent = statuses.database[Math.floor(Math.random() * statuses.database.length)];
        apiStatus.textContent = statuses.api[Math.floor(Math.random() * statuses.api.length)];
    }

    updateSystemStatus();
    setInterval(updateSystemStatus, 45000); // 45 seconds
});
