function getBreakScreenHTML(history) {
    console.log(history);
    return `
    <html>
    <head>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
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
                border-radius: 50%;
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
                padding: 20px 20px;
                font-size: 16px;
                border: none;
                color: white;
                cursor: pointer;
            }

            .pause-button {
                background-color: orange;
                border-radius:50%;
            }
            .pause-button:hover{
                background-color:#F36E15;
            }
            .play-button {
                background-color: yellow;
                border-radius:50%;
            }
            .play-button:hover{
                background-color:#FEFF73;
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
    <h1 style="text-align:center;color:white; font-size:22px;">Break Time with Progress Graph</h1>
        <main class="main-container">
           <section class="clock-container">
                 <h1 style="text-align:center;color:orange;">Break Timer</h1>
                <div class="Timer" id="Timer">5:00</div>
                <div class="control-buttons">
                    <button class="control-button pause-button" onclick="pauseTimer()"><i class="fa-solid fa-play"></i></button>
                    <button class="control-button play-button" onclick="playTimer()"><i class="fa-solid fa-pause"></i></button>
                </div>
            </section>

            <section class="chart-container">
             <h1 style="text-align:center;color:orange; font-size:22px;">Focus Graph</h1>
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
                       backgroundColor: ['#FF8D29', '#FFC285', '#FBAC5B', '#FFD3A1', '#FFD700', '#FFF4A3', '#FFA500', '#FFCF80', '#FF4500', '#FF9870'],
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
