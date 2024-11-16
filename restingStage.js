import chalk from 'chalk';
import readlineSync from 'readline-sync';

/**
 * 쉬는 스테이지 로직
 */
const restingStage = async (player, stage) => {
  console.clear();
  displayRestingBanner(stage);

  console.log(chalk.cyan(`\n체력 회복을 진행합니다.`));
  const healAmount = player.heal(0.2);

  // 회복 결과 출력
  if (healAmount > 0) {
    console.log(chalk.yellowBright(`\n체력이 ${healAmount.toFixed(1)}만큼 회복되었습니다!`));
  } else {
    console.log(chalk.yellow(`\n현재 체력이 이미 최대치(${player.maxHp})입니다.`));
  }

  console.log(chalk.yellowBright(`현재 체력: ${player.hp} / ${player.maxHp}`));
  console.log(chalk.cyanBright('\n스테이지로 돌아갑니다...'));

  // Enter 입력 대기
  while (true) {
    console.log(chalk.gray('\nEnter를 눌러 스테이지로 돌아가세요: '));
    const enterCheck = readlineSync.question();
    if (enterCheck === '') {
      break; // Enter 입력 시 루프 종료
    } else {
      console.log(chalk.red('Enter만 눌러주세요!'));
    }
  }

  return 'continue';
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
