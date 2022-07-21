const $wrapper = document.querySelector('#wrapper');

// 카드 개수
const total = 12;
// 카드 색
const colors = ['red', 'orange', 'yellow', 'green', 'white', 'pink'];

// 문자열1.concat(문자열2)에서 concat은
// 문자열1과 문자열2를 합친 배열이나 문자열을 반환한다.
let colorCopy = colors.concat(colors);
let shuffled = [];
let clicked = [];
let completed = [];
let clickable = false; // 카드 애니메이션 중 클릭을 막기 위한 변수

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
    cardBack.style.backgroundColor = shuffled[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    return card;
}

function onClickCard() {
    // classList.toggle()은 괄호 안에 있는 class가 있을 경우 삭제하고
    // 괄호 안에 있는 class가 없을 경우 추가해준다.
    // this는 눌러서 이벤트를 감지한 div.card를 나타낸다.
    this.classList.toggle('flipped');
    clicked.push(this); // 클릭한 div.card 가 들어감
    console.log(clicked.length);
    if(clicked.length !== 2){ // 뒤집힌 카드가 두 장이 아니라면 (한 장이라면)
        return;
    }
    const firstBackColor = clicked[0].querySelector('.card-back').style.backgroundColor;
    const secondBackColor = clicked[1].querySelector('.card-back').style.backgroundColor;
    if(firstBackColor === secondBackColor) { // 두 카드의 색상이 같다면
        completed.push(clicked[0]);
        completed.push(clicked[1]);
        clicked = [];
        if(completed.length !== total){
            return;
        }
        setTimeout(() => {
            alert('축하합니다.');
            resetGame();
        }, 1000);
        return;
    }
    clickable = false;
    // 두번째로 뒤집힌 카드를 보여주기 위해 텀을 줌
    setTimeout(() => {
        clicked[0].classList.remove('flipped');
        clicked[1].classList.remove('flipped');
        clicked = [];
        clickable = true;
    }, 500);

}

function startGame() {
    shuffle() // 카드를 섞고 랜덤하게 shuffled에 배열로 저장함
    for(let i = 0; i < total; i++){
        // i를 0부터 total(12)까지 createCard에 전달해주며
        // cardBack의 색깔을 shuffled에 저장되어 있는 랜덤하게 배열된 색깔로
        // 하나씩 지정해주고 반환된 div.card를 변수 card가 받음
        const card = createCard(i);
        // 카드에 클릭 이벤트 주기
        card.addEventListener('click', onClickCard);
        $wrapper.appendChild(card);
    }
}

startGame();

function resetGame() {
    // $wrapper 안에 있던 카드를 다 지움
    $wrapper.innerHTML = '';
    // 처음에 맨 위에서 세팅해준 코드 재실행
    colorCopy = colors.concat(colors);
    shuffle = [];
    completed = [];
    clickable = false;
    startGame();
}

document.querySelectorAll('.card').forEach((card, index) => { // 초반 카드 공개
    setTimeout(() => {
        // Y축을 기준으로 180도 rotate하는 CSS class 추가
        card.classList.add('flipped');
    }, 1000 + 100 * index);
});

setTimeout(() => {
    document.querySelectorAll('.card').forEach(card => { // 카드 숨기기
        card.classList.remove('flipped');
    });
    clickable = true; // 다 뒷면이 보이게 뒤집힌 후 카드 클릭 혀용
}, 5000);

//