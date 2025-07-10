const buttons = Array.from(document.querySelectorAll(".grid"));
const para = document.querySelector("#info");
const replay_button = document.querySelector("#replay");
const scoreXPara = document.querySelector("#scoreX");
const scoreOPara = document.querySelector("#scoreO");
let turn = "[X]"
let scoreX = 0;
let scoreO = 0;


const updateScore = () => {
    scoreXPara.innerText = scoreX;
    scoreOPara.innerText = scoreO;
};

const selectMove = async () => {
    const clickedItem = await new Promise((resolve, reject) => {
        buttons.forEach(element => {
            element.addEventListener("click", () => {
                resolve(element.id);
            })
        }); 
    });
    console.log(clickedItem + " has been clicked");
    return clickedItem;
};
const checkThree = (a, b ,c) => {
    return (a == "[X]" && b == "[X]" && c == "[X]") || (a == "[O]" && b == "[O]" && c == "[O]");
};
const checkWin = (array) => {
    const combinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    return combinations.map(combination => {
        return checkThree(array[combination[0]].dataset.value, array[combination[1]].dataset.value, array[combination[2]].dataset.value);
    }).some(element => element);    
};

const checkTie = (array) => {
    checkIfHasBoxBeenUsed = array.map(button => {
        return button.dataset.value != "none";
    });
    let output = checkIfHasBoxBeenUsed.every(element => element);
    return output;
};

const play = async () => {
    const move = await selectMove();
    console.log(buttons[move].dataset.value)
    if (buttons[move].dataset.value == "none") {
        buttons[move].dataset.value = turn;
        buttons[move].innerText = turn;
        if (turn === "[X]") {turn = "[O]"} else {turn = "[X]"};
        updatePara();
    } else {
        console.log(buttons[move].dataset.value);
        alert("invalid move");
    }
};




const updatePara = (win) => {
    if (win) {
        if (checkTie(buttons)) {
            para.innerText = `Game Ended! It's a tie!`
        } else {
            para.innerText = `Game Ended! ${turn[1]} Wins!`
        }
        replay_button.style.display = "inline";
    } else {
        para.innerText = `${turn[1]}'s Move`
    };
};

const gameLoop = async () => {
    while(!checkWin(buttons) && !checkTie(buttons)) {
        await play();
    }
    console.log("Game ended!");
    if (turn === "[X]") {turn = "[O]"} else {turn = "[X]"};
    console.log(checkTie(buttons));
    if (checkTie(buttons)) {console.log("It's a Tie")} else {
        console.log(`${turn} Wins!`);
        if (turn === "[X]") {scoreX++} else {scoreO++};
    };
    updateScore();
    updatePara(true);
};

const reset_game = () => {
    console.log("resetting game")
    buttons.forEach(element => {
        element.innerText = "[]"
        element.dataset.value = "none";    
    });
    let turn = "[X]"
    updatePara();
    gameLoop();
};
replay_button.addEventListener("click", reset_game);
updatePara();
reset_game();
