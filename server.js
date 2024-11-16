import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import { startGame } from './game.js';
import { showMonsterCompendium } from './monsterCompendium.js'; // 몬스터 도감 임포트
import { showHelp } from './help.js'; // 도움말 임포트

function Initial() {
    console.log(chalk.yellow('게임을 준비 중...'));
}

// 로비 화면을 출력하는 함수
function displayLobby() {
    console.clear();

    // 타이틀 텍스트
    console.log(
        chalk.cyan(
            figlet.textSync('Text-Rogue', {
                font: 'Standard',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        )
    );

    // 상단 경계선
    const line = chalk.magentaBright('='.repeat(52));
    console.log(line);

    // 게임 이름
    console.log(chalk.yellowBright.bold('게임에 오신 것을 환영합니다!'));

    // 설명 텍스트
    console.log(chalk.green('\n옵션을 선택해주세요.'));
    console.log();

    // 옵션들
    console.log(chalk.blueBright('1.') + chalk.white(' 새로운 게임 시작'));
    console.log(chalk.blueBright('2.') + chalk.white(' 도움말'));
    console.log(chalk.blueBright('3.') + chalk.white(' 몬스터 도감 보기'));
    console.log(chalk.blueBright('4.') + chalk.white(' 종료'));

    // 하단 경계선
    console.log(line);

    // 하단 설명
    console.log(chalk.gray('\n1-4 사이의 수를 입력한 뒤 엔터를 누르세요!'));
}

// 유저 입력을 받아 처리하는 함수
async function handleUserInput() {
    let isRunning = true;

    while (isRunning) {
        displayLobby();
        const choice = readlineSync.question('Enter a number between 1 - 4 : ');

        switch (choice) {
            case '1':
                await startGame();  // 새로운 게임 시작 (비동기 처리)
                break;
            case '2':
                showHelp(); //도움말 표시 함수 호출
                break;
            case '3':
                showMonsterCompendium(); // 몬스터 도감 표시 함수 호출
                break;
            case '4':
                console.log(chalk.cyanBright('게임을 종료합니다.'));
                isRunning = false; // 루프 종료
                break;
            default:
                console.log(chalk.red('유효하지 않은 입력값입니다. 다시 입력해주세요.'));
                break;
        }
    }

    process.exit(0);
}

// 게임 시작 함수
export async function start() {
    Initial();
    while (true) {
        displayLobby();
        await handleUserInput();
    }
}

// 게임 실행
start(); // 서버 시작