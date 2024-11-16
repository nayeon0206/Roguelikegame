//--------------------------플레이어

import chalk from 'chalk';
import restingStage from './restingStage.js';

class Player {
  constructor() {
    // 플레이어의 체력, 최고공격력, 최소공격력, 공격 방어
    this.hp = 100;
    this.maxHp = 120;
    this.minAtt = 10;
    this.maxAtt = 25;
    this.defendChance = 0.3;
  }

  // 도망치면 힐되는 로직 추가 0.2퍼센트
  heal(percentage) {
    const healAmount = this.maxHp * percentage;
    this.hp = Math.min(this.hp + healAmount, this.maxHp); // 최대 체력 한도 내에서 회복
    // console.log(
    //   chalk.green(
    //     `체력이 ${Math.round(healAmount)}만큼 회복되었습니다. 현재 체력: ${Math.round(this.hp)} / ${this.maxHp}`,
    //   ),
    // );
  }

  attack() {
    // 플레이어의 공격
    return Math.floor(Math.random() * (this.maxAtt - this.minAtt + 1)) + this.minAtt;
  }

  increaseRandomStat() {
    const statOptions = ['hp', 'minAtt', 'maxAtt', 'defendChance', 'maxHp'];
    const chosenStat = statOptions[Math.floor(Math.random() * statOptions.length)];
    let rewardMessage = '';

    switch (chosenStat) {
      case 'hp': {
        const prevHp = this.hp; // 이전 체력 저장
        this.heal(0.25); // 체력 25% 회복
        rewardMessage = `체력이 ${this.hp - prevHp} 증가했습니다! 현재 체력: ${this.hp.toFixed(2)} / ${this.maxHp}`;
        break;
      }
      case 'minAtt':
        this.minAtt += 5;
        rewardMessage = `최소 공격력이 5 증가했습니다! 현재 최소 공격력: ${this.minAtt}`;
        break;
      case 'maxAtt':
        this.maxAtt += 7;
        rewardMessage = `최대 공격력이 7 증가했습니다! 현재 최대 공격력: ${this.maxAtt}`;
        break;
        case 'defendChance': {
          const prevDefendChance = Math.round(this.defendChance * 100); // 이전 방어 확률(정수 형태)
          this.defendChance = Math.min(this.defendChance + 0.05, 1); // 방어 확률 증가 (최대 100%)
          const defendIncrease = Math.round(this.defendChance * 100) - prevDefendChance; // 증가량 계산
          rewardMessage = `방어 확률이 ${defendIncrease}% 증가했습니다! 현재 방어 확률: ${Math.round(this.defendChance * 100)}%`;
          break;
        }
      case 'maxHp': {
        if (this.maxHp < 200) {
          const prevMaxHp = this.maxHp;
          const increaseAmount = Math.min(20, 200 - this.maxHp);
          this.maxHp += increaseAmount;
          rewardMessage = `최대 체력이 ${increaseAmount} 증가했습니다! 이전: ${prevMaxHp}, 현재: ${this.maxHp}`;
        } else {
          rewardMessage = `최대 체력이 이미 최대치(200)입니다!`;
        }
        break;
      }
      default:
        rewardMessage = '알 수 없는 능력치가 선택되었습니다.';
        break;
    }
    return rewardMessage;
  }
}
export default Player;
