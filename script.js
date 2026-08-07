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

        <h3>Time: <span id="timer">30</span></h3>

        <h3>Score: <span id="score">0</span></h3>

        <div id="gameArea"></div>
    `;

    const gameArea = document.getElementById("gameArea");

    gameArea.style.position = "relative";
    gameArea.style.height = "500px";
    gameArea.style.background = "#dff8ff";
    gameArea.style.borderRadius = "20px";
    gameArea.style.overflow = "hidden";

    const bubbleInterval = setInterval(createBubble,700);

    const timer = setInterval(()=>{

        timeLeft--;

        document.getElementById("timer").innerText=timeLeft;

        if(timeLeft<=0){

            clearInterval(timer);
            clearInterval(bubbleInterval);

            coins += score;

            updateCoins();

            document.getElementById("screen").innerHTML=`
                <h2>🎉 Game Over!</h2>

                <h3>You earned ${score} coins!</h3>

                <button onclick="startGame()">
                🔄 Play Again
                </button>

                <button onclick="showGarden()">
                🌷 Go To Garden
                </button>
            `;

        }

    },1000);

    function createBubble(){

        const bubble=document.createElement("div");

        bubble.innerHTML="🫧";

        bubble.style.position="absolute";

        bubble.style.left=Math.random()*90+"%";

        bubble.style.top="100%";

        bubble.style.fontSize="45px";

        bubble.style.cursor="pointer";

        bubble.style.transition="4s linear";

        gameArea.appendChild(bubble);

        setTimeout(()=>{
            bubble.style.top="-60px";
        },50);

        bubble.onclick=function(){

            score++;

            document.getElementById("score").innerText=score;

            bubble.remove();

        }

        setTimeout(()=>{
            bubble.remove();
        },4000);

    }

}

function showGarden(){

document.getElementById("screen").innerHTML=`

<h2>🌷 My Garden</h2>

<h3>🌱 Empty...</h3>

<p>

Soon you'll be able to plant flowers here!

</p>

`;

}

function showShop(){

document.getElementById("screen").innerHTML=`

<h2>🛒 Flower Shop</h2>

<p>

🌼 Daisy - 20 Coins

<br><br>

🌷 Tulip - 50 Coins

<br><br>

🌹 Rose - 100 Coins

</p>

`;

}
