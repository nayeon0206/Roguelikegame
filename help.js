import chalk from 'chalk';
import readlineSync from 'readline-sync';

export function showHelp() {
    while (true) { // 무한 루프 시작 (돌아가기 선택 시 종료)
        console.clear();
        console.log(chalk.yellowBright('\n도움말 카테고리를 선택하세요.'));
        console.log(chalk.cyan('\n1. 전투 시스템'));
        console.log(chalk.cyan('2. 게임 정보'));
        console.log(chalk.cyan('3. 스테이지 정보'));
        console.log(chalk.cyan('4. 게임 팁'));
        console.log(chalk.cyan('5. 돌아가기'));

        const choice = readlineSync.question(chalk.gray(' (1-5): ')).trim();

        switch (choice) {
            case '1':
                console.log(chalk.greenBright('\n전투 시스템 정보'));
                console.log(chalk.gray('\n==============================================='));            
                console.log(chalk.cyan('\n1. 공격하기, 방어하기, 도망치기 등의 선택이 가능합니다.'));
                console.log(chalk.cyan('2. 스테이지 클리어를 통해 얻는 능력치 증가에는 체력 회복, 최소공격력 증가, 최대공격력 증가, 방어 확률 증가가 있습니다.'));
                console.log(chalk.cyan('3. 방어 확률은 캐릭터의 스탯에 따라 달라집니다.'));
                console.log(chalk.cyan('4. 전투에서 도망치면 어딘가로 이동해 체력을 회복할 수 있습니다.'));
                console.log(chalk.gray('\n==============================================='));            
                break;
            case '2':
                console.log(chalk.greenBright('\n게임 정보'));
                console.log(chalk.gray('\n==============================================='));            
                console.log(chalk.cyan('\n1. 스테이지를 클리어하며 몬스터와 싸우세요.'));
                console.log(chalk.cyan('2. 몬스터 도감을 통해 만난 몬스터를 확인하세요.'));
                console.log(chalk.gray('\n==============================================='));            
                break;
            case '3':
                console.log(chalk.greenBright('\n스테이지 정보'));
                console.log(chalk.gray('\n==============================================='));            
                console.log(chalk.cyan('\n1. 스테이지 1-5: 초보 몬스터가 등장합니다.'));
                console.log(chalk.cyan('2. 스테이지 6-9: 중급 몬스터가 등장합니다.'));
                console.log(chalk.cyan('3. 스테이지 10: 보스 몬스터가 등장합니다!'));
                console.log(chalk.gray('\n==============================================='));            
                break;
            case '4':
                console.log(chalk.greenBright('\n게임 팁'));
                console.log(chalk.gray('\n==============================================='));            
                console.log(chalk.cyan('\n1. 연속 공격은 성공 확률이 낮지만 큰 피해를 줄 수 있습니다.'));
                console.log(chalk.cyan('2. 도망쳤을 경우 체력을 회복하고 새로운 스테이지를 시작하세요.'));
                console.log(chalk.cyan('3. 보스 몬스터와의 전투 전에는 최대 체력을 유지하세요.'));
                console.log(chalk.gray('\n==============================================='));            
                break;
            case '5':
                console.log(chalk.cyanBright('로비로 돌아갑니다.'));
                return; // 루프 종료 및 함수 반환
            default:
                console.log(chalk.red('유효하지 않은 입력입니다.'));
        }

   // Enter를 눌러 계속 진행 (Enter만 허용)
   while (true) {
    console.log(chalk.gray('\nEnter를 눌러 도움말 메뉴로 돌아가세요: '));
    const enterCheck = readlineSync.question();
    if (enterCheck === '') {
        break; // Enter만 눌렀을 때 루프 탈출
    } else {
        console.log(chalk.red('Enter만 눌러주세요!'));
    }
}
}
}
