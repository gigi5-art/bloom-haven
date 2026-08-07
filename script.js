let coins = 0;

function updateCoins() {
    document.getElementById("coins").innerHTML =
    "🪙 Coins: " + coins;
}

function startGame() {

    let score = 0;
    let timeLeft = 30;

    document.getElementById("screen").innerHTML = `
        <h2>🫧 Bubble Pop!</h2>

        <h3>⏰ Time: <span id="timer">30</span></h3>

        <h3>⭐ Score: <span id="score">0</span></h3>

        <div id="gameArea"></div>
    `;

    const gameArea = document.getElementById("gameArea");

    gameArea.style.position = "relative";
    gameArea.style.width = "100%";
    gameArea.style.height = "500px";
    gameArea.style.background = "#dff8ff";
    gameArea.style.borderRadius = "20px";
    gameArea.style.overflow = "hidden";

    const bubbleInterval = setInterval(createBubble, 700);

    const timer = setInterval(() => {

        timeLeft--;

        document.getElementById("timer").innerText = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);
            clearInterval(bubbleInterval);

            coins += score;

            updateCoins();

            document.getElementById("screen").innerHTML = `
                <h2>🎉 Game Over!</h2>

                <p>You earned <b>${score}</b> coins!</p>

                <button onclick="startGame()">🔄 Play Again</button>

                <button onclick="showGarden()">🌷 My Garden</button>

                <button onclick="showShop()">🛒 Shop</button>
            `;

        }

    }, 1000);

    function createBubble() {

        const bubble = document.createElement("div");

        bubble.innerHTML = "🫧";

        bubble.style.position = "absolute";
        bubble.style.left = Math.random() * 90 + "%";
        bubble.style.top = "100%";
        bubble.style.fontSize = "50px";
        bubble.style.cursor = "pointer";
        bubble.style.transition = "4s linear";

        gameArea.appendChild(bubble);

        setTimeout(() => {
            bubble.style.top = "-60px";
        }, 50);

        bubble.onclick = function () {

            score++;

            document.getElementById("score").innerText = score;

            bubble.remove();

        };

        setTimeout(() => {
            bubble.remove();
        }, 4000);

    }

}

function showGarden() {

    document.getElementById("screen").innerHTML = `
        <h2>🌷 My Garden</h2>

        <p>
        🌱 Your garden is empty...<br><br>
        Earn coins by playing Bubble Pop!<br><br>
        Soon you'll be able to plant flowers here.
        </p>

        <button onclick="showHome()">🏠 Home</button>
    `;

}

function showShop() {

    document.getElementById("screen").innerHTML = `
        <h2>🛒 Flower Shop</h2>

        <p>🌼 Daisy - 20 Coins</p>

        <p>🌷 Tulip - 50 Coins</p>

        <p>🌹 Rose - 100 Coins</p>

        <button onclick="showHome()">🏠 Home</button>
    `;

}

function showHome() {

    document.getElementById("screen").innerHTML = `
        <h2>🌸 Welcome to Bloom Haven!</h2>

        <p>
        Play mini-games to earn coins and grow the most beautiful garden! 🌼
        </p>
    `;

}
