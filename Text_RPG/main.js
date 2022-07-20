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
    name: '',
    lev: 1,
    maxHp: 100,
    hp: 100,
    xp: 0,
    att: 10,

}
class Game {
    constructor(name) {
        this.monster = null;
        this.hero = null;
        this.monsterList = [
            { name: '슬라임', hp: 25, att: 10, xp: 10 },
            { name: '스켈레톤', hp: 50, att: 15, xp: 20 },
            { name: '마왕', hp: 150, att: 35, xp: 50 }
        ];
        this.start(name);
    }
    start(name) { // 초기 세팅
        $gameMenu.addEventListener('submit', this.onGameMenuInput);
        $battleMenu.addEventListener('submit', this.onBattleMenuInput);
        this.changeScreen('game');
        this.hero = new Hero(this, name); // hero 설정
        this.updateHeroStat(); // hero stat 표시
    }
    changeScreen(screen) { // 보여질 화면
        if (screen === 'start') {
            $startScreen.style.display = 'block';
            $gameMenu.style.display = 'none';
            $battleMenu.style.display = 'none';
        } else if (screen === 'game') {
            $startScreen.style.display = 'none';
            $gameMenu.style.display = 'block';
            $battleMenu.style.display = 'none';
        } else if (screen === 'battle') {
            $startScreen.style.display = 'none';
            $gameMenu.style.display = 'none';
            $battleMenu.style.display = 'block';
        }
    }
    onGameMenuInput = (event) => {
        event.preventDefault();
        const {hero} = this;
        const input = event.target['menu-input'].value;
        if (input === '1') { // 모험
            this.changeScreen('battle');
            const randomIndex = Math.floor(Math.random() * this.monsterList.length);
            const randomMonster = this.monsterList[randomIndex];
            this.monster = new Monster( // monster 설정
                this,
                randomMonster.name,
                randomMonster.hp,
                randomMonster.att,
                randomMonster.xp
            )
            this.updateMonsterStat(); // monster stat 표시
            this.showMessage(`${this.monster.name} 몬스터와 마주쳤다.`); // 메세지 표시

        } else if (input === '2') { // 휴식
            if(hero.hp >= hero.maxHp){
                this.showMessage('체력이 충분히 올랐습니다.');
            } else {
                hero.hp = hero.maxHp;
                this.updateHeroStat();
            }
        } else if (input === '3') { // 종료
            window.close();
        }
    }
    onBattleMenuInput = (event) => {
        event.preventDefault();
        const {hero, monster} = this; // 설정했었던 hero, monster
        const input = event.target['battle-input'].value;
        if (input === '1') { // 공격
            hero.attack(monster);
            monster.attack(hero);
            if(hero.hp <= 0){
                this.showMessage(`${hero.lev} 레벨에서 전사하셨습니다. 새 캐릭터를 생성하세요.`);
                this.quit();
            } else if (monster.hp <= 0){
                this.showMessage(`몬스터를 잡아 ${monster.xp} 경헙치를 얻었습니다.`);
                hero.getXp(monster.xp);
                this.monster = null;
                this.changeScreen('game');
            } else {
                this.showMessage(`${hero.att}의 데이지를 주고, ${monster.att}의 데미지를 받았다.`)
            }
            this.updateHeroStat();
            this.updateMonsterStat();
        } else if (input === '2') { // 회복
            if(hero.hp < hero.maxHp){
                hero.hp += 20;
                if(hero.hp > hero.maxHp) hero.hp = hero.maxHp;
            }
            monster.attack(hero);
            this.showMessage(`20을 회복하고 ${monster.att}의 데미지를 받았다.`)
            this.updateHeroStat();
        } else if (input === '3') { // 도망
            this.changeScreen('game');
            this.showMessage('');
            this.monster = null;
            this.updateMonsterStat();
        }
    }
    updateHeroStat(){
        const {hero} = this;
        if(hero === null) {
            $heroName.textContent = '';
            $heroLevel.textContent = '';
            $heroHp.textContent = '';
            $heroXp.textContent = '';
            $heroAtt.textContent = '';
            return;
        }
        $heroName.textContent = hero.name;
        $heroLevel.textContent = `${hero.lev}Lev`;
        $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
        $heroXp.textContent = `XP: ${hero.xp}/${15 * hero.lev}`;
        $heroAtt.textContent = `ATT: ${hero.att}`;
    }
    updateMonsterStat(){
        const {monster} = this;
        if(monster === null) {
            $monsterName.textContent = '';
            $monsterHp.textContent = '';
            $monsterAtt.textContent = '';
            return;
        }
        $monsterName.textContent = monster.name;
        $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
        $monsterAtt.textContent = `ATT: ${monster.att}`;
    }
    showMessage(text){
        $message.textContent = text;
    }
    quit(){
        this.hero = null;
        this.monster = null;
        this.updateHeroStat();
        this.updateMonsterStat();
        $gameMenu.removeEventListener('submit', this.onGameMenuInput);
        $battleMenu.removeEventListener('submit', this.onBattleMenuInput);
        this.changeScreen('start');
        game = null;
    }
}

// 부모 클래스
class Unit {
    constructor(game, name, hp, att, xp){
        this.game = game;
        this.name = name;
        this.maxHp = hp;
        this.hp = hp;
        this.att = att;
        this.xp = xp;
    }
    attack(target){
        target.hp -= this.att;
    }
}

// extends: 상속
class Hero extends Unit{
    constructor(game, name) {
        super(game, name, 100, 10, 0);
        this.lev = 1;
    }
    heal(monster) {
        this.hp += 20;
        this.hp -= monster.att;
    }
    getXp(xp){
        this.xp += xp;
        if(this.xp >= this.lev * 15){
            this.xp -= this.lev * 15;
            this.lev += 1;
            this.maxHp += 5;
            this.att += 5;
            this.hp = this.maxHp;
            this.game.showMessage(`레벨이 올랐습니다. 레벨: ${this.lev}`)
        }
    }
}

class Monster extends Unit{
    constructor(game, name, hp, att, xp) {
        super(game, name, hp, att, xp)
    }
}

let game = null;
$startScreen.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target['name-input'].value;
    game = new Game(name);
});