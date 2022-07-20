const $startScreen = document.querySelector('#start-screen');
const $gameMenu = document.querySelector('#game-menu');
const $battleMenu = document.querySelector('#battle-menu');
const $heroName = document.querySelector('#hero-name');
const $heroLevel = document.querySelector('#hero-level');
const $heroHp = document.querySelector('#hero-hp');
const $heroXp = document.querySelector('#hero-xp');
const $heroAtt = document.querySelector('#hero-att');
const $monsterName = document.querySelector('#monster-name');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterAtt = document.querySelector('#monster-att');
const $message = document.querySelector('#message');
const hero = {
    name:'',
    lev:1,
    maxHp: 100,
    hp: 100,
    xp: 0,
    att: 10
}
let monster = null;
const monsterList = [
    {name: '슬라임', hp: 25, att: 10, xp: 10},
    {name: '스켈레톤', hp: 50, att: 15, xp: 20},
    {name: '마왕', hp: 150, att: 35, xp: 50}
]

$startScreen.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target['name-input'].value;
    $startScreen.style.display = 'none';
    $gameMenu.style.display = 'block';
    $heroName.textContent = name;
    $heroLevel.textContent = `${hero.lev}Lev`;
    $heroHp.textContent = `HP: ${hero.hp} / ${hero.maxHp}`;
    $heroXp.textContent = `XP: ${hero.xp}`;
    $heroAtt.textContent = `ATT: ${hero.att}`;
    hero.name = name;
});

/*
(1)-- 깊은 복사
만약
monster = monsterList[0];
라고 쓴다면
monster와 monsterList[0]은 참조 관계가 된다.
만약 monsterList[0].name이 '슬라임'이라고 할 때
참조 관계인 monster를 이용하여
monster.name = '새 이름' 이라고 실행한다면
monsterList[0].name 또란 '새 이름'으로 바뀌게 된다.
즉, 참조관계를 없애고 말 그대로 복사하기 위해 깊은 복사를 하는 것이다.
깊은 복사를 한다면 복사한 객체의 속성이 바뀌어도
복사 되었던 객체의 속성은 바뀌지 않는다.
 */
$gameMenu.addEventListener('submit', event => {
    event.preventDefault();
    const input = event.target['menu-input'].value;
    if(input === '1'){ // 모험
        $gameMenu.style.display = 'none';
        $battleMenu.style.display = 'block';
        // 깊은 복사 (deep copy) --(1)
        monster = JSON.parse(
            JSON.stringify(
                monsterList[
                    Math.floor(Math.random() * monsterList.length)
                ]
            )
        );
        monster.maxHp = monster.hp;
        $monsterName.textContent = monster.name;
        $monsterHp.textContent = `HP: ${monster.hp} / ${monster.maxHp}`;
        $monsterAtt.textContent = `ATT: ${monster.att}`;
    } else if(input === '2'){

    } else if(input === '3'){

    }
})