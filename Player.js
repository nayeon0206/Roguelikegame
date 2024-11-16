import chalk from 'chalk';

class Player {
  constructor(initialStats = {}) {
    const defaultStats = {
      hp: 100,
      maxHp: 120,
      minAtt: 10,
      maxAtt: 25,
      defendChance: 0.3,
    };

    const stats = { ...defaultStats, ...initialStats }; // 기본값과 사용자 제공값 병합
    this.hp = stats.hp;
    this.maxHp = stats.maxHp;
    this.minAtt = stats.minAtt;
    this.maxAtt = stats.maxAtt;
    this.defendChance = stats.defendChance;
  }

  // 체력 회복 메서드
  heal(percentage) {
    const healAmount = this.maxHp * percentage;
    const newHp = Math.min(this.hp + healAmount, this.maxHp); // 최대 체력 한도 내에서 회복
    const actualHeal = newHp - this.hp; // 실제 회복된 양
    this.hp = newHp;
    return actualHeal; // 회복량 반환
  }

  // 공격 메서드
  attack() {
    const damage = Math.floor(Math.random() * (this.maxAtt - this.minAtt + 1)) + this.minAtt;
    console.log(chalk.greenBright(`플레이어가 ${damage}의 데미지를 입혔습니다!`)); // 공격력 로그 출력
    return damage;
  }

  // 능력치 증가 메서드
  increaseRandomStat() {
    const statOptions = ['hp', 'minAtt', 'maxAtt', 'defendChance', 'maxHp'];
    const chosenStat = statOptions[Math.floor(Math.random() * statOptions.length)];
    let rewardMessage = '';

    switch (chosenStat) {
      case 'hp': {
        const prevHp = this.hp; // 이전 체력 저장
        const actualHeal = this.heal(0.25); // 체력 25% 회복
        rewardMessage = `체력이 ${actualHeal.toFixed(2)} 증가했습니다! 현재 체력: ${this.hp.toFixed(2)} / ${this.maxHp}`;
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
        const prevDefendChance = Math.round(this.defendChance * 100);
        this.defendChance = Math.min(this.defendChance + 0.05, 1);
        const defendIncrease = Math.round(this.defendChance * 100) - prevDefendChance;
        rewardMessage =
          defendIncrease > 0
            ? `방어 확률이 ${defendIncrease}% 증가했습니다! 현재 방어 확률: ${Math.round(this.defendChance * 100)}%`
            : `방어 확률이 이미 최대치(100%)입니다!`;
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
