import chalk from 'chalk';
import readlineSync from 'readline-sync';
import displayStatus from './displayStatus.js';
import restingStage from './restingStage.js';
import { unlockMonster } from './monsterCompendium.js';
import { start } from './server.js'; // 로비로 돌아가기 함수 호출

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

  while (player.hp > 0 && monster.hp > 0) {
    console.clear();

    // 현재 상태 출력
    displayStatus(stage, player, monster);
    logs.slice(-5).forEach((log) => console.log(log)); // 최근 5개의 로그만 출력

    console.log(
      chalk.green(
        `\n1. 공격하기 2. 연속 공격 (30%) 3. 방어하기 (${(player.defendChance * 100).toFixed(0)}%) 4. 휴식하기 (50%) 5. 시작 화면으로 도망가기`,
      ),
    );
    const choice = readlineSync.question('Your choice? ').trim();

    if (!['1', '2', '3', '4', '5'].includes(choice)) {
      logs.push(chalk.red('유효하지 않은 선택입니다! 다시 선택해주세요.'));
      continue; // 유효하지 않은 입력 시 루프 계속
    }

    logs.push(chalk.gray(`\n${choice} 번을 선택하셨습니다.`));

    switch (choice) {
      case '1': // 공격하기
        const playerDamage = player.attack();
        monster.hp -= playerDamage;
        logs.push(chalk.blueBright(`\n${monster.name}에게 ${playerDamage} 만큼 피해를 입혔습니다!`));

        if (monster.hp <= 0) {
          unlockMonster(monster.name); // 몬스터 처치 시 도감 등록
          logs.push(chalk.redBright(`\n${monster.name}(을)를 처치했습니다!`));
          logs.push(chalk.gray(`\n=======================================`));
          logs.push(chalk.yellow(`\n${monster.name}(이)가 도감에 등록되었습니다!`));
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
        if (Math.random() < 0.3) {
          const firstAttack = player.attack();
          monster.hp -= firstAttack;
          logs.push(chalk.blueBright(`\n연속 공격 성공!`));
          logs.push(chalk.blueBright(`첫 번째 공격으로 ${firstAttack} 데미지를 입혔습니다.`));

          if (monster.hp <= 0) {
            unlockMonster(monster.name); // 몬스터 처치 시 도감 등록
            logs.push(chalk.redBright(`\n${monster.name}(을)를 처치했습니다!`));
            logs.push(chalk.gray(`\n=======================================`));
            logs.push(chalk.yellow(`\n${monster.name}(이)가 도감에 등록되었습니다!`));
            console.clear();
            displayStatus(stage, player, monster);
            logs.slice(-5).forEach((log) => console.log(log));
            return 'won';
          }

          const secondAttack = player.attack();
          monster.hp -= secondAttack;
          logs.push(chalk.blueBright(`두 번째 공격으로 ${secondAttack} 데미지를 입혔습니다.`));

          if (monster.hp <= 0) {
            unlockMonster(monster.name); // 몬스터 처치 시 도감 등록
            logs.push(chalk.redBright(`\n${monster.name}(을)를 처치했습니다!`));
            logs.push(chalk.gray(`\n=======================================`));
            logs.push(chalk.yellow(`\n${monster.name}(이)가 도감에 등록되었습니다!`));
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
          logs.push(chalk.yellow(`\n방어 성공!! ${monster.name}의 공격을 막아냈습니다!`));
        } else {
          const monsterDamage3 = monster.attack();
          player.hp -= monsterDamage3;
          logs.push(
            chalk.redBright(
              `\n방패를 들었지만... 손에 땀이 많아서 미끄러졌습니다. 그 틈에 ${monster.name}(이)가 ${monsterDamage3} 데미지를 입혔습니다!`,
            ),
          );

          if (player.hp <= 0) {
            console.clear();
            displayStatus(stage, player, monster);
            return handlePlayerDeath(stage, logs, player, monster, monsterDamage3);
          }
        }
        break;

      case '4': // 휴식하기 (50% 확률)
        const escapeSuccess = Math.random() < 0.5;

        if (escapeSuccess) {
          console.log(
            chalk.yellow(
              `\n${monster.name}의 눈을 피해, 안전한 장소에서 잠시 휴식을 취할 수 있었습니다!`,
            ),
          );

          // 쉬는 스테이지 호출
          const restResult = await restingStage(player, stage);

          if (restResult === 'continue') {
            continue; // 도망 성공 후 스테이지 복귀
          }
        } else {
          const monsterDamage4 = monster.attack();
          player.hp -= monsterDamage4;
          logs.push(
            chalk.redBright(
              `\n잠시 숨을 고르려다 ${monster.name}에게 딱 걸렸습니다! ${monsterDamage4}의 데미지를 입었습니다..!`,
            ),
          );

          if (player.hp <= 0) {
            return handlePlayerDeath(stage, logs, player, monster, monsterDamage4);
          }
        }
        break;

      case '5': // 로비로 돌아가기
        logs.push(chalk.cyanBright(`\n안전한 시작 화면으로 재빨리 몸을 숨깁니다...!!!돔황챠!!!`));

        // 잠시 기다렸다가 로비로 돌아가기
        console.clear();
        displayStatus(stage, player, monster); // 상태 출력
        logs.slice(-5).forEach((log) => console.log(log)); // 최근 로그 출력

        await new Promise((resolve) => setTimeout(resolve, 2000)); // 2초 대기
        return start(); // 로비로 돌아가기 함수 호출
    }
  }

  return player.hp > 0 ? 'won' : 'lost'; // 루프 종료 조건에 따라 결과 반환
};

export default battle;
