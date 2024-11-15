import Player from './Player.js';
import Monster from './Monster.js';
import battle from './Battle.js';
import chalk from 'chalk';
import readlineSync from 'readline-sync';
import { start } from './server.js';


export async function startGame() {
  console.clear();
  const player = new Player();
  let stage = 1;

  while (stage <= 10) {
    console.log(chalk.cyanBright(`\n${stage} 스테이지에 도전!`));
    const monster = new Monster(stage);

    // battle 함수 호출 후 결과에 따라 다음 단계 결정
    const battleResult = await battle(stage, player, monster);

    if (battleResult === 'won') {
      // 전투 승리 시
      console.log(chalk.blueBright(`\n${stage} 스테이지 클리어!!`));

      const rewardMessage = player.increaseRandomStat();
      console.log(chalk.green(`\n스테이지 클리어 보상: ${rewardMessage}`));
      readlineSync.question(chalk.cyan(`\nPress Enter to move to the next stage...`));
      stage++; // 다음 스테이지 진행
      console.clear();

    } else if (battleResult === 'escaped') {
      // 도망에 성공 시 휴식스테이지 이동 => 그 다음 엔터를 누르면 다음 스테이지에서 전투
      console.log(chalk.yellowBright(`\n${stage} 스테이지를 도망친 후 다음 스테이지로 진행합니다.`));
      console.log(chalk.yellow(`새로운 몬스터가 나타납니다!`));
      stage++; // 도망친 경우에도 스테이지 증가
      continue;

    } else if (battleResult === 'null') {
      // 방어 성공 시
      console.log(chalk.green(`공격 방어에 성공했습니다!`));
      continue; // 현재 몬스터와 전투 지속

    } else {
      // 전투에서 패배 시 (플레이어 사망)
      console.log(chalk.redBright(`플레이어가 사망했습니다..게임이 종료되었습니다.`));
      const restartChoice = readlineSync.question(chalk.blueBright(`\nNew game start? (y / n): `));
      if (restartChoice.toLowerCase() === 'y') {
       return startGame(); // 새 게임 시작

      }else {
        console.clear();
        console.log(chalk.cyanBright('게임을 종료하고 메인 화면으로 돌아갑니다.'));
        return start();
      }
   }

  }
  if (player.hp > 0) {
    console.log(chalk.greenBright(`축하합니다 ~! 모든 스테이지를 클리어 했습니다!!`));
  } else {
    console.log(chalk.redBright(`플레이어가 사망했습니다..게임이 종료되었습니다.`));
    const restartChoice = readlineSync.question('New game start? (y / n): ');
  
    if (restartChoice.toLowerCase() === 'y') {
      startGame(); // 새 게임 시작
    } else {
      console.clear();
      console.log(chalk.cyanBright('게임을 종료하고 메인 화면으로 돌아갑니다.'));
      return start(); // 메인 화면으로 이동
    }
  }
}
