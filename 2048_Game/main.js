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

function moveCells(direction) {
    console.log(direction);
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
    console.log(diffX, diffY);
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