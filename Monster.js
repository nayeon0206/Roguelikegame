import chalk from 'chalk';

class Monster {
  constructor(stage) {
    if (stage === 10) {
      // 보스 몬스터
      this.name = '보스 드래곤';
      this.hp = 300;
      this.minAtt = 20;
      this.maxAtt = 40;
    } else {
      // 일반 몬스터
      this.hp = 20 + stage * 10;
      this.minAtt = 3 + stage * 2;
      this.maxAtt = 8 + stage * 2;

      const monsterNames =
        stage < 5
          ? ['박쥐', '두꺼비', '슬라임', '거미']
          : stage < 7
            ? ['좀비', '늑대', '해골 병사', '도깨비']
            : ['드래곤', '골렘', '불사조', '크라켄', '리치'];
      this.name = monsterNames[Math.floor(Math.random() * monsterNames.length)];
    }
  }

  attack() {
    const damage = Math.floor(Math.random() * (this.maxAtt - this.minAtt + 1)) + this.minAtt;
    // console.log(chalk.redBright(`${this.name}이(가) ${damage}의 데미지를 입혔습니다!`));
    return damage;
  }
}

export default Monster;
