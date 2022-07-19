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