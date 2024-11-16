import chalk from 'chalk';
import readlineSync from 'readline-sync';
import battle from './Battle.js';
import Player from './Player.js';

const restingStage = async (player, stage) => {
  console.clear();

// 휴식 스테이지 상단 그래픽 출력
displayRestingBanner(stage);

  // 플레이어가 쉬면서 체력 20퍼센트를 채움
  const healAmount = Math.min(player.maxHp * 0.2, 200 - player.hp); // 회복량 계산 (200을 초과하지 않도록)
  const prevHp = player.hp; // 회복 전 체력 저장
  player.heal(0.2); // 체력 회복

  // 회복량 및 상태 출력
  if (healAmount > 0) {
    console.log(chalk.green(`\n체력이 ${healAmount.toFixed(2)}만큼 회복되었습니다!`));
  } else {
    console.log(chalk.yellow(`\n현재 체력이 이미 최대치(200)입니다. 추가 회복이 필요하지 않습니다.`));
  }
  console.log(chalk.blueBright(`회복 전 체력: ${prevHp.toFixed(2)} / ${player.maxHp}`));
  console.log(chalk.blueBright(`현재 체력: ${player.hp.toFixed(2)} / ${player.maxHp}`));

  // 엔터를 누르면 계속 진행
  while (true) {
    const input = readlineSync.question(`\nPress Enter to return to battle...`);
    if (input.trim() === '') break; //빈 입력일 때만 루프 종료
    console.log(chalk.red(`Enter를 눌러주세요.`));
  }
  console.clear();
};

function displayRestingBanner(stage) {
  const banner = `
${chalk.cyanBright('********************************************')}
${chalk.cyanBright('**                                        **')}
${chalk.cyanBright('**           쉬어가는 스테이지!           **')}
${chalk.cyanBright('**                                        **')}
${chalk.cyanBright('********************************************')}
  `;

  console.log(banner);
  console.log(chalk.cyanBright(`현재 스테이지: ${stage}`));
  console.log(chalk.cyanBright('체력을 회복하며 잠시 숨을 고르세요...'));
}


export default restingStage;
