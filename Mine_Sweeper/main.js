const $tbody = document.querySelector('#table tbody');
const $result = document.querySelector('#result');

/*
status codes
종류 : codeNumber : codeName
열린칸 : 0~8 : OPENED
닫힌 칸(지뢰 X) : -1 : NORMAL
물음표 칸(지뢰 X) : -2 : QUESTION
깃발 칸(지뢰 X) : -3 : FLAG
물음표 칸(지뢰 X) : -4 : QUESTION
깃발 칸(지뢰 X) : -5 : FLAG
닫힌 칸(지뢰 X) : -6 : NORMAL
 */

const row = 10; // 줄
const cell = 10; // 칸
const mine = 30; // 지뢰 개수
const CODE = {
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    MINE: -6,
    OPENED: 0,
};

let data;
// 지뢰 놓는 함수
function plantMine() {
    const candidate = Array(row * cell).fill().map((arr, i) => i); // 0부터 row*cell - 1까지 차례로 배열되어 있는 배열 생성 : 0 ~ 99
    const shuffle = [];
    while(candidate.length > row * cell - mine) { // while (100 > 90) : 10번 반복함
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]; // splice는 배열을 반환하므로 [0]을 함께 써줌
        shuffle.push(chosen); // 빈 칸에 해당하는 번호를 shuffle배열에 넣음 // 지뢰가 들어갈 칸에 해당하는 배열 인덱스
    }
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData); // data에 rowData 배열 추가
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL); // 해당 rowData에 CODE.NORMAL (-1) 추가
        }
    }
    for (let k = 0; k < shuffle.length; k++) { // 지뢰 개수만큼 반복 : 10
        const ver = Math.floor(shuffle[k] / cell); // 지뢰가 있을 칸의 행
        const hor = shuffle[k] % cell // 지뢰가 있을 칸의 열
        data[ver][hor] = CODE.MINE;
    }
    return data; // 지뢰가 랜덤하게 숨겨져 있는 맵 반환
}

function drawTable() {
    data = plantMine(); // 맵을 받음
    data.forEach((row) => {
        const $tr = document.createElement('tr');
        row.forEach((cell) => {
            const $td = document.createElement('td');
            if (cell === CODE.MINE) {
                $td.textContent = 'X';
            }
            $tr.appendChild($td);
        });
        $tbody.appendChild($tr);
        $tbody.addEventListener('contextmenu', onRightClick); // 이벤트 버블링 활용하여 우클릭을 해도 $td에 이벤트가 발생
        $tbody.addEventListener('click', onLeftClick);
    })
}

drawTable();

function onRightClick(event) {
    event.preventDefault(); // 우클릭할 때 기본 동작 막음
    const target = event.target;
    // console.log(target);
    const rowIndex = target.parentNode.rowIndex;
    const cellIndex = target.cellIndex;
    const cellData = data[rowIndex][cellIndex]; // 우클릭 했을 때 해당 위치의 배열을 data에서 가져옴
    if(cellData === CODE.MINE) { // 지뢰라면
        data[rowIndex][cellIndex] = CODE.QUESTION_MINE; // 지뢰가 있는 물음표로 바꿈
        target.className = 'question'; // 클래스이름을 question으로 바꿈
        target.textContent = '?'; // 박스에 물음표가 보이게 함
    } else if(cellData === CODE.QUESTION_MINE){ // 지뢰가 있는 물음표라면
        data[rowIndex][cellIndex] = CODE.FLAG_MINE;
        target.className = 'flag';
        target.textContent = '!'; // 깃발 대체용
    } else if(cellData === CODE.FLAG_MINE){ // 지뢰가 있는 깃발이라면
        data[rowIndex][cellIndex] = CODE.MINE;
        target.className = '';
        target.textContent = 'X';
    } else if(cellData === CODE.NORMAL) { // 닫힌 칸이라면
        data[rowIndex][cellIndex] = CODE.QUESTION; // 물음표로 바꿈
        target.className = 'question';
        target.textContent = '?';
    } else if(cellData === CODE.QUESTION){ // 물음표라면
        data[rowIndex][cellIndex] = CODE.FLAG;
        target.className = 'flag';
        target.textContent = '!';
    } else if(cellData === CODE.FLAG){ // 깃발이라면
        data[rowIndex][cellIndex] = CODE.NORMAL;
        target.className = '';
        target.textContent = '';
    }
}

/*
(1)--
.?은 옵셔녈 체이닝(Optional chaining)이라는 연산자이다.
이 연산자는 앞에 있는 값이 참이면 뒤 코드를 실행하고,
거짓일 경우 통째로 undefined로 만들어 버린다.
이 연산자를 쓰는 이유는 해당 코드에서 만약 rowIndex + i / 3 값이 -1이 나와버리면
data[-1][cellIndex]가 되게 되고 뒤에 cellIndex를 연산할 때 undefined[cellIndex]가 되어
오류가 발생한다.
그러나 옵셔녈 체이닝을 넣을 경우 undefined?.[cellIndex]가 되고 앞에 있는 값이 거짓이므로
통째로 undefined로 만들어 오류를 방지할 수 있다.
뒤에 [cellIndex]에 옵셔널 체이닝을 안 넣은 이유는 [rowIndex][-1]은 알아서 undefined가 되므로
굳이 보호할 필요가 없기 때문이다.
*/
/*
(2)--
&&은 AND 논리 연산자인데 JS에선
식1 && 식2 로 쓰일 수 있다.
이는 식1이 만약 참일 경우 식2를 실행하며
if문을 줄이기 위한 장치이다.
(3)--
||은 앞에 식이 만약 거짓이라면 제일 뒤에 있는 식을 반환한다.
식1 || 식2 || 식3 에서 만약 식1이 거짓이라면 ||은 식2를 검사하며,
식2 또한 거짓일 경우 제일 뒤에 있는 식(식3)의 값을 반환한다.
만약 식1이 거짓이 아니라면 뒤에 식을 검사하지 않고 바로 식1의 값을 반환한다.
JS에서 논리연산자는 참과 거짓을 판단하는 연산자가 아니며,
연산에 사용된 피연산자 값을 반환해주는 연산자에 불과하다.
출처: https://mynameisdabin.tistory.com/10
*/

function countMine(rowIndex, cellIndex){
    const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
    let mineCount = 0;
    for(let i = 0; i < 9; i++){
        if(i === 4) continue; // 카운트 하려는 위치가 클릭한 위치라면
        mines.includes(data[rowIndex + parseInt(i / 3) - 1]?.[cellIndex + i % 3 - 1]) && mineCount++; // --(1)(2)
    }
    return mineCount;
}

function onLeftClick(event){
    const target = event.target;
    const rowIndex = target.parentNode.rowIndex;
    const cellIndex = target.cellIndex;
    const cellData = data[rowIndex][cellIndex];
    if(cellData === CODE.NORMAL) { // 닫힌 칸이라면
        openAround(rowIndex, cellIndex);
    } else if (cellData === CODE.MINE) { // 지뢰 칸이면
        target.textContent = 'X';
        target.className = 'opened';
        $tbody.removeEventListener('contextmenu', onRightClick);
        $tbody.removeEventListener('click', onLeftClick);
    }
}

let openCount = 0;

function open(rowIndex, cellIndex) {
    if(data[rowIndex]?.[cellIndex] >= CODE.OPENED) return; // 한 번 열었던 칸은 확인을 안해줘서 무한하게 호출되는 재귀를 끊는다.
    const target = $tbody.children[rowIndex]?.children[cellIndex];
    // console.log($tbody.children[rowIndex]?.children);
    if(!target) { // 맵에 벗어날 경우 (undefined라면)
        return;
    }
    const count = countMine(rowIndex, cellIndex);
    target.textContent = count || ''; // --(3)
    target.className = 'opened';
    data[rowIndex][cellIndex] = count;
    console.log(++openCount);
    return count;
}

/*
(4)--
자세한 내용은 아래 링크를 참고
https://n-log.tistory.com/31
*/
/*
이 코드는 브라우저의 최대 호출 스택 크기를 알 수 있다.
let i = 0;
function recurse() {
    i++;
    recurse();
}
try {
    recurse();
} catch (ex) {
    alert('최대 호출 스택 크기는 ' + i + '\nerror: ' + ex);
}
*/
function openAround(rI, cI) { // 주변 칸 모두 여는 함수 (지뢰찾기에서 클릭한 위치의 주변 지뢰가 0개면 자동으로 주변 칸을 모두 열어준다.)
    setTimeout(() => { // 스택 오버플로우를 방지하기 위해 비동기 함수를 사용 --(4)
        const count = open(rI, cI);
        if(count === 0) {
            for(let i = 0; i < 9; i++){
                if(i === 4) continue; // 열려는 위치가 클릭한 위치라면
                openAround(rI + parseInt(i / 3) - 1, cI + i % 3 - 1);
            }
        }
    }, 0);
}