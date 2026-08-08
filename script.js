// ========================================
// 🌸 BLOOM HAVEN — VERSION 3.4
// FREE GARDEN PLACEMENT
// ========================================


// ========================================
// 💾 LOAD SAVED DATA
// ========================================

let petals = Number(localStorage.getItem("petals")) || 0;

let garden = JSON.parse(
    localStorage.getItem("garden")
) || [];


// ========================================
// 🌸 PETALS
// ========================================

function updatePetals() {

    const coins = document.getElementById("coins");

    if (coins) {
        coins.innerHTML =
            "🌸 Petals: " + petals;
    }

}


// ========================================
// 💾 SAVE GAME
// ========================================

function saveGame() {

    localStorage.setItem(
        "petals",
        petals
    );

    localStorage.setItem(
        "garden",
        JSON.stringify(garden)
    );

}


// ========================================
// 💾 LOAD GAME
// ========================================

function loadGame() {

    petals =
        Number(
            localStorage.getItem("petals")
        ) || 0;

    garden =
        JSON.parse(
            localStorage.getItem("garden")
        ) || [];

    updatePetals();

}


// ========================================
// 🏡 HOME
// ========================================

function showHome() {

    document.getElementById("screen").innerHTML = `

        <h2>🌸 Welcome to Bloom Haven!</h2>

        <p>
            Play Bubble Pop to earn petals.<br><br>

            Buy beautiful flowers.<br><br>

            Plant them anywhere in your garden! 🌱
        </p>

    `;

}


// ========================================
// 🫧 BUBBLE POP
// ========================================

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


    const gameArea =
        document.getElementById("gameArea");


    const bubbleInterval =
        setInterval(
            createBubble,
            700
        );


    const timer =
        setInterval(() => {

            timeLeft--;

            const timerElement =
                document.getElementById("timer");


            if (timerElement) {

                timerElement.innerText =
                    timeLeft;

            }


            if (timeLeft <= 0) {

                clearInterval(timer);

                clearInterval(
                    bubbleInterval
                );


                petals += score;


                updatePetals();

                saveGame();


                alert(
                    "You earned " +
                    score +
                    " petals! 🌸"
                );


                showHome();

            }

        }, 1000);


    function createBubble() {

        const bubble =
            document.createElement("div");


        bubble.innerHTML = "🫧";


        bubble.style.position =
            "absolute";

        bubble.style.left =
            Math.random() * 90 + "%";

        bubble.style.top =
            "100%";

        bubble.style.fontSize =
            "50px";

        bubble.style.cursor =
            "pointer";

        bubble.style.transition =
            "4s linear";


        gameArea.appendChild(
            bubble
        );


        setTimeout(() => {

            bubble.style.top =
                "-60px";

        }, 50);


        bubble.onclick =
            function () {

                score++;


                const scoreElement =
                    document.getElementById(
                        "score"
                    );


                if (scoreElement) {

                    scoreElement.innerText =
                        score;

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


// ========================================
// 🛒 SHOP
// ========================================

function showShop() {

    document.getElementById("screen").innerHTML = `

        <h2>🛒 Flower Shop</h2>

        <p>
            Buy flowers, then plant them
            anywhere in your garden! 🌱
        </p>


        <div class="shop">


            <div class="card">

                <h3>🌼</h3>

                <h2>Daisy</h2>

                <p>20 Petals</p>

                <button
                    onclick="buyFlower('🌼', 20)"
                >
                    Buy
                </button>

            </div>


            <div class="card">

                <h3>🌷</h3>

                <h2>Tulip</h2>

                <p>50 Petals</p>

                <button
                    onclick="buyFlower('🌷', 50)"
                >
                    Buy
                </button>

            </div>


            <div class="card">

                <h3>🌹</h3>

                <h2>Rose</h2>

                <p>100 Petals</p>

                <button
                    onclick="buyFlower('🌹', 100)"
                >
                    Buy
                </button>

            </div>


        </div>

    `;

}


// ========================================
// 🌸 BUY FLOWER
// ========================================

function buyFlower(
    flower,
    cost
) {

    if (petals >= cost) {

        petals -= cost;


        // Store the flower
        // without a position yet

        garden.push({

            flower: flower,

            x: null,

            y: null

        });


        updatePetals();

        saveGame();


        alert(
            "You bought a " +
            flower +
            "! 🌱"
        );


        showGarden();


    } else {

        alert(
            "Not enough petals! 😭"
        );

    }

}


// ========================================
// 🌷 GARDEN
// ========================================

function showGarden() {

    document.getElementById("screen").innerHTML = `

        <h2>🌷 My Garden</h2>

        <p>
            🌱 Tap anywhere to plant a flower!
            <br>
            🖱️ Drag flowers to move them.
        </p>


        <div class="garden-world"
             id="gardenWorld">


            <!-- ☀️ SUN -->

            <div class="garden-sun">
                ☀️
            </div>


            <!-- ☁️ CLOUDS -->

            <div class="
                garden-cloud
                cloud-one
            ">
                ☁️
            </div>


            <div class="
                garden-cloud
                cloud-two
            ">
                ☁️
            </div>


            <!-- 🌳 TREES -->

            <div class="
                garden-decoration
                tree-left
            ">
                🌳
            </div>


            <div class="
                garden-decoration
                tree-right
            ">
                🌳
            </div>


            <!-- 🦋 BUTTERFLY -->

            <div class="
                garden-butterfly
            ">
                🦋
            </div>


        </div>

    `;


    const gardenWorld =
        document.getElementById(
            "gardenWorld"
        );


    // ====================================
    // 🌸 PLACE EXISTING FLOWERS
    // ====================================

    garden.forEach(
        (item, index) => {

            if (
                item.x !== null &&
                item.y !== null
            ) {

                createFlowerElement(
                    item,
                    index,
                    gardenWorld
                );

            }

        }
    );


    // ====================================
    // 🌱 FIND UNPLANTED FLOWER
    // ====================================

    const unplantedIndex =
        garden.findIndex(
            item =>
                item.x === null ||
                item.y === null
        );


    if (unplantedIndex !== -1) {

        gardenWorld.classList.add(
            "planting-mode"
        );


        gardenWorld.addEventListener(
            "click",
            function plantFlower(event) {


                // Ignore clicks
                // directly on existing flowers

                if (
                    event.target.classList.contains(
                        "placed-flower"
                    )
                ) {

                    return;

                }


                const rect =
                    gardenWorld.getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width *
                    100;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height *
                    100;


                garden[
                    unplantedIndex
                ].x = x;


                garden[
                    unplantedIndex
                ].y = y;


                saveGame();


                showGarden();

            }
        );

    }

}


// ========================================
// 🌸 CREATE FLOWER
// ========================================

function createFlowerElement(
    item,
    index,
    gardenWorld
) {

    const flower =
        document.createElement(
            "div"
        );


    flower.className =
        "placed-flower";


    flower.innerText =
        item.flower;


    flower.style.left =
        item.x + "%";


    flower.style.top =
        item.y + "%";


    gardenWorld.appendChild(
        flower
    );


    // ====================================
    // 🖱️ DRAG / TOUCH
    // ====================================

    let dragging = false;


    flower.addEventListener(
        "pointerdown",
        function (event) {

            event.stopPropagation();

            dragging = true;

            flower.setPointerCapture(
                event.pointerId
            );

        }
    );


    flower.addEventListener(
        "pointermove",
        function (event) {

            if (!dragging) {
                return;
            }


            const rect =
                gardenWorld.getBoundingClientRect();


            let x =
                (
                    event.clientX -
                    rect.left
                ) /
                rect.width *
                100;


            let y =
                (
                    event.clientY -
                    rect.top
                ) /
                rect.height *
                100;


            // Keep flower inside garden

            x =
                Math.max(
                    5,
                    Math.min(
                        95,
                        x
                    )
                );


            y =
                Math.max(
                    10,
                    Math.min(
                        90,
                        y
                    )
                );


            flower.style.left =
                x + "%";


            flower.style.top =
                y + "%";


            garden[index].x =
                x;


            garden[index].y =
                y;

        }
    );


    flower.addEventListener(
        "pointerup",
        function () {

            if (dragging) {

                dragging = false;

                saveGame();

            }

        }
    );

}


// ========================================
// 🚀 START
// ========================================

loadGame();

showHome();
