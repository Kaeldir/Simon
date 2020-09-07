var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var gameStarted = false;

var level = 0;

$(document).keydown(function() {
  if (!gameStarted) {
    nextSquence();
    gameStarted = true;
  }
});

$(".btn").click(function(event) {
  var userChosenColour = this.classList[1];
  animatePress(userChosenColour);
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkPattern();
})

function nextSquence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  // animatePress(randomChosenColour);
  // playSound(randomChosenColour);
  playSequence(0);
}

function playSequence(i){
  $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
  animatePress(gamePattern[i]);
  playSound(gamePattern[i]);
  setTimeout(function(){
      if (i < gamePattern.length) playSequence(i+1);
  },500);
}

function animatePress(currentColour) {
  $("#" + currentColour).toggleClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).toggleClass("pressed");
  }, 100);
}

function playSound(colour) {
  switch (colour) {
    case "red":
      var sound = new Audio("sounds/red.mp3");
      sound.play();
      break;

    case "green":
      var sound = new Audio("sounds/green.mp3");
      sound.play();
      break;

    case "blue":
      var sound = new Audio("sounds/blue.mp3");
      sound.play();
      break;

    case "yellow":
      var sound = new Audio("sounds/yellow.mp3");
      sound.play();
      break;

    case "wrong":
      var sound = new Audio("sounds/wrong.mp3");
      sound.play();
      break;

    default:
      break;
  }
}

function checkPattern() {
  if (userClickedPattern[userClickedPattern.length - 1] !== gamePattern[userClickedPattern.length - 1]) {
    $("h1").text("Game Over! Press a button to restart!");
    playSound("wrong");
    $("body").toggleClass("game-over");
    setTimeout(function() {
      $("body").toggleClass("game-over");
    }, 200);
    gameStarted = false;
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
  } else if (userClickedPattern.length === gamePattern.length) {
    userClickedPattern = [];
    setTimeout(function() {
      nextSquence();
    }, 500);
  }

}
