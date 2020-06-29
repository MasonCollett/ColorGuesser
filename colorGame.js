var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode"); //gives list with two buttons

init();

// Initializes gameboard, starts the game
function init(){
    setupModeButtons();
    setupSquares();
    reset();
}

// mode buttons event listeners
function setupModeButtons(){
    for(var i = 0; i< modeButtons.length; i++){
        modeButtons[i].addEventListener("click",function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            reset();
        });
    }
}

// add click listeners for squares
function setupSquares(){
    for(var i = 0; i < squares.length; i++){
        squares[i].addEventListener("click",function(){
            // get color of clicked square
            var clickedColor = this.style.backgroundColor;
            // compare color to pickedColor
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play Again?";
            }
            else {
                // hide incorrect choice
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

// sets gameboard to beginning state according to mode (used in colors array length)
function reset(){
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors"
    messageDisplay.textContent = "";
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        }
        else{
            squares[i].style.display = "none";
        }
    }
    h1.style.background = "steelblue";
}

// reset when button clicked
resetButton.addEventListener("click",function(){
    reset();
});

// change square colors based on color[] array
function changeColors(color){
    for(var i = 0; i < squares.length; i++){
        squares[i].style.background = color;
    }
}

// Picks one of the colors in the color array to be the "correct" pickedColor.
function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// gets random colors for each square
function generateRandomColors(num){
    // make array
    var arr = [];
    // add num random colors to array
    for(var i = 0; i < num; i++){
        arr.push(getRandomColor());
    }
    // return array
    return arr;
}

// random rgb color generator
function getRandomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var rbgSet = "rgb(" + r + ", " + g + ", " + b + ")";
    return rbgSet;
}
