//----- Welcome to the Interactive Valentine's Letter Game!-----

// Use the arrow keys ◀️🔼🔽➡️ to move Valentine around the screen.

// Collect hearts to reveal messages.

// Example images and music are currently set, feel free to just click play to see how it works. (Title screen image: Photo by Diana Polekhina on Unsplash)(Music: Turnaround Reprise - Hanz Zimmer)
 



let valentine, pet, bg, heartGif, music;
let valentineX, valentineY, petX, petY;
let speed = 5;
let petSpeed = 1;
let hearts = [];

// Customize the messages here! Feel free to add more messages.
let messages = [
  "Change",
  "and",
  "add",
  "messages",
  "here"
];

let petMessages = [
  "This",
  "is",
  "the",
  "pet's",
  "dialogue"
];

let collectedHearts = 0;
let storyIndex = 0;
let petStoryIndex = 0;
let gameState = "intro";
let petDirection = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };

function preload() {
  valentine = loadImage('valentine.png'); // Your valentine's photo
  pet = loadImage('pet.png'); // Your Valentine's pet photo
  bg = loadImage('valentine-bg.jpg'); // title screen background of your choice
  heartGif = loadImage('heart.gif');
  music = loadSound('game-music.mp3'); // Load your music file here
}

function setup() {
  createCanvas(800, 600);
  valentineX = width / 2;
  valentineY = height - 160;

 
  petX = Math.random() * (width - 50);
  petY = Math.random() * (height - 180 - 50);

  for (let i = 0; i < 10; i++) {
    hearts.push(createHeart());
  }

  music.loop();
}

function createHeart() {
  let heartX, heartY;


  do {
    heartX = Math.random() * (width - 100) + 50;
    heartY = Math.random() * (height - 250) + 50;
  } while (dist(heartX, heartY, valentineX + 60, valentineY + 75) < 100);

  return { x: heartX, y: heartY, collected: false };
}

function draw() {
  if (gameState == "intro") {
    drawIntro();
  } else if (gameState == "playing") {
    playGame();
  } else if (gameState == "completed") {
    drawCompletion();
  }
}

function drawIntro() {
  background(bg);
  fill(255);
  textSize(40);
  textAlign(CENTER);
  textStyle(BOLD);
  text("TITLE SCREEN", width / 2, height / 3);
       // ^^^^^^^ You can customize the title here
  
  textSize(24);
  text("Press ENTER to start!", width / 2, height / 2);
}

function playGame() {
  background(255, 182, 193);
  let gameAreaHeight = height - 180;
  image(valentine, valentineX, valentineY, 120, 150);
  image(pet, petX, petY, 50, 50);
  handleMovement();
  drawHearts(gameAreaHeight);
  checkCollisions();
  displayMessage();
  displayPetMessage();
  movePet();
}

function drawCompletion() {
  background(255, 105, 180);
  fill(255);
  textSize(32);
  textAlign(CENTER);
  textStyle(BOLD); 
  text("🎉 Happy Valentine's Day, ______! 🎉", width / 2, height / 3);
                               // ^^^^^^^ Here is where you add your VALENTINE's name
  textSize(22);
  text("LETTER", width / 2, height / 2);
    // ^^^^^^^ This is where you can write your full length letter
  
  text("- from ______", 415, 500); // This is where you add YOUR name
}

function handleMovement() {
  if (keyIsDown(LEFT_ARROW)) {
    valentineX -= speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    valentineX += speed;
  }
  if (keyIsDown(UP_ARROW)) {
    valentineY -= speed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    valentineY += speed;
  }
  valentineX = constrain(valentineX, 0, width - 120);
  valentineY = constrain(valentineY, 0, height - 180 - 150);
}

function movePet() {
  petX += petDirection.x * petSpeed;
  petY += petDirection.y * petSpeed;

  if (Math.random() < 0.01) {
    petDirection = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
  }

  if (petX <= 0 || petX >= width - 50) {
    petDirection.x *= -1;
  }
  if (petY <= 0 || petY >= height - 50 - 180) {
    petDirection.y *= -1;
  }
}

function drawHearts(gameAreaHeight) {
  for (let heart of hearts) {
    if (!heart.collected) {
      heart.x = constrain(heart.x, 50, width - 50);
      heart.y = constrain(heart.y, 50, gameAreaHeight - 50);
      image(heartGif, heart.x - 10, heart.y - 10, 30, 30);
    }
  }
}

function checkCollisions() {
  for (let heart of hearts) {
    let d = dist(valentineX + 60, valentineY + 75, heart.x, heart.y);
    if (d < 40 && !heart.collected) {
      heart.collected = true;
      collectedHearts++;
      storyIndex = min(storyIndex + 1, messages.length - 1);
    }
  }
  if (collectedHearts >= hearts.length) {
    gameState = "completed";
  }
}

function displayMessage() {
  fill(0, 0, 0, 150);
  noStroke();
  rect(50, height - 180, width - 100, 150, 15);
  
  stroke(255, 105, 180);
  strokeWeight(4);
  fill(255);
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text(messages[storyIndex], width / 2, height - 140);
}

function displayPetMessage() {

  fill(255);
  noStroke();
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(ITALIC);
  text(petMessages[petStoryIndex], petX, petY - 30);
  
  if (frameCount % 200 == 0) {
    petStoryIndex = (petStoryIndex + 1) % petMessages.length;
  }
}

function keyPressed() {
  if (keyCode == ENTER && gameState == "intro") {
    gameState = "playing";
  }
}
