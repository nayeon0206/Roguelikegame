import chalk from 'chalk';
import readlineSync from 'readline-sync';
import monsterData from './monsterData.js'; // 몬스터 데이터 임포트

let unlockedMonsters = new Set(); // 잠금 해제된 몬스터 관리

export function unlockMonster(monsterName) {
  unlockedMonsters.add(monsterName); // 몬스터 이름을 잠금 해제
}

export function showMonsterCompendium() {
  console.clear();
  console.log(chalk.yellowBright('\n몬스터 도감에 오신 것을 환영합니다!'));
  console.log(chalk.cyan('=========================================\n'));

  monsterData.forEach((monster, index) => {
    const isUnlocked = unlockedMonsters.has(monster.name); // 잠금 해제 여부 확인
    console.log(
      chalk.cyan(
        `${index + 1}. ${
          isUnlocked
            ? `${monster.name} (HP: ${monster.hp}, 공격력: ${monster.attack}, 스테이지: ${monster.stage})`
            : `?? (HP: ??-??, 공격력: ??-??, 스테이지: ${monster.stage})`
        }`,
      ),
    );
  });

  console.log(chalk.cyan('\n=========================================\n'));

  // Enter만 허용
  while (true) {
    console.log(chalk.gray('\nEnter를 눌러 로비로 돌아가세요: '));
    const enterCheck = readlineSync.question();
    if (enterCheck === '') {
      break; // Enter 입력 시 루프 종료
    } else {
      console.log(chalk.red('Enter만 눌러주세요!'));
    }
  }
}
