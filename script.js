let boxes = document.querySelectorAll('#box');
let resetBtn = document.querySelector('#tryagain')
let newGamebtn = document.querySelector('#new-button')
let msgConatiner = document.querySelector('.msg-container')
let msg = document.querySelector('#msg')
let line = document.getElementById('line')
let turn0 = true;

const  gamePattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () =>{
    turn0 = true;
    enableBox()
    msgConatiner.classList.add("hide")
}

boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        console.log("box was clicked");
        //player1 
        if (turn0 === true) {
            box.innerText =  "O" 
            box.classList.add("O")
            turn0 = false
        }else{//palyer2
            box.innerText = "X"
            box.classList.add("X")
            turn0 = true
        }
        box.disabled = true
         
        checkWinner();
    });
});
function drawWineline(a, b, c){
    const boxA = boxes[a]
    const boxC = boxes[c]

    const startX = boxA.offsetLeft;
    const startY = boxA.offsetTop;
    const endX = boxC.offsetLeft;
    const endY = boxC.offsetTop;

    if (a === 0 && b=== 1 && c=== 2 || a === 3 && b === 4 && c === 5 || a === 6 && b === 7 && c === 8) {
        line.style.top = `${startY + 50}px`; // Vertically center
        line.style.left = `${startX}px`; // Start at the leftmost box
        line.style.width = `${endX - startX + 100}px`; // Stretch across the row
        line.style.height = "5px";
        line.style.transform = "rotate(0deg)"
        line.classList.remove("hide")
    }
    line.style.backgroundColor = "#344e41"
    line.style.position = "absolute"
}

const disableBox = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBox = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = ""
    }
}

const showWinner = (Winner) => {
    msg.innerText = `Congratulitons, winner is ${Winner}`;
    msgConatiner.classList.remove("hide");
    disableBox();
}

const checkWinner = () =>{
    for(let pattern of gamePattern){
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val =  boxes[pattern[2]].innerText;

      if(pos1Val !== "" && pos2Val !== "" && pos3Val !== ""){
        if(pos1Val === pos2Val && pos2Val === pos3Val){
            console.log("winner", pos1Val);
            showWinner(pos1Val);
            drawWineline(a, b, c);
        }
    }
 }
}

newGamebtn.addEventListener('click',resetGame);
resetBtn.addEventListener('click', resetGame);