import chalk from 'chalk';
import readlineSync from 'readline-sync';
import { start } from './server.js';

/**
 * 쉬는 스테이지 로직
 */
const restingStage = async (player, stage) => {
  console.clear();

  // 쉬는 스테이지 상단 배너 출력
  displayRestingBanner(stage);

  let loopActive = true; // 루프 활성화 상태

  while (loopActive) {
    console.log(chalk.cyan(`\n어떻게 하시겠습니까?`));
    console.log(chalk.yellowBright(`1. 체력 회복 후 스테이지로 돌아가기`));
    console.log(chalk.yellowBright(`2. 로비로 돌아가기`));

    const choice = readlineSync.question(chalk.yellowBright(`(1 / 2): `)).trim();

    if (choice === '1') {
      console.clear();

      // 플레이어 체력 회복
      const healAmount = Math.min(player.maxHp * 0.2, player.maxHp - player.hp);
      const prevHp = player.hp;
      player.heal(0.2);

      // 회복량 및 상태 출력
      if (healAmount > 0) {
        console.log(chalk.green(`\n체력이 ${healAmount.toFixed(1)}만큼 회복되었습니다!`));
      } else {
        console.log(chalk.yellow(`\n현재 체력이 이미 최대치(${player.maxHp})입니다. 추가 회복이 필요하지 않습니다.`));
      }
      console.log(chalk.blueBright(`회복 전 체력: ${prevHp.toFixed(1)} / ${player.maxHp}`));
      console.log(chalk.blueBright(`현재 체력: ${player.hp.toFixed(1)} / ${player.maxHp}`));
      console.log(chalk.cyanBright('스테이지로 돌아갑니다...'));
      loopActive = false; // 루프 종료
      return 'continue'; // 스테이지로 돌아가기
    } else if (choice === '2') {
      console.clear();
      console.log(chalk.cyanBright('로비로 돌아갑니다...'));
      loopActive = false; // 루프 종료
      return 'quit'; // 로비로 돌아가기
    } else {
      console.log(chalk.red(`유효하지 않은 선택입니다. 다시 입력해주세요.`));
    }
  }
};


/**
 * 쉬는 스테이지 상단 배너 출력
 */
function displayRestingBanner(stage) {
  console.log(chalk.cyanBright('********************************************'));
  console.log(chalk.cyanBright('**                                        **'));
  console.log(chalk.cyanBright('**           쉬어가는 스테이지!           **'));
  console.log(chalk.cyanBright('**                                        **'));
  console.log(chalk.cyanBright('********************************************'));
  console.log();
  console.log(chalk.cyanBright(`현재 스테이지: ${stage}`));
  console.log(chalk.cyanBright('체력을 회복하며 잠시 숨을 고르세요...'));

}

export default restingStage;