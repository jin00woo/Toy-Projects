// game values
let min = 1,
  max = 10,
  winningNum = getWinningNum(min, max),
  guessesLeft = 3;

// UI elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num");
maxNum = document.querySelector(".max-num");
guessBtn = document.querySelector("#guess-btn");
guessInput = document.querySelector("#guess-input");
message = document.querySelector(".message");

// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again
game.addEventListener("mousedown", function(e){
  if(e.target.className === "play-again"){
    window.location.reload();
  }
});

// listen for guess
guessBtn.addEventListener("click", function(){
  let guess = parseInt(guessInput.value);

  // validation
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }
  // check if won
  if(guess === winningNum){
    gameOver(true, `${winningNum} is correct. You win!`);
  }
  else {
    // wrong Number
    guessesLeft -= 1;
    if(guessesLeft === 0){
      gameOver(false, `Game over. The correct number was ${winningNum}.`);
    }
    else {
      guessInput.value = "";
      setMessage(`${guess} is not correct. ${guessesLeft} guesses left.`, "red");
    }
  }
});

//set message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}

// game over
function gameOver(won, msg){
  let color;
  won === true ? color = "green" : "red";
  // disable input
    guessInput.disabled = true;
    //border color to green
    guessInput.style.borderColor = color;
  setMessage(msg, color);

  // play again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// set winning Number
function getWinningNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}