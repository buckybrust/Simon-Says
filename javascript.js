//Notes

//Features To Add
//-Add win or loss symbol?
//Loss sound effect
//ability to use keyboard for pressing the buttons

//bugs and fixes needed
//-Player cant see hover change on colors after computer ends its turn while cursor is hovering on a color.
//-hover color change over cursor still active when player turn is over if the cursor hasn't left the color
//Sometimes the Machine choice doesn't display properly a color usually the first or first two in a pattern


//Global Variables
var random1;
var numberstring = [];
var i;
var e = 0;
var numtodo = 3;
var currentNumber = 0;
var stackMode = true;
var playerTurn = false;
var random2;
var random3;
var patternTimer = 1000;
var points = 0;
var randomArray = [""];

//Global Sound Variables
var greenSound = new Audio("sounds/simonSound1.mp3");
var redSound = new Audio("sounds/simonSound2.mp3");
var blueSound = new Audio("sounds/simonSound3.mp3");
var yellowSound = new Audio ("sounds/simonSound4.mp3");
var winSound = new Audio("sounds/winSound.mp3");
winSound.volume = 0.12;

//Global Document Variables
var green = document.getElementById("green");
var red = document.getElementById("red");
var blue = document.getElementById("blue");
var yellow = document.getElementById("gold");
var stack = document.getElementById("stack");
var random = document.getElementById("random");
var startButtonZone = document.getElementById("startbuttonzone");
var coloredSquareZone = document.getElementById("coloredsquarezone");
var delete1 = document.getElementById("delete");
var scoreArea = document.getElementById("score");

//Event Listeners for Clicks
green.addEventListener("click", function(){compareClick(0, green, greenSound);});
red.addEventListener("click", function(){compareClick(1, red, redSound);});
blue.addEventListener("click", function(){compareClick(2, blue, blueSound);});
yellow.addEventListener("click", function(){compareClick(3, yellow, yellowSound);});
stack.addEventListener("click", function(){onButtonClick(true)});
random.addEventListener("click", function(){onButtonClick(false)});

//Event Listeners and function for Mouse Entering
green.addEventListener("mouseenter" , function(){onhoverDesign(green);});
red.addEventListener("mouseenter" , function(){onhoverDesign(red);});
blue.addEventListener("mouseenter" , function(){onhoverDesign(blue);});
yellow.addEventListener("mouseenter" , function(){onhoverDesign(yellow)});
function onhoverDesign(hoverElement, auto){
    if(playerTurn == false){
        hoverElement.style = ("background-color:" + hoverElement.id + ";cursor:initial;")
    }else{
        hoverElement.style = ("background-color:" + hoverElement.id + "; opacity:0.7;cursor:pointer;")
    }
}

//Event Listeners and Functions for Mouse Leaving
green.addEventListener("mouseleave" , function(){offhoverDesign(green);});
red.addEventListener("mouseleave" , function(){offhoverDesign(red);});
blue.addEventListener("mouseleave" , function(){offhoverDesign(blue);});
yellow.addEventListener("mouseleave" , function(){offhoverDesign(yellow)});
function offhoverDesign(hoverElement){
    hoverElement.style = ("background-color:" + hoverElement.id + ";cursor:initial")
}


//Button Click Funtions
function onButtonClick(tOrF){
    stackMode = tOrF;
    //startButtonZone.innerHTML = "";
    startButtonZone.innerHTML = "";
    document.getElementById("delete").innerHTML = "Watch";
    //console.log("button clicked")
    random1 = null;
    random2 = null;
    random3 = null;
    window.setTimeout(generateString, 700);
}



//Generate Number String for Pattern
function generateString(){
    delete1.innerHTML = "Watch";
    for(i = 0; i < numtodo; i++){
        random3 = random2;
        random2 = random1;
        random1 = (Math.floor(Math.random() * 4));
        //Detect if 3 same numbers in a row if so reroll the 3rd one.
        if (random1 == random2 && random2 == random3){
            console.log("3 matched " + random1 + random2 + random3)
            i--;
        }else{
            numberstring.push(random1);
        }
    }
    showPattern();
}



//Function For Displaying Game Inputs
function showPattern(){
    if(e < numberstring.length){
        if(numberstring[e] == 0){
            showMachineHover(green.id, green);
            showClick(greenSound, green);
        }else if (numberstring[e] == 1){
            showMachineHover(red.id, red);
            showClick(redSound, red);
        }else if(numberstring[e] == 2){
            showMachineHover(blue.id, blue);
            showClick(blueSound, blue)
        }else if (numberstring[e] == 3){
            showMachineHover(yellow.id, yellow);
            showClick(yellowSound, yellow)
        }else{
            console.log ('(Error) Numberstring number = ' + numberstring[e])
        }
        e++
        window.setTimeout(showPattern, patternTimer);
    }else{
        delete1.innerHTML = "Play";
        playerTurn = true;
    }
    
}

//Function to show when the game hovers over an element about to click
function showMachineHover(color, hoverElement){
    hoverElement.style = ("background-color:" + hoverElement.id + ";cursor:initial;opacity:0.7;")
    window.setTimeout(function(){
        hoverElement.style = ("background-color:" + hoverElement.id + ";cursor:initial;")}, 500);
}

// Showing The Tile Being Clicked
function showClick(soundPlay, elementId){
    soundPlay.play();
    soundPlay.currentTime=0;
    elementId.style.transform = "scale(0.95)";
    window.setTimeout(function(){
        elementId.style.transform = "scale(1)";
    }, 100);
}

function waitGenerate(){
    window.setTimeout(generateString, 1500)
}

//Function For Comparing User Inputs to Generated Inputs
function compareClick(color, elementId, soundPlay){
    if(playerTurn == true){
        showClick(soundPlay, elementId);
        if(color == numberstring[currentNumber]){
            currentNumber++
            //console.log("correct");
            if(numberstring.length == currentNumber){
                victoryDetect(true);
            }
        }else{
            victoryDetect(false);
        }
    }
}

//Function for claiming victory or defeat and repeating the process from begginning.
function victoryDetect(victory){
    if(victory == true){
       
        //Won Section
        winSound.play();
        currentNumber = 0;
        points++;
        playerTurn = false;
        delete1.innerHTML = "Watch"
        if(stackMode == true){
            numtodo = 1;
            e = 0;
            waitGenerate();
        }else{
            numtodo = numberstring.length + 1;
            numberstring = [];
            e = 0;
            random1 = null;
            random2 = null;
            random3 = null;
            waitGenerate();
        }
        // Increase Pattern Showing Speed Each Turn
        if(patternTimer > 400){
            patternTimer = patternTimer - 100;
        }
        
        //Losing Section
    }else{
        currentNumber = 0;
        numberstring = [];
        numtodo = 3;
        playerTurn = false;
        e = 0;
        if(stackMode == false){
            points = Math.floor(points * 150);
        }else{
            points = points * 100;
        }
        stackMode = true;
        
        //Reload Starting Buttons
        startButtonZone.innerHTML = "<div class='startbutton' id='stack'><h1>Stack Mode</h1><h4 class='tooltip'>New Colors Stacked Onto End of Pattern</h4></div><div class='startbutton' id='random'><h1 title='Color Pattern Randomly Generated and Changed.'>Random Mode</h1><h4 class='tooltip'>Color Pattern Changed Each Turn.</h4><h4 class='tooltip' style='color:white; top:-10px'>1.5x Score</h4>"
        document.getElementById("delete").innerHTML = "Choose Your Mode";
        
        //Make Starting Buttons Interactive and Reset Variables
        patternTimer = 1000;
        stack = document.getElementById("stack");
        random = document.getElementById("random");
        stack.addEventListener("click", function(){onButtonClick(true)});
        random.addEventListener("click", function(){onButtonClick(false)});
        scoreArea.innerHTML = ("Your Final Score Was: " + points)
        points = 0;
    }
}