//--------------------------몬스터
import chalk from "chalk";

class Monster {
    constructor(stage) {
      this.hp = 20 + stage * 10;
      this.minAtt = 3 + stage * 2;
      this.maxAtt = 10 + stage * 2;
  
    const monsterNames = ["박쥐", "늑대", "슬라임", "좀비", "두꺼비", "드래곤"];
    this.name = monsterNames[Math.floor(Math.random() * monsterNames.length)];
    }

    attack() {
      // 몬스터의 공격
      const damage = Math.floor(Math.random() * (this.maxAtt - this.minAtt + 1)) + this.minAtt;
      // console.log(chalk.red(`${this.name}(이)가 ${damage} 데미지를 입혔습니다.`));
      return damage;
    }
  }


  export default Monster