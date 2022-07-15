const num = Number(prompt('몇 명이 참가하나요?', 3));
const $btn = document.querySelector('button');
const $inp = document.querySelector('input');
const $word = document.querySelector('#word');
const $ord = document.querySelector('#order');
let word;
let newWord;

const onClickBtn = () => {
    if (!word || word[word.length - 1] === newWord[0]) {
        // console.log(word[word.length - 1], newWord[0]);
        word = newWord;
        $word.textContent = word;
        const order = Number($ord.textContent);
        if(order + 1 > num){
            $ord.textContent = 1;
        } else {
            $ord.textContent = order + 1;
        }
    } else {
        alert('올바르지 않은 단어입니다!');
    }
    $inp.value = '';
    $inp.focus();
};

const onInput = (event) => {
    newWord = event.target.value;
}

$btn.addEventListener('click', onClickBtn);
$inp.addEventListener('input', onInput);