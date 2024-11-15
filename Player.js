//--------------------------플레이어

import chalk from 'chalk';
import restingStage from './restingStage.js';

class Player {
  constructor() {
    // 플레이어의 체력, 최고공격력, 최소공격력, 공격 방어
    this.hp = 100;
    this.minAtt = 10;
    this.maxAtt = 25;
    this.defendChance = 0.3;
  }

  // 도망치면 힐되는 로직 추가 0.2퍼센트
  heal(percentage) {
    const healAmount = Math.floor(this.hp * percentage); // 
    this.hp += healAmount;
    console.log(chalk.green(`휴식 후 체력이 ${healAmount}만큼 회복되었습니다! 현재 체력: ${this.hp}`));
  }

  attack() {
    // 플레이어의 공격
    const damage = Math.floor(Math.random() * (this.maxAtt - this.minAtt + 1)) + this.minAtt;
    // console.log(chalk.yellow(`플레이어가 ${damage} 데미지를 입혔습니다.`));
    return damage;
  }

  increaseRandomStat() {
    const statOptions = ['hp', 'minAtt', 'maxAtt', 'defendChance'];
    const chosenStat = statOptions[Math.floor(Math.random() * statOptions.length)];
    let rewardMessage = '';

    switch (chosenStat) {
      case 'hp':
        this.hp += 25;
        rewardMessage = '체력이 25 증가했습니다!';
        break;
      case 'minAtt':
        this.minAtt += 5;
        rewardMessage = '최소 공격력이 5 증가했습니다!';
        break;
      case 'maxAtt':
        this.maxAtt += 7;
        rewardMessage = '최대 공격력이 7 증가했습니다!';
        break;
      case 'defendChance':
        this.defendChance += 0.05;
        // 방어 확률이 1을 초과하지 않게 하는 함수
        if (this.defendChance > 1) this.defendChance = 1;
        rewardMessage = '방어 확률이 5% 증가했습니다!';
        break;
    }
    return rewardMessage;
  }
}
export default Player;
