const $wrapper = document.querySelector('#wrapper');

// 카드 개수
const total = 12;
// 카드 색
const colors = ['red', 'orange', 'yellow', 'green', 'white', 'pink'];

// 문자열1.concat(문자열2)에서 concat은
// 문자열1과 문자열2를 합친 배열이나 문자열을 반환한다.
let colorCopy = colors.concat(colors);
let shuffled = [];

function shuffle(){
    for (let i = 0; colorCopy.length > 0; i++){
        const randomIndex = Math.floor(Math.random() * colorCopy.length);
        // splice는 splice가 배열에서 삭제한 요소를 배열형태로 반환한다.
        // 즉 shuffled에는 두 개씩 있는 색깔 이름들이 랜덤하게 들어간다.
        shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
    }
}

function createCard(i){
    const card = document.createElement('div');
    card.className = 'card';
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.style.backgroundColor = shuffle[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    return card;
}

function startGame() {
    shuffle() // 카드를 섞고 랜덤하게 shuffled에 배열로 저장함
    for(let i = 0; i < total; i++){
        // i를 0부터 total(12)까지 createCard에 전달해주며
        // cardBack의 색깔을 shuffled에 저장되어 있는 랜덤하게 배열된 색깔로
        // 하나씩 지정해주고 반환된 card div를 변수 card가 받음
        const card = createCard(i);
        $wrapper.appendChild(card);
    }
}
startGame();