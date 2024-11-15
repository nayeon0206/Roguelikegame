
import chalk from 'chalk';
import readlineSync from 'readline-sync';
import battle from './Battle.js';
import Player from './Player.js';

const restingStage = async (player, stage) => {
  console.clear();
  console.log(chalk.cyanBright(`\n" ${stage} " 스테이지에서 도망친 후, 잠시 휴식을 취하고 있습니다...`));
  
  // 플레이어가 쉬면서 체력 20퍼센트를 채움
  player.heal(0.2); // 체력의 20% 회복

  console.log(chalk.green(`체력이 회복되었습니다. 현재 체력: ${player.hp.toFixed(2)} / ${player.maxHp}`));

  // 엔터를 누르면 계속 진행
  readlineSync.question(`\nPress enter to return to battle " ${stage} "stage...`);

  console.clear();
  console.log(chalk.yellowBright(`\n휴식 후 " ${stage} " 스테이지로 돌아왔습니다.`));

  return true; 
};
export default restingStage;
