
import chalk from 'chalk';
import readlineSync from 'readline-sync';
import battle from './battle';

class RestingStage {
    constructor(player, stage) {
      this.player = player;
      this.stage = stage;
    }
  
    async rest() {
      console.clear();
      console.log(chalk.cyanBright(`\n${this.stage} 몬스터에게서 도망친 후, 잠시 휴식을 취하고 있습니다...`));
  
      // 플레이어가 쉬면서 체력 20퍼센트를 채움
      this.player.heal(0.2); // 20% 체력 회복
  
      // 이어서 플레이할 수 있도록 엔터 키 입력
      readlineSync.question(`계속하려면 엔터를 누르세요...`);
  
      console.clear();
      console.log(chalk.yellowBright(`\n휴식 후 ${this.stage} 스테이지로 돌아갑니다.`));
    }
  }
  
  export default RestingStage;
  