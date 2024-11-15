//--------------------------몬스터
import chalk from 'chalk';

class Monster {
  constructor(stage) {
    this.hp = 20 + stage * 10;
    this.minAtt = 3 + stage * 2;
    this.maxAtt = 8 + stage * 2;

    const monsterNames =
      stage < 5
        ? ['박쥐', '두꺼비', '슬라임']
        : stage < 7
          ? ['좀비', '늑대', '해골 병사']
          : ['드래곤', '골렘', '불사조'];
    this.name = monsterNames[Math.floor(Math.random() * monsterNames.length)];
  }

  attack() {
    // 몬스터의 공격
    const damage = Math.floor(Math.random() * (this.maxAtt - this.minAtt + 1)) + this.minAtt;
    return damage;
  }
}

export default Monster;
