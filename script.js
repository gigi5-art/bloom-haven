let petals = Number(localStorage.getItem("petals")) || 0;
let garden = JSON.parse(localStorage.getItem("garden")) || [];

// ===============================
// PETALS
// ===============================

function updatePetals() {
    document.getElementById("coins").innerHTML =
        "🌸 Petals: " + petals;
}

// ===============================
// SAVE SYSTEM
// ===============================

function saveGame() {
    localStorage.setItem("petals", petals);
    localStorage.setItem("garden", JSON.stringify(garden));
}

function loadGame() {
    petals = Number(localStorage.getItem("petals")) || 0;
    garden = JSON.parse(localStorage.getItem("garden")) || [];

    updatePetals();
}

// ===============================
// HOME
// ===============================

function showHome() {

    document.getElementById("screen").innerHTML = `

        <h2>🌸 Welcome to Bloom Haven!</h2>

        <p>
            Play Bubble Pop to earn petals.<br><br>
            Buy beautiful flowers.<br><br>
            Grow your dream garden!
        </p>

    `;
}

// ===============================
// BUBBLE POP
// ===============================

function startGame() {

    let score = 0;
    let timeLeft = 30;

    document.getElementById("screen").innerHTML = `

        <h2>🫧 Bubble Pop</h2>

        <h3>
            ⏰ Time:
            <span id="timer">30</span>
        </h3>

        <h3>
            ⭐ Score:
            <span id="score">0</span>
        </h3>

        <div id="gameArea"></div>

    `;

    const gameArea = document.getElementById("gameArea");

    const bubbleInterval = setInterval(createBubble, 700);

    const timer = setInterval(() => {

        timeLeft--;

        const timerElement = document.getElementById("timer");

        if (timerElement) {
            timerElement.innerText = timeLeft;
        }

        if (timeLeft <= 0) {

            clearInterval(timer);
            clearInterval(bubbleInterval);

            petals += score;

            updatePetals();
            saveGame();

            alert(
                "You earned " + score + " petals! 🌸"
            );

            showHome();
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

            const scoreElement = document.getElementById("score");

            if (scoreElement) {
                scoreElement.innerText = score;
            }

            bubble.remove();
        };

        setTimeout(() => {

            if (bubble.parentElement) {
                bubble.remove();
            }

        }, 4000);
    }
}

// ===============================
// SHOP
// ===============================

function showShop() {

    document.getElementById("screen").innerHTML = `

        <h2>🛒 Flower Shop</h2>

        <div class="shop">

            <div class="card">

                <h3>🌼</h3>

                <h2>Daisy</h2>

                <p>20 Petals</p>

                <button onclick="buyFlower('🌼', 20)">
                    Buy
                </button>

            </div>


            <div class="card">

                <h3>🌷</h3>

                <h2>Tulip</h2>

                <p>50 Petals</p>

                <button onclick="buyFlower('🌷', 50)">
                    Buy
                </button>

            </div>


            <div class="card">

                <h3>🌹</h3>

                <h2>Rose</h2>

                <p>100 Petals</p>

                <button onclick="buyFlower('🌹', 100)">
                    Buy
                </button>

            </div>

        </div>

    `;
}

// ===============================
// BUY FLOWER
// ===============================

function buyFlower(flower, cost) {

    if (petals >= cost) {

        petals -= cost;

        garden.push(flower);

        updatePetals();

        saveGame();

        alert(
            "You planted a " + flower + "!"
        );

    } else {

        alert(
            "Not enough petals! 😭"
        );
    }
}

// ===============================
// GARDEN
// ===============================

function showGarden() {

    let flowers = "";

    if (garden.length === 0) {

        flowers = `
            <h2>🌱 Your garden is empty.</h2>
            <p>Buy some flowers from the shop! 🌼</p>
        `;

    } else {

        garden.forEach(function (flower) {

            flowers += `
                <span style="
                    font-size:50px;
                    margin:8px;
                    display:inline-block;
                ">
                    ${flower}
                </span>
            `;

        });
    }

    document.getElementById("screen").innerHTML = `

        <h2>🌷 My Garden</h2>

        <div id="garden">

            ${flowers}

        </div>

    `;
}

// ===============================
// START GAME
// ===============================

loadGame();
showHome();
