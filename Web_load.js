function getBreakScreenHTML() {
  return `
 

<html>

<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
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
            flex-wrap: wrap;
            gap: 50px;
        }

        .clock-container {
            width: 500px;
            height: 500px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2rem;
            font-weight: bold;
            border-radius: 12px;
            background-color: #FF8D29;
        }

        .clock-circle {
            width: 300px;
            height: 300px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
        }

        .cards-container {
            width: 400px;
            height: 500px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            flex-wrap: wrap;
            gap: 30px;
            padding: 0px 20px;
            border-radius: 12px;
            background-color: #FBAC5B;
        }

        .card {
            width: 100px;
            height: 150px;
            background-color: #fff;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            text-align: center;
            font-size: 14px;
            font-weight: bold;
        }
        h5{
        color:black;}
        .Timer {
            color: #FBAC5B;
        }
    </style>
</head>

<body>

    <main class="main-container">
        <section class="clock-container">
            <div class="clock-circle">
                <div class="Timer" id="Timer">5:00</div>
            </div>
        </section>
        <section class="cards-container">
            <div class="card card1">
                <i class="fa-solid fa-person-walking" style="font-size: 50px; color:orange; margin-bottom:20px;"></i>
                <h5>Go for a Walk</h5>
            </div>
        
            <a href="#" target="_blank" style="color:black;">
                <div class="card card2">
                    <i class="fa-solid fa-book" style="font-size: 50px; color:orange; margin-bottom:20px;"></i>
                    <h5>Read an article</h5>
                </div>
            </a>
        
            <a href="#" target="_blank" style="color:black;">
                <div class="card card3">
                    <i class="fa-solid fa-mug-saucer" style="font-size: 50px; color:orange; margin-bottom:20px;"></i>
                    <h5>Grab a coffee</h5>
                </div>
            </a>
        
            <a href="#" target="_blank" style="color:black;">
                <div class="card card4">
                    <i class="fa-solid fa-wind" style="font-size: 50px; color:orange; margin-bottom:20px;"></i>
                    <h5>Breathe deeply</h5>
                </div>
            </a>
        
            <a href="#" target="_blank" style="color:black;">
                <div class="card card5">
                    <i class="fa-solid fa-music" style="font-size: 50px; color:orange; margin-bottom:20px;"></i>
                    <h5>Listen Music</h5>
                </div>
            </a>
        
            <a href="#" target="_blank" style="color:black;">
                <div class="card card6">
                    <i class="fa-solid fa-tree" style="font-size: 50px; color:orange; margin-bottom:20px;"></i>
                    <h5>Enjoy Nature</h5>
                </div>
            </a>
        </section>
    </main>

    <!-- Beep Sound -->
     
    <audio id="sound" src="./Sound/sound.mp3"></audio>
    <script>
            let countdown = 10; // 5 minutes
            let timer = setInterval(updateClock, 1000);
        
            function updateClock() {
                let min = Math.floor(countdown / 60);
                let sec = countdown % 60;
                document.getElementById("Timer").innerText = min + ":" + (sec < 10 ? "0" : "") + sec;
        
                if (countdown-- <= 0) { // Stop at 1 minute
                    clearInterval(timer);
                    let audio = document.getElementById("sound");
                    audio.play();
        
                    // Stop audio after 10 seconds
                    setTimeout(() => {
                        audio.pause();
                        audio.currentTime = 0; // Reset audio to the beginning
                    }, 10000);
                }
            }
            updateClock();
        </script>

        
    

</body>

</html>

    `;
}

module.exports = getBreakScreenHTML;
