const candidate = Array(45).fill().map((v, i) => i + 1);
const shuffle = [];

// Fisher-Yates Shuffle algorithm
while (candidate.length > 0){
    const random = Math.floor(Math.random() * candidate.length);
    const spliceArray = candidate.splice(random, 1);
    const value = spliceArray[0];
    shuffle.push(value);
}
console.log(shuffle);
const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
// From sort((a, b) => a - b),
// if a - b > 0 : [a, b, ...] => [b, a, ...]
// else if a - b <= 0 : [a, b, ...] => [a, b, ...]
const bonus = shuffle[6];
console.log(winBalls, bonus);

const $result = document.querySelector('#result');

function drawBall(number, $parent){
    const $ball = document.createElement('div');
    $ball.className = 'ball';
    $ball.textContent = number;
    $parent.appendChild($ball);
}

// for (var i = 0; i < winBalls.length; i++){
//     // setTimeout(callbackFunction, ms)
//     setTimeout(() => {
//         console.log(i) // 6, 6, 6, 6, 6, 6
//         drawBall(winBalls[i], $result);
//     }, 1000 * (i + 1));
// }
// var vs let
for (let i = 0; i < winBalls.length; i++){
    // setTimeout(callbackFunction, ms)
    setTimeout(() => {
        console.log(i) // 0, 1, 2, 3, 4, 5
        drawBall(winBalls[i], $result);
    }, 1000 * (i + 1));
}
/* var은 함수 스코프로 함수를 경계로 접근 여부가 달라진다.
반대로 let은 블록 스코프로 블록을 경계로 접근 여부가 달라진다.
예)
if(true){var a = 1;}
console.log(a)는 정상 출력 된다.
if(true){let a = 1;}
console.log(a)에서 let a는 블록{}안에 있으므로 출력되지 않는다.

for(var i = 0;...) 에서 setTimeout()에서 콜백함수는
1000 * (i + 1)ms 뒤에 실행된다.

그러나 for문은 이 시간보다 매우 빠른 속도로 반복하기에
setTimeout()안에 콜백함수가 실행되기도 전에 i값은 6이 되버린다.

실행 순서
1. if i = 0 : setTimeout(callback0, 1000)
2. if i = 1 : setTimeout(callback1, 2000)
3. if i = 2 : setTimeout(callback2, 3000)
4. if i = 3 : setTimeout(callback3, 4000)
5. if i = 4 : setTimeout(callback4, 5000)
6. if i = 5 : setTimeout(callback5, 6000)
7. i = 6
8. after 1s callback0(i = 6) winballs[6] == undefined
9. after 1s callback1(i = 6)
10. after 1s callback2(i = 6)
11. after 1s callback3(i = 6)
12. after 1s callback4(i = 6)
13. after 1s callback5(i = 6)
 */


const $bonus = document.querySelector('#bonus');
setTimeout(() => {
    drawBall(bonus, $bonus);
}, 7000);