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