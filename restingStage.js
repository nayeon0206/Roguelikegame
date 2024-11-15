import chalk from 'chalk';
import readlineSync from 'readline-sync';
import battle from './Battle.js';
import Player from './Player.js';

const restingStage = async (player, stage) => {
  console.clear();
  console.log(
    chalk.cyanBright(`\n" ${stage} " 스테이지에서 도망친 후, 잠시 휴식을 취하고 있습니다...`),
  );

  // 플레이어가 쉬면서 체력 20퍼센트를 채움
  const healAmount = Math.min(player.maxHp * 0.2, 200 - player.hp); // 회복량 계산 (200을 초과하지 않도록)
  const prevHp = player.hp; // 회복 전 체력 저장
  player.heal(0.2); // 체력 회복

  // 회복량 및 상태 출력
  if (healAmount > 0) {
    console.log(chalk.green(`체력이 ${healAmount.toFixed(2)}만큼 회복되었습니다!`));
    console.log(chalk.blueBright(`회복 전 체력: ${prevHp.toFixed(2)} / ${player.maxHp}`));
    console.log(chalk.blueBright(`현재 체력: ${player.hp.toFixed(2)} / ${player.maxHp}`));
  } else {
    console.log(chalk.yellow(`현재 체력이 이미 최대치(200)입니다. 추가 회복이 필요하지 않습니다.`));
  }

  // 엔터를 누르면 계속 진행
  while (true) {
    // 엔터를 눌렀을때만 입력되게 하는 함수
    const input = readlineSync.question(`\nPress Enter to return to battle...`);
    if (input.trim() === '') break; // 빈 입력일 때만 루프 종료
    console.log(chalk.red(`Enter를 눌러주세요.`));
  }

  console.clear();
  console.log(chalk.yellowBright(`\n휴식 후 " ${stage} " 스테이지로 돌아왔습니다.`));

  return true;
};
export default restingStage;
