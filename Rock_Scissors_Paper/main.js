const $computer = document.querySelector('#computer');
const $score = document.querySelector('#score');
const $rock = document.querySelector('#rock');
const $scissors = document.querySelector('#scissors');
const $paper = document.querySelector('#paper');
const IMG_URL = './rsp.png';
$computer.style.background = `url(${IMG_URL}) 0 0`; // Scissors
// $computer.style.background = `url(${IMG_URL}) -220px 0`; // Rock
// $computer.style.background = `url(${IMG_URL}) -440px 0`; // Paper
$computer.style.backgroundSize = 'auto 200px';

const rspX = {
    scissors: '0',
    rock: '-220px',
    paper: '-440px',
};

let computerChoice = 'scissors';
const changeComputerHand = () => {
    if(computerChoice === 'rock'){
        computerChoice = 'scissors';
    } else if(computerChoice === 'scissors'){
        computerChoice = 'paper';
    } else if(computerChoice === 'paper'){
        computerChoice = 'rock';
    }
    $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`; // Scissors
    $computer.style.backgroundSize = 'auto 200px';
}
let interverId = setInterval(changeComputerHand, 50);

const scoreTable = {
    rock: 0,
    scissors: 1,
    paper: -1,
};
/*
(1)--
if scissors == 1, rock == 0, paper == -1
myChoice - computerChoice
  computer | sci | rck | ppr
me
sci           0     1     2   
rck          -1     0     1
ppr          -2    -1     0

draw == 0
myWin == -1 || myWin == 2
computerWin == 1 || computerWin == -2
 */

let clickable = true;
let score = 0;

const clickButton = (event) => {
    if(clickable){
        clearInterval(interverId);
        clickable = false;
        const rsp = event.target.textContent;
        const myChoice = rsp === '바위' ? 'rock' :
            rsp === '가위' ? 'scissors' : 'paper';
        const myScore = scoreTable[myChoice];
        const comuperScore = scoreTable[computerChoice];
        let message;
        // --(1)
        const diff = myScore - comuperScore;
        if ([2, -1].includes(diff)){
            score++;
            message = '승리';
        } else if ([-2, 1].includes(diff)){
            score--;
            message = '패배';
        } else {
            message = '무승부';
        }
        $score.textContent = `${message} 총: ${score}점`;
        setTimeout(() => {
            clickable = true;
            interverId = setInterval(changeComputerHand, 50);
        }, 1000);
    }
};
$rock.addEventListener('click', clickButton);
$scissors.addEventListener('click', clickButton);
$paper.addEventListener('click', clickButton);