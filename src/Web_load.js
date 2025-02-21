function getBreakScreenHTML(history) {
    console.log(history);
    return `
    <html>
    <head>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
            * {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                text-decoration: none;
            }

            .main-container {
                width: 100%;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: row;
                gap: 30px;
                background-color: #FF8D29;
            }

            .clock-container {
                width: 400px;
                height: 400px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-size: 2rem;
                font-weight: bold;
                border-radius: 12px;
                background-color: #fff;
                box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
                position: relative;
                gap: 10px;
            }

            .control-buttons {
                display: flex;
                gap: 10px;
            }

            .control-button {
                padding: 10px 20px;
                font-size: 16px;
                font-weight: bold;
                border: none;
                border-radius: 8px;
                color: white;
                cursor: pointer;
                transition: 0.3s;
            }

            .pause-button {
                background-color: #FF4500;
            }

            .pause-button:hover {
                background-color: #E63900;
            }

            .play-button {
                background-color: #28A745;
            }

            .play-button:hover {
                background-color: #218838;
            }

            .chart-container {
                width: 400px;
                height: 400px;
                background-color: #fff;
                padding: 20px;
                border-radius: 12px;
                box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
            }

            .Timer {
                color: #FF8D29;
            }
        </style>
    </head>

    <body>
        <main class="main-container">
            <section class="clock-container">
                <div class="Timer" id="Timer">5:00</div>
                <div class="control-buttons">
                    <button class="control-button pause-button" onclick="pauseTimer()">Pause</button>
                    <button class="control-button play-button" onclick="playTimer()">Play</button>
                </div>
            </section>

            <section class="chart-container">
                <canvas id="focusChart"></canvas>
            </section>
        </main>

        <script>
            let countdown = 300; // 5 minutes
            let timer;
            let isPaused = false;

            function startTimer() {
                timer = setInterval(updateClock, 1000);
            }

            function updateClock() {
                if (!isPaused) {
                    let min = Math.floor(countdown / 60);
                    let sec = countdown % 60;
                    document.getElementById("Timer").innerText = min + ":" + (sec < 10 ? "0" : "") + sec;

                    if (countdown-- <= 0) {
                        clearInterval(timer);
                    }
                }
            }

            function pauseTimer() {
                isPaused = true;
                clearInterval(timer);
                console.log("pause"); // Command to pause
            }

            function playTimer() {
                if (isPaused) {
                    isPaused = false;
                    startTimer();
                    console.log("play"); // Command to play
                }
            }

            startTimer();

            // Focus history data from backend
            const history = ${JSON.stringify(history)};

            // Prepare data for Chart.js
            const labels = history.map(item => new Date(item.date).toLocaleTimeString());
            const durations = history.map(item => item.duration);

            const ctx = document.getElementById('focusChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Focus Duration (minutes)',
                        data: durations,
                        backgroundColor: ['#FF8D29', '#FBAC5B', '#FFD700', '#FFA500', '#FF4500'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom'
                        }
                    }
                }
            });
        </script>
    </body>
    </html>
    `;
}

module.exports = getBreakScreenHTML;
