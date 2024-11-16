import chalk from 'chalk';
import readlineSync from 'readline-sync';
import displayStatus from './displayStatus.js';
import restingStage from './restingStage.js';
import Monster from './Monster.js';
import { unlockMonster } from './monsterCompendium.js';

// 사망 처리 로직 함수
const handlePlayerDeath = (stage, logs, player, monster, monsterDamage) => {
  logs.push(
    chalk.redBright(
      `\n플레이어가 ${monster.name}에게 받은 마지막 데미지는 ${monsterDamage} 입니다.`,
    ),
  );
  logs.push(chalk.redBright(`플레이어가 사망했습니다.... 게임이 종료됩니다.`));

  console.clear();
  displayStatus(stage, player, monster);
  logs.slice(-5).forEach((log) => console.log(log));

  return 'lost'; // 즉시 전투 종료
};

// 전투 메인 함수
const battle = async (stage, player, monster) => {
  let logs = []; // 전투 로그 초기화

  logs.push(chalk.redBright(`\n${monster.name}(이)가 나타났다!`));
  unlockMonster(monster.name); // 몬스터 도감 등록

  while (player.hp > 0 && monster.hp > 0) {
    console.clear();

    // 현재 상태 출력
    displayStatus(stage, player, monster);
    logs.slice(-5).forEach((log) => console.log(log)); // 최근 5개의 로그만 출력

    console.log(
      chalk.green(
        `\n1. 공격하기 2. 연속 공격 (25%) 3. 방어하기 (${(player.defendChance * 100).toFixed(0)}%) 4. 도망치기 (50%)`,
      ),
    );
    const choice = readlineSync.question('Your choice? ').trim();

    if (!['1', '2', '3', '4'].includes(choice)) {
      logs.push(chalk.red('유효하지 않은 선택입니다! 다시 선택해주세요.'));
      continue; // 유효하지 않은 입력 시 루프 계속
    }

    logs.push(chalk.white(`\n${choice} 번을 선택하셨습니다.`));

    switch (choice) {
      case '1': // 공격하기
        const playerDamage = player.attack();
        monster.hp -= playerDamage;
        logs.push(chalk.blueBright(`${monster.name}에게 ${playerDamage} 만큼 피해를 입혔습니다!`));

        if (monster.hp <= 0) {
          logs.push(chalk.greenBright(`\n${monster.name}(을)를 처치했습니다!`));
          console.clear();
          displayStatus(stage, player, monster); // 전투 종료 후 상태 출력
          logs.slice(-5).forEach((log) => console.log(log)); // 최근 5개의 로그만 출력
          return 'won'; // 즉시 전투 종료
        }

        const monsterDamage1 = monster.attack();
        player.hp -= monsterDamage1;
        logs.push(chalk.redBright(`플레이어가 ${monsterDamage1} 만큼의 피해를 입었습니다.`));

        if (player.hp <= 0) {
          console.clear();
          displayStatus(stage, player, monster); // 사망 시 상태 출력
          return handlePlayerDeath(stage, logs, player, monster, monsterDamage1); // 사망 처리
        }
        break;

      case '2': // 연속 공격 (25% 확률)
        if (Math.random() < 0.25) {
          const firstAttack = player.attack();
          monster.hp -= firstAttack;
          logs.push(
            chalk.blueBright(
              `\n연속 공격 성공! 첫 번째 공격으로 ${firstAttack} 데미지를 입혔습니다.`,
            ),
          );

          if (monster.hp <= 0) {
            logs.push(chalk.greenBright(`\n${monster.name}(을)를 처치했습니다!`));
            console.clear();
            displayStatus(stage, player, monster);
            logs.slice(-5).forEach((log) => console.log(log));
            return 'won';
          }

          const secondAttack = player.attack();
          monster.hp -= secondAttack;
          logs.push(chalk.blueBright(`두 번째 공격으로 ${secondAttack} 데미지를 입혔습니다.`));

          if (monster.hp <= 0) {
            logs.push(chalk.greenBright(`\n${monster.name}(을)를 처치했습니다!`));
            console.clear();
            displayStatus(stage, player, monster);
            logs.slice(-5).forEach((log) => console.log(log));
            return 'won';
          }
        } else {
          logs.push(chalk.redBright(`\n연속 공격 실패... ${monster.name}의 반격을 받습니다.`));
          const monsterDamage2 = monster.attack();
          player.hp -= monsterDamage2;
          logs.push(chalk.redBright(`${monster.name}에게 ${monsterDamage2} 데미지를 입었습니다.`));

          if (player.hp <= 0) {
            console.clear();
            displayStatus(stage, player, monster);
            return handlePlayerDeath(stage, logs, player, monster, monsterDamage2);
          }
        }
        break;

      case '3': // 방어하기 (40%확률)
        if (Math.random() < player.defendChance) {
          logs.push(chalk.yellow(`\n방어 성공! ${monster.name}의 공격을 막아냈습니다!`));
        } else {
          const monsterDamage3 = monster.attack();
          player.hp -= monsterDamage3;
          logs.push(
            chalk.redBright(
              `\n방어 실패..! ${monster.name}에게 ${monsterDamage3} 데미지를 입었습니다.`,
            ),
          );

          if (player.hp <= 0) {
            console.clear();
            displayStatus(stage, player, monster);
            return handlePlayerDeath(stage, logs, player, monster, monsterDamage3);
          }
        }
        break;

      case '4': // 도망치기 (50% 확률)
        if (Math.random() < 0.5) {
          console.log(chalk.yellow(`\n${monster.name}에게서 무사히 도망쳤습니다!`));
          const restResult = await restingStage(player, stage);

          if (restResult === 'continue') {
            continue;
          } else if (restResult === 'quit') {
            return 'escaped';
          }
        } else {
          const monsterDamage4 = monster.attack();
          player.hp -= monsterDamage4;
          logs.push(
            chalk.redBright(
              `도망 실패... ${monster.name}의 공격을 받았습니다: ${monsterDamage4} 데미지`,
            ),
          );

          if (player.hp <= 0) {
            return handlePlayerDeath(stage, logs, player, monster, monsterDamage4);
          }
        }
        break;
    }
  }

  return player.hp > 0 ? 'won' : 'lost'; // 루프 종료 조건에 따라 결과 반환
};

export default battle;
