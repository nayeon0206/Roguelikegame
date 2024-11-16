import Player from './Player.js';
import Monster from './Monster.js';
import battle from './Battle.js';
import chalk from 'chalk';
import readlineSync from 'readline-sync';
import { start } from './server.js';
import restingStage from './restingStage.js';

// 게임 종료 및 재시작을 묻는 함수
async function handleGameOver() {
  while (true) {
    console.log(chalk.cyan('\n게임을 계속하시겠습니까?'));
    console.log(chalk.yellow('1. 새 게임 시작'));
    console.log(chalk.yellow('2. 게임 종료'));

    const restartChoice = readlineSync.question(chalk.cyan(' (1 / 2): ')).trim();

    if (restartChoice === '1') {
      console.clear();
      console.log(chalk.greenBright('새 게임을 시작합니다!'));
      stage = 1; // Reset stage
    } else if (restartChoice === '2') {
      console.clear();
      console.log(chalk.cyanBright('게임을 종료하고 메인 화면으로 돌아갑니다.'));
      return false; // 게임 종료
    } else {
      console.log(chalk.red(`유효하지 않은 입력입니다. 1 또는 2를 입력해주세요.`));
    }
  }
}

// 게임 진행 로직
export async function startGame() {
  console.clear();
  let restart = true; // 게임 재시작 여부 플래그

  while (restart) {
    console.log(chalk.cyan(`게임이 시작되었습니다.`));
    const player = new Player();
    let stage = 1;
    restart = false; // 기본적으로 한 번 실행 후 종료

    while (stage <= 10) {
      console.log(chalk.cyan(`현재 스테이지: ${stage}`));

      const monster = new Monster(stage);
      console.log(chalk.yellowBright(`몬스터 생성됨: ${monster.name}`));

      // battle 함수 호출 후 결과에 따라 다음 단계 결정
      const battleResult = await battle(stage, player, monster);

      if (battleResult === 'won') {
        console.log(chalk.gray(`\n=======================================`));
        console.log(chalk.yellowBright(`\n${stage} 스테이지 클리어!!`));

        const rewardMessage = player.increaseRandomStat();
        console.log(chalk.yellowBright(`스테이지 클리어 보상: ${rewardMessage}`));

        while (true) {
          // 엔터를 눌렀을 때만 정상적으로 넘어가게끔 하는 함수
          const input = readlineSync.question(
            chalk.cyan(`\nPress Enter to move to the next stage...`)
          );
          if (input.trim() === '') break; // 빈 입력일 때만 루프 종료
          console.log(chalk.red(`Enter를 눌러주세요.`));
        }
        console.clear();
        stage++; // 다음 스테이지 진행
      } else if (battleResult === 'lost') {
        restart = await handleGameOver();
        if (!restart) return start(); // 메인 화면으로 이동
        break; // 내부 while 루프 종료
      } else if (battleResult === 'escaped') {
        console.log(chalk.yellowBright(`\n${stage} 스테이지를 도망친 후 잠시 숨을 고릅니다...`));
        
        const restResult = await restingStage(player, stage); // 휴식 스테이지 이동
        
        if (restResult === 'continue') {
          console.clear();
          console.log(chalk.yellow(`새로운 몬스터와의 전투를 준비합니다...`));
          continue; // 새로운 전투 시작
        }
        
        // restResult가 'continue'가 아닌 경우 (예: 'quit')
        return start();
      }
    }

    if (player.hp > 0 && stage > 10) {
      console.log(chalk.greenBright(`축하합니다 ~! 모든 스테이지를 클리어 했습니다!!`));
      restart = await handleGameOver();
      if (!restart) return start();
    }
  }
}