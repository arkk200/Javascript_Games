const $table = document.querySelector('#table');
const $score = document.querySelector('#score');
let data = [];

function startGame() {
    /*
    documentFragment는 메모리 안에만 존재하는 가상의 태그이다
    documentFragment를 쓰는 이유는 태그에 추가하는 횟수가 많아질수록
    성능 문제가 생길 가능성이 높아지기에 가상의 태그에 추가하여
    마지막으로 태그에 가상의 태그를 추가하는 것이다.
    */
    const $fragment = document.createDocumentFragment();
    [1, 2, 3, 4].forEach(() => {
        const rowData = [];
        data.push(rowData);
        const $tr = document.createElement('tr');
        [1, 2, 3, 4].forEach(() => {
            rowData.push(0);
            const $td = document.createElement('td');
            $tr.appendChild($td);
        });
        $fragment.appendChild($tr);
    });
    $table.appendChild($fragment);
    put2ToRandomCell();
    draw();
}

function put2ToRandomCell() {
    const emptyCells = []; // 빈 셀의 좌표를 담는 배열
    data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
            if(!cellData) { // cellData가 0이라면 (비어있다면)
                emptyCells.push([i, j]);
            }
        });
    });
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    data[randomCell[0]][randomCell[1]] = 2;
}

function draw() {
    data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
            const $target = $table.children[i].children[j];
            if(cellData > 0){
                $target.textContent = cellData;
                $target.className = 'color-' + cellData;
            } else {
                $target.textContent = '';
                $target.className = '';
            }
        });
    });
}

startGame();

let isGameEnd = false;

function moveCells(direction) {
    if(isGameEnd) return;
    switch(direction){
        case 'left': {
            const newData = [[], [], [], []];
            data.forEach((rowData, i) => {
                rowData.forEach((cellData, j) => {
                    if(cellData){ // 숫자가 존재한다면
                        const currentRow = newData[i];
                        const prevData = currentRow[currentRow.length - 1];
                        if(prevData === cellData) { // 이전 값과 현재 값이 같으면
                            const score = parseInt($score.textContent); // 현재 점수 값을 가져온 후
                            $score.textContent = score + currentRow[currentRow.length - 1] * 2; // 두 박스의 숫자의 합을 점수에 더함
                            currentRow[currentRow.length - 1] *= -2; // 2, 2, 4, 8에서 왼쪽으로 스와이프할 때 바로 16이 되는 버그를 막기위해 2가 아닌 -2를 곱함
                            // -2를 곱하여 2배로 만들면서 현재의 cellData는 추가하지 않음
                            return;
                        }
                        newData[i].push(cellData);
                    }
                });
            });
            [1, 2, 3, 4].forEach((rowData, i) => {
                [1, 2, 3, 4].forEach((cellData, j) => {
                    data[i][j] = Math.abs(newData[i][j]) || 0; // -2를 곱한 값을 양수로 만들기 위해 Math.abs() 함수를 사용함
                });
            });
        }
            break;
        case 'right': {
            const newData = [[], [], [], []];
            data.forEach((rowData, i) => {
                rowData.forEach((cellData, j) => {
                    if(rowData[3 - j]){ // 왼쪽과 반대로 함
                        const currentRow = newData[i];
                        const prevData = currentRow[currentRow.length - 1];
                        if(prevData === rowData[3 - j]) { // 이전 값과 현재 값이 같으면
                            const score = parseInt($score.textContent); // 현재 점수 값을 가져온 후
                            $score.textContent = score + currentRow[currentRow.length - 1] * 2; // 두 박스의 숫자의 합을 점수에 더함
                            currentRow[currentRow.length - 1] *= -2; // 2, 2, 4, 8에서 왼쪽으로 스와이프할 때 바로 16이 되는 버그를 막기위해 2가 아닌 -2를 곱함
                            // -2를 곱하여 2배로 만들면서 현재의 cellData는 추가하지 않음
                            return;
                        }
                        newData[i].push(rowData[3 - j]);
                    }
                });
            });
            [1, 2, 3, 4].forEach((rowData, i) => {
                [1, 2, 3, 4].forEach((cellData, j) => {
                    data[i][3 - j] = Math.abs(newData[i][j]) || 0; // 반대로 newData에 집어넣었으므로 가져올 때도 반대로 가져옴
                });
            });
        }
            break;
        case 'up': {
            const newData = [[], [], [], []];
            data.forEach((rowData, i) => {
                rowData.forEach((cellData, j) => {
                    if(cellData){ // 숫자가 존재한다면
                        const currentRow = newData[j];
                        const prevData = currentRow[currentRow.length - 1];
                        if(prevData === cellData) { // 이전 값과 현재 값이 같으면
                            const score = parseInt($score.textContent); // 현재 점수 값을 가져온 후
                            $score.textContent = score + currentRow[currentRow.length - 1] * 2; // 두 박스의 숫자의 합을 점수에 더함
                            currentRow[currentRow.length - 1] *= -2; // 2, 2, 4, 8에서 왼쪽으로 스와이프할 때 바로 16이 되는 버그를 막기위해 2가 아닌 -2를 곱함
                            // -2를 곱하여 2배로 만들면서 현재의 cellData는 추가하지 않음
                            return;
                        }
                        newData[j].push(cellData);
                    }
                });
            });
            [1, 2, 3, 4].forEach((rowData, i) => {
                [1, 2, 3, 4].forEach((cellData, j) => {
                    data[j][i] = Math.abs(newData[i][j]) || 0; // -2를 곱한 값을 양수로 만들기 위해 Math.abs() 함수를 사용함
                });
            });
        }
            break;
        case 'down': {
            const newData = [[], [], [], []];
            data.forEach((rowData, i) => {
                rowData.forEach((cellData, j) => {
                    if(data[3 - i][j]){ // 왼쪽과 반대로 함
                        const currentRow = newData[j];
                        const prevData = currentRow[currentRow.length - 1];
                        if(prevData === data[3 - i][j]) { // 이전 값과 현재 값이 같으면
                            const score = parseInt($score.textContent); // 현재 점수 값을 가져온 후
                            $score.textContent = score + currentRow[currentRow.length - 1] * 2; // 두 박스의 숫자의 합을 점수에 더함
                            currentRow[currentRow.length - 1] *= -2; // 2, 2, 4, 8에서 왼쪽으로 스와이프할 때 바로 16이 되는 버그를 막기위해 2가 아닌 -2를 곱함
                            // -2를 곱하여 2배로 만들면서 현재의 cellData는 추가하지 않음
                            return;
                        }
                        newData[j].push(data[3 - i][j]);
                    }
                });
            });
            [1, 2, 3, 4].forEach((rowData, i) => {
                [1, 2, 3, 4].forEach((cellData, j) => {
                    data[3 - j][i] = Math.abs(newData[i][j]) || 0; // 반대로 newData에 집어넣었으므로 가져올 때도 반대로 가져옴
                });
            });
        }
            break;
    }
    if (data.flat().includes(2048)) { // 승리
        draw();
        setTimeout(() => {
            alert(`축하합니다! 점수: ${$score.textContent}점`);
        }, 0);
        isGameEnd = true;
    } else if(!data.flat().includes(0)){ // 0을 포함하고 있지 않다면 (빈칸이 없다면) 패배
        alert(`빈칸이 더는 없습니다. 점수: ${$score.textContent}점`);
        isGameEnd = true;
        return;
    }
    put2ToRandomCell();
    draw();
}

window.addEventListener('keyup', event => {
    if(event.key === 'ArrowUp') moveCells('up');
    if(event.key === 'ArrowDown') moveCells('down');
    if(event.key === 'ArrowLeft') moveCells('left');
    if(event.key === 'ArrowRight') moveCells('right');
});

let startCoord;
window.addEventListener('mousedown', event => {
    startCoord = [event.clientX, event.clientY];
});
window.addEventListener('mouseup', event => {
    const endCoord = [event.clientX, event.clientY];
    const diffX = endCoord[0] - startCoord[0];
    const diffY = endCoord[1] - startCoord[1];
    if(diffX < 0 && Math.abs(diffX) > Math.abs(diffY)){
        moveCells('left');
    } else if(diffX > 0 && Math.abs(diffX) > Math.abs(diffY)){
        moveCells('right');
    } else if(diffY < 0 && Math.abs(diffX) < Math.abs(diffY)){
        moveCells('up');
    } else if(diffY > 0 && Math.abs(diffX) < Math.abs(diffY)){
        moveCells('down');
    }
});