import chalk from 'chalk';
import readlineSync from 'readline-sync';
import monsterData from './monsterData.js'; // 몬스터 데이터 임포트

let unlockedMonsters = {}; // 잠금 해제된 몬스터 관리 (객체)

/**
 * 몬스터 잠금 해제
 * @param {string} monsterName - 잠금 해제할 몬스터 이름
 */
export function unlockMonster(monsterName) {
  unlockedMonsters[monsterName] = true; // 몬스터 이름을 잠금 해제
}

/**
 * 몬스터 도감 출력
 */
export function showMonsterCompendium() {
  console.clear();
  console.log(chalk.yellowBright('\n몬스터 도감에 오신 것을 환영합니다!'));
  console.log(chalk.cyan('=========================================\n'));

  // 도감 데이터 출력
  monsterData.forEach((stageData) => {
    console.log(chalk.bold.green(`★ Stage ${stageData.stage}`));
    stageData.monsters.forEach((monster) => {
      const isUnlocked = unlockedMonsters[monster.name] || false; // 잠금 해제 여부 확인
      console.log(
        isUnlocked
          ? chalk.cyanBright(
              `${monster.name} (HP: ${monster.hp}, 최소 공격력: ${monster.minAttack}, 최대 공격력:${monster.maxAttack} )`,
            )
          : chalk.gray(`?? (HP: ??-??, 공격력: ??-??)`),
      );
    });
    console.log(chalk.gray('-----------------------------------------')); // 스테이지 구분선
  });

  console.log(chalk.cyan('\n=========================================\n'));

  // 도감 상태 안내
  const unlockedCount = Object.keys(unlockedMonsters).length;
  const totalMonsters = monsterData.reduce(
    (count, stageData) => count + stageData.monsters.length,
    0,
  );
  console.log(
    chalk.blueBright(`현재 잠금 해제된 몬스터: ${unlockedCount} / ${totalMonsters}`),
  );

  // Enter만 허용
  let isValidInput = false;
  while (!isValidInput) {
    console.log(chalk.gray('\nEnter를 눌러 로비로 돌아가세요: '));
    const enterCheck = readlineSync.question();
    if (enterCheck === '') {
      isValidInput = true; // Enter 입력 시 루프 종료
    } else {
      console.log(chalk.red('Enter만 눌러주세요!'));
    }
  }
}
