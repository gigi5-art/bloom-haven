let coins = 0;

function updateCoins(){

document.getElementById("coins").innerHTML =
"🪙 Coins: " + coins;

}

function startGame(){

alert("🫧 Bubble Pop is coming in Version 2!");

}

function showGarden(){

document.getElementById("screen").innerHTML =

`
<h2>🌷 My Garden</h2>

<p>
Your garden is empty...

🌱

Go earn some flowers!
</p>
`;

}

function showShop(){

document.getElementById("screen").innerHTML =

`
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
