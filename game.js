import Player from './Player.js';
import Monster from './Monster.js';
import battle from './Battle.js';
import chalk from 'chalk';
import readlineSync from 'readline-sync';
import { start } from './server.js';
import restingStage from './restingStage.js';

/**
 * 게임 종료 및 재시작 여부를 묻는 함수
 */
async function handleGameOver() {
    while (true) {
        const restartChoice = readlineSync.question(chalk.cyan(`\nNew game start? (y / n): `)).trim().toLowerCase();
        if (restartChoice === 'y') {
            console.clear();
            console.log(chalk.greenBright('새 게임을 시작합니다!'));
            return true; // 게임 재시작
        } else if (restartChoice === 'n') {
            console.clear();
            console.log(chalk.cyanBright('게임을 종료하고 메인 화면으로 돌아갑니다.'));
            return false; // 게임 종료
        } else {
            console.log(chalk.red(`유효하지 않은 입력입니다. y 또는 n을 입력해주세요.`));
        }
    }
}

/**
 * 게임 진행 로직
 */
export async function startGame() {
    console.clear();
    let restart = true; // 게임 재시작 여부 플래그

    while (restart) {
        const player = new Player();
        let stage = 1;
        restart = false; // 기본적으로 한 번 실행 후 종료

        while (stage <= 10) {
            console.log(chalk.cyanBright(`\n=== ${stage} 스테이지 시작 ===`));
            const monster = new Monster(stage);
            console.log(chalk.redBright(`\n몬스터 ${monster.name}(이)가 나타났습니다! 준비하세요!`));

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
                restart = await handleGameOver();
                if (!restart) return start(); // 메인 화면으로 이동
                break; // 내부 while 루프 종료
            } else if (battleResult === 'escaped') {
                console.log(chalk.yellowBright(`\n${stage} 스테이지를 도망친 후 잠시 숨을 고릅니다...`));
                await restingStage(player, stage); // 휴식 스테이지 이동

                // 새로운 몬스터 생성
                const newMonster = new Monster(stage);
                console.clear();
                console.log(chalk.yellow(`새로운 몬스터 ${newMonster.name}(이)가 나타납니다!`));

                const newBattleResult = await battle(stage, player, newMonster);
                if (newBattleResult === 'won') {
                    stage++;
                    continue;
                } else if (newBattleResult === 'lost') {
                    restart = await handleGameOver();
                    if (!restart) return start();
                    break;
                }
                continue; // 도망 또는 추가 로직 처리
            }
        }

        if (player.hp > 0 && stage > 10) {
            console.log(chalk.greenBright(`축하합니다 ~! 모든 스테이지를 클리어 했습니다!!`));
            restart = await handleGameOver();
            if (!restart) return start();
        }
    }
}
