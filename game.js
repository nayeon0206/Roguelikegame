import Player from './Player.js';
import Monster from './Monster.js';
import battle from './Battle.js';
import chalk from 'chalk';
import readlineSync from 'readline-sync';
import { start } from './server.js';
import restingStage from './restingStage.js';

export async function startGame() {
  console.clear();
  let restart = true; // 게임 재시작 여부 플래그

  while (restart) {
    const player = new Player();
    let stage = 1;
    restart = false; // 기본적으로 한 번 실행 후 종료

    while (stage <= 10) {
      const monster = new Monster(stage);

      // battle 함수 호출 후 결과에 따라 다음 단계 결정
      const battleResult = await battle(stage, player, monster);

      if (battleResult === 'won') {
        console.log(chalk.gray(`\n=======================================`));
        console.log(chalk.yellowBright(`\n${stage} 스테이지 클리어!!`));

        const rewardMessage = player.increaseRandomStat();
        console.log(chalk.yellowBright(`스테이지 클리어 보상: ${rewardMessage}`));

        while (true) { // 엔터를 눌렀을 때만 정상적으로 넘어가게끔 하는 함수
          const input = readlineSync.question(chalk.cyan(`\nPress Enter to move to the next stage...`));
          if (input.trim() === '') break; // 빈 입력일 때만 루프 종료
          console.log(chalk.red(`Enter를 눌러주세요.`));
        }
        console.clear();
        stage++; // 다음 스테이지 진행

      } else if (battleResult === 'lost') {
        // 전투에서 패배 시 (플레이어 사망)
        // console.log(chalk.redBright(`\n플레이어가 사망했습니다.. 게임이 종료됩니다.`));
        const restartChoice = readlineSync.question(chalk.cyan(`\nNew game start? (y / n): `));
        if (restartChoice.toLowerCase() === 'y') {
          restart = true; // 게임 재시작 플래그 설정
        } else {
          console.clear();
          console.log(chalk.cyanBright('게임을 종료하고 메인 화면으로 돌아갑니다.'));
          return start(); // 메인 화면으로 이동
        }
        break; // 내부 while 루프 종료
      } else if (battleResult === 'escaped') {
        console.log(chalk.yellowBright(`\n${stage} 스테이지를 도망친 후 잠시 숨을 고릅니다...`));
        await restingStage(player, stage); // 휴식 스테이지 이동
        stage++; // 도망친 경우에도 스테이지 증가
        continue;
      }
    }

    if (player.hp > 0 && stage > 10) {
      console.log(chalk.greenBright(`축하합니다 ~! 모든 스테이지를 클리어 했습니다!!`));
      const restartChoice = readlineSync.question(chalk.cyan(`\nNew game start? (y / n): `));
      if (restartChoice.toLowerCase() === 'y') {
        restart = true; // 게임 재시작 플래그 설정
      } else {
        console.clear();
        console.log(chalk.cyanBright('게임을 종료하고 메인 화면으로 돌아갑니다.'));
        return start();
      }
    }
  }
}
