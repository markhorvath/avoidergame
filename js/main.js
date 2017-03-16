    var avatarX = 0;
    var avatarY = 0;
    var avatarImage;
    var enemyImage;
    var enemyXPositions = [];
    var enemyYPositions = [];
    var ticksSurvived = 0;
    var mostTicksSurvived = 0;

function setUpGame() {
    var gameCanvas = document.getElementById("gameCanvas");
    avatarImage = new Image();
    enemyImage = new Image();
    enemyImage.src = "img/enemy.png";
    avatarImage.src = "img/avatar.png";

    if(localStorage.getItem("bestScore")){
        mostTicksSurvived = localStorage.getItem("bestScore");
    }

    //gameCanvas.width = 600;
    //gameCanvas.height = 800;

    gameCanvas.getContext("2d").drawImage(avatarImage, Math.random() * 100, Math.random() * 100);

    gameCanvas.addEventListener("mousemove", handleMouseMovement); //I believe the two parameters in addEventListern put the first as the "mouseEvent" parameter in the latter when it's called as a functions
    setInterval(handleTick, 25);
};

function handleMouseMovement(mouseEvent) {
    avatarX = mouseEvent.offsetX; //these offsetX/Y properties returns the x or y position based on a 0,0 position of the top-left corner of the canvas (i think)
    avatarY = mouseEvent.offsetY;
    /*if(mouseEvent.offsetX < 280 && mouseEvent.offsetX > 220 && mouseEvent.offsetY < (enemyY+30) && mouseEvent.offsetY > (enemyY -33)){ //avatar image is 30by33px, enemy image is at 250,150 and is 30x30px
        alert("collision");
    }*/
};

function handleTick() { //function for drawing the moving enemy
    var gameCanvas = document.getElementById("gameCanvas");
    function startNewGame(){
        enemyXPositions = [];
        enemyYPositions = [];
        ticksSurvived = 0;
    }

    if(Math.random() < 1/20){//this gives a 1/20th chance of creating a new enemy position which then moves down the screen like the others
        enemyYPositions.push(0);
        enemyXPositions.push(Math.random() * 370);
    }

    for(var i = 0; i < enemyYPositions.length; i++){
        enemyYPositions[i] = enemyYPositions[i] + 1;
    }

    gameCanvas.width = 400; //this erases the contents of the canvas
    gameCanvas.getContext("2d").drawImage(avatarImage, avatarX, avatarY);

    for(var i = 0; i < enemyYPositions.length; i++){
        gameCanvas.getContext("2d").drawImage(enemyImage, enemyXPositions[i], enemyYPositions[i]);
    }

    gameCanvas.getContext("2d").font = "18px Iceland";
    gameCanvas.getContext("2d").textBaseline = "top";
    gameCanvas.getContext("2d").fillText("Score: " + ticksSurvived, 0, 0);
    gameCanvas.getContext("2d").fillText("High Score: " + mostTicksSurvived, 270, 0);


    for(var i = 0; i < enemyYPositions.length; i++){
        if(((avatarX < enemyXPositions[i] && enemyXPositions[i] < avatarX + 30) || (enemyXPositions[i] < avatarX && avatarX < enemyXPositions[i] + 30)) && ((avatarY < enemyYPositions[i] && enemyYPositions[i] < avatarY + 33) || (enemyYPositions[i] < avatarY && avatarY < enemyYPositions[i] + 30))){
            //the above code is collision detection between two rectangles of enemy and avatar.  review the math here
            alert("You lose.  You surived " + ticksSurvived + " ticks.");
            if(ticksSurvived > mostTicksSurvived){
                alert("You beat your old high score by " + (ticksSurvived - mostTicksSurvived) + " ticks!")
                mostTicksSurvived = ticksSurvived;
                localStorage.setItem("bestScore", mostTicksSurvived); // localStorage setItem sets something (bestScore) to save in the user's broswer that can be called later on refresh (up to 5mb)
            }
            startNewGame();
        }
    }
    ticksSurvived++;
};
