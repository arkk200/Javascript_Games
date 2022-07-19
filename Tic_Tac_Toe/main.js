const {body} = document;
const $table = document.createElement('table');
const $result = document.createElement('div');
const rows = [];
let turn = 'O';

const isFilled = (event) => {
    if(event.target.textContent !== ''){
        return;
    } else {
        event.target.textContent = turn;
        const hasWinner = checkWinner(event.target);
        if(hasWinner){
            $result.textContent = `${turn}님의 승리!`;
            $table.removeEventListener('click', isFilled);
            return;
        }
    }
    // flat은 배열의 차원을 일차원 낮춰준다. 예) [1, [2, 3]] (flat)-> [1, 2, 3]
    // every는 every함수 내에 함수의 매개변수로 배열의 값이 차례로 들어가는데
    // 만약 반환값이 하나라도 false이면 false를 반환하며 반환값이 다 true이면 true를 반환한다.
    const draw = rows.flat().every((cell) => cell.textContent)
    if(draw){
        $result.textContent = '무승부';
        return;
    }
    turn = turn === 'X' ? 'O' : 'X';
};

const checkWinner = target => {
    // 좌표값
    let rowIndex = target.parentNode.rowIndex;
    let cellIndex = target.cellIndex;
    
    let hasWinner = false;

    if (rows[rowIndex][0].textContent === turn && 
        rows[rowIndex][1].textContent === turn &&
        rows[rowIndex][2].textContent === turn) hasWinner = true;
    if (rows[0][cellIndex].textContent === turn && 
        rows[1][cellIndex].textContent === turn &&
        rows[2][cellIndex].textContent === turn) hasWinner = true;
    if (rows[0][0].textContent === turn && 
        rows[1][1].textContent === turn &&
        rows[2][2].textContent === turn) hasWinner = true;
    if (rows[0][2].textContent === turn && 
        rows[1][1].textContent === turn &&
        rows[2][0].textContent === turn) hasWinner = true;
    return hasWinner;
}

for(let i = 1; i < 4; i++) {
    const $tr = document.createElement('tr');
    const cells = [];
    for(let j = 1; j < 4; j++){
        const $td = document.createElement('td');
        cells.push($td);
        $tr.appendChild($td);
    }
    rows.push(cells);
    $table.appendChild($tr);
    $table.addEventListener('click', isFilled);
}
body.appendChild($table);
body.appendChild($result);

