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
const mine = 50; // 지뢰 개수
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
    })
}

drawTable();