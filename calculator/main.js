let numOne = '';
let operator = '';
let numTwo = '';

const $operator = document.querySelector('#operator');
const $result = document.querySelector('#result');

function onClickNum(event){
    const num = event.target.textContent;
    if(operator){
        if(!numTwo)
            $result.value = '';
        numTwo += num;
    } else {
        numOne += num;
    }
    $result.value += num;
}

function onClickOp(event){
    const op = event.target.textContent;
    if(numOne){
        operator = op;
        $operator.value = op;
    } else {
        alert('첫번째 숫자를 입력하세요.');
    }
}

for(let i = 0; i <= 9; i++)
    document.querySelector(`#num-${i}`).addEventListener('click', onClickNum);

document.querySelector('#plus').addEventListener('click', onClickOp);
document.querySelector('#minus').addEventListener('click', onClickOp);
document.querySelector('#multiply').addEventListener('click', onClickOp);
document.querySelector('#divide').addEventListener('click', onClickOp);

document.querySelector('#calculate').addEventListener('click', () => {
    if(numTwo){
        switch(operator){
            case '+':
                $result.value = parseInt(numOne) + parseInt(numTwo);
                break;
            case '-':
                $result.value = parseInt(numOne) - parseInt(numTwo);
                break;
            case 'x':
                $result.value = parseInt(numOne) * parseInt(numTwo);
                break;
            case '/':
                $result.value = parseInt(numOne) / parseInt(numTwo);
                break;
            default:
                break;
        }
        operator = '';
        numTwo = '';
        $operator.value = '';
        numOne = $result.value;
    } else {
        alert("두번째 숫자를 입력하세요.");
    }
});

document.querySelector('#clear').addEventListener('click', () => {
    numOne = '';
    operator = '';
    numTwo = '';
    $operator.value = '';
    $result.value = '';
});