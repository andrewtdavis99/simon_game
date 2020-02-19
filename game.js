const buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern =[];

var userClickedPattern = [];

var started = false;

var level = 0

$(document).on("keypress", () => {
    if (!started) {
        nextSequence();
        started = true;
    }
    
});

$(".btn").click(function(e) {
    e.preventDefault();
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    var index = userClickedPattern.length -1;
    checkAnswer(index);
    console.log(userClickedPattern);
});

function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`)
    audio.play();
};

function nextSequence()  {
    userClickedPattern = [];
    var randomNumber  = Math.floor(Math.random () * 4);
    var randomChosenColor = buttonColors[randomNumber];
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
    level++
    $("#level-title").text("Level " + level);
    console.log(gamePattern);
    
};

function animatePress(currentColor) {
    $(`.${currentColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function checkAnswer(currentLevel) {
    console.log(currentLevel);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success")
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $('body').addClass("game-over");
        setTimeout(function () {
            $('body').removeClass("game-over");
        }, 200);
        $('#level-title').html("Game Over, Press Any Key to Restart");
        startOver();
    }
};

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}










