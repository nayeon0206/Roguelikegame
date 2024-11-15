import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import { startGame } from './game.js';

function Initial() {
    console.log(chalk.yellow('게임을 준비 중...'));
}

// 로비 화면을 출력하는 함수
function displayLobby() {
    console.clear();

    // 타이틀 텍스트
    console.log(
        chalk.cyan(
            figlet.textSync('RL- Javascript', {
                font: 'Standard',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        )
    );

    // 상단 경계선
    const line = chalk.magentaBright('='.repeat(50));
    console.log(line);

    // 게임 이름
    console.log(chalk.yellowBright.bold('게임에 오신 것을 환영합니다!'));

    // 설명 텍스트
    console.log(chalk.green('옵션을 선택해주세요.'));
    console.log();

    // 옵션들
    console.log(chalk.blueBright('1.') + chalk.white(' 새로운 게임 시작'));
    console.log(chalk.blueBright('2.') + chalk.white(' 업적 확인하기'));
    console.log(chalk.blueBright('3.') + chalk.white(' 도움말'));
    console.log(chalk.blueBright('4.') + chalk.white(' 종료'));

    // 하단 경계선
    console.log(line);

    // 하단 설명
    console.log(chalk.gray('1-4 사이의 수를 입력한 뒤 엔터를 누르세요.'));
}

// 유저 입력을 받아 처리하는 함수
async function handleUserInput() {
    let isRunning = true;

    while (isRunning) {
        const choice = readlineSync.question('Enter a number between 1 - 4 to start the game. : ');

        switch (choice) {
            case '1':
                console.log(chalk.green('게임을 시작합니다.'));
                await startGame();  // 새로운 게임 시작 (비동기 처리)
                break;
            case '2':
                console.log(chalk.yellow('구현 준비중입니다.. 게임을 시작하세요.'));
                break;
            case '3':
                console.log(chalk.green('게임의 주요 시스템 정보!'));
                console.log(chalk.cyan('1. 새로운 게임을 시작하여 도전을 시작하세요.'));
                console.log(chalk.cyan('2. 전투 중에는 공격하거나 방어하는 선택을 할 수 있습니다. 도망을 칠 수도 있습니다!'));
                console.log(chalk.cyan('3. 전투에서 도망치면 어딘가로 이동해 체력을 회복할 수 있습니다 ! !'));
                console.log(chalk.gray('\nEnter를 눌러 메뉴로 돌아가세요.'));
                readlineSync.question();
                break;
            case '4':
                console.log(chalk.red('게임을 종료합니다.'));
                isRunning = false; // 루프 종료
                break;
            default:
                console.log(chalk.red('유효하지 않은 입력값입니다. 다시 입력해주세요.'));
                break;
        }
    }

    console.log(chalk.cyanBright('게임을 종료합니다. 이용해주셔서 감사합니다.'));
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