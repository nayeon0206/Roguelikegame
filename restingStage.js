import chalk from 'chalk';
import readlineSync from 'readline-sync';

/**
 * 쉬는 스테이지 로직
 */
const restingStage = async (player, stage) => {
  console.clear();
  displayRestingBanner(stage);

  // console.log(chalk.blueBright(`\n숨은 충분히 쉬셨다면, 천천히 앞으로 나아가볼까요?`));
  const healAmount = player.heal(0.2);

  // 회복 결과 출력
  if (healAmount > 0) {
    console.log(chalk.yellowBright(`\n체력이 ${healAmount.toFixed(1)}만큼 회복되었습니다! 더 쉬면 ${stage} 스테이지의 몬스터가 눈치챌지도 모릅니다!`));
  } else {
    console.log(chalk.yellowBright(`\n완벽한 상태입니다! 더 쉬면 몬스터가 먼저 올지도 몰라요!`));
  }

  console.log(chalk.yellowBright(`현재 체력: ${player.hp} / ${player.maxHp}`));
  console.log(chalk.green('\n충분히 쉬셨다면, 이제 천천히 출발해볼까요?'));

  // Enter 입력 대기
  while (true) {
    console.log(chalk.gray('Enter를 눌러 진행할 수 있습니다. : '));
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
  console.log(); // 한칸 띄우기
  console.log(chalk.cyanBright('\n********************************************'));
  console.log(chalk.cyanBright('**                                        **'));
  console.log(chalk.cyanBright('**           휴식하기 스테이지!           **'));
  console.log(chalk.cyanBright('**                                        **'));
  console.log(chalk.cyanBright('********************************************'));
  console.log();
  console.log(chalk.cyanBright(`현재 스테이지: ${stage}`));
  console.log(chalk.cyanBright(`\n천천히 숨을 고르며, 몬스터에게도 준비 시간을 줍시다!`));
}

export default restingStage;
