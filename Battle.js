import chalk from 'chalk';
import readlineSync from 'readline-sync';
import displayStatus from './displayStatus.js';
import restingStage from './restingStage.js';

// -----------------------------배틀
const battle = async (stage, player, monster) => {
  let logs = [];
  let isPlayerDead = false; // 플레이어 사망 여부 플래그

  // 몬스터 등장 메시지
  logs.push(chalk.redBright(`앗, ${monster.name}(이)가 나타났다!!`));

  // 몬스터나 플레이어 둘 중 하나의 체력이 0이 될때 까지 반복해야함
  while (player.hp > 0 && monster.hp > 0) {
    console.clear();
    displayStatus(stage, player, monster);
    logs.slice(-5).forEach((log) => console.log(log)); // 마지막 5개의 로그만 표시

    console.log(
      chalk.greenBright(
        `\n1. 공격하기 2. 연속 공격 (25%) 3. 방어하기 (${(player.defendChance * 100).toFixed(0)}%) 4. 도망치기! 돔황챠! (50%) `,
      ),
    );
    const choice = readlineSync.question('your choice? ');

    if (!['1', '2', '3', '4'].includes(choice)) {
      logs.push(chalk.red('유효하지 않은 선택입니다! 다시 선택해주세요.'));
      continue;
    }

    logs.push(chalk.white(`\n${choice} 번을 선택하셨습니다.`));

    // 플레이어의 선택에 따라 다음 행동 처리 switch는 case // 실행내용 // break가 끝에 꼭 들어가야함
    switch (choice) {
      case '1': // 공격하기
        const playerDamage = player.attack();
        monster.hp -= playerDamage; // -=는 빼기할당
        logs.push(chalk.blueBright(`${monster.name}에게 ${playerDamage} 만큼 피해를 입혔습니다! `));

        // 몬스터가 쓰러졌는지 확인
        if (monster.hp <= 0) {
          logs.push(chalk.gray(`\n=======================================`));
          logs.push(chalk.white(`\n${monster.name}에게 마지막으로 ${playerDamage} 데미지를 입혔습니다!`)); // 마지막 데미지 로그
          logs.push(chalk.white(`몬스터 ${monster.name}(을)를 처치했습니다!`));

          console.clear();
          displayStatus(stage, player, monster); // 상태 출력
          logs.forEach((log) => console.log(log)); // 로그 출력
          return 'won'; // 전투 승리 결과 반환
        }

        // 몬스터가 체력이 남아있다면 반격
        const monsterDamage = monster.attack();
        player.hp -= monsterDamage;
        logs.push(chalk.redBright(`플레이어가 ${monsterDamage} 만큼의 피해를 입었습니다.`));

        // 플레이어 사망 확인
        if (player.hp <= 0) {
          logs.push(chalk.redBright(`\n플레이어가 ${monster.name}에게 받은 마지막 데미지는 ${monsterDamage} 입니다.`));
          logs.push(chalk.redBright(`플레이어가 사망했습니다.... 게임이 종료됩니다.`));
          console.clear();
          displayStatus(stage, player, monster); // 상태 출력
          logs.forEach((log) => console.log(log)); // 로그 출력
          return 'lost'; // 전투 패배
        }
        break;

      case '2': //연속 공격 (25% 확률) // Math.random()이라는 함수가 0과 1사이에 있는 숫자를 입력 해야 함. 30%라고 30을 넣으면 안됨!!
        if (Math.random() < 0.25) {
          // 0.25 이하일 때 연속 공격 성공
          //첫번째 공격
          const firstAttackDamage = player.attack();
          monster.hp -= firstAttackDamage;
          logs.push(chalk.blueBright(`연속 공격 성공!`));
          logs.push(
            chalk.blueBright(
              `\n첫 번째 공격으로 ${monster.name}에게 ${firstAttackDamage} 데미지를 입혔습니다!`,
            ),
          );
          // 두번째 공격
          const secondAttackDamage = player.attack();
          monster.hp -= secondAttackDamage;
          logs.push(
            chalk.blueBright(
              `두 번째 공격으로 ${monster.name}에게 ${secondAttackDamage} 데미지를 입혔습니다!`,
            ),
          );
          //몬스터가 쓰러졌는지 확인
          if (monster.hp <= 0) {
            logs.push(chalk.gray(`\n=======================================`));
            logs.push(chalk.white(`\n${monster.name}에게 마지막으로 데미지를 입혔습니다!`)); // 마지막 데미지 로그
            logs.push(chalk.white(`몬스터 ${monster.name}(을)를 처치했습니다!`));
            console.clear();
            displayStatus(stage, player, monster); // 상태 출력
            logs.forEach((log) => console.log(log)); // 로그 출력
            return 'won'; // 전투 승리 결과 반환
          }
        } else {
          // 연속 공격 실패 시 몬스터의 반격
          logs.push(chalk.redBright(`연속 공격 실패... ${monster.name}의 반격을 받았습니다!`));
          const monsterDamage = monster.attack();
          player.hp -= monsterDamage;
          logs.push(chalk.redBright(`${monster.name}에게 ${monsterDamage} 데미지를 입었습니다.`));

          // 플레이어 사망 확인
          if (player.hp <= 0) {
            logs.push(chalk.redBright(`\n플레이어가 ${monster.name}에게 받은 마지막 데미지는 ${monsterDamage} 입니다.`));
            logs.push(chalk.redBright(`플레이어가 사망했습니다.... 게임이 종료됩니다.`));
            console.clear();
            displayStatus(stage, player, monster); // 상태 출력
            logs.forEach((log) => console.log(log)); // 로그 출력
            return 'lost'; // 전투 패배 결과 반환
          }
        }
        break;

      case '3': // 방어하기 (30퍼센트 확률)
        if (Math.random() < player.defendChance) {
          logs.push(chalk.yellow(`\n방어에 성공했습니다!${monster.name}의 공격을 막아냈습니다!!`));
        } else {
          const monsterDamage = monster.attack();
          player.hp -= monsterDamage;
          logs.push(chalk.redBright(`\n방어실패..! ${monster.name}에게 ${monsterDamage} 데미지를 입었습니다....`));
          if (player.hp <= 0) {
            logs.push(chalk.redBright(`\n플레이어가 ${monster.name}에게 받은 마지막 데미지는 ${monsterDamage} 입니다.`));
            logs.push(chalk.redBright(`플레이어가 사망했습니다.... 게임이 종료됩니다.`));
            console.clear();
            displayStatus(stage, player, monster); // 상태 출력
            logs.forEach((log) => console.log(log)); // 로그 출력
            return 'lost'; // 전투 패배 결과 반환
          }
        }
        break;

      case '4': // 도망치기 돔황챠! (50% 확률)
        if (Math.random() < 0.5) {
          console.log(chalk.yellow(`\n${monster.name}에게서 무사히 도망쳤습니다!`));
          await restingStage(player, stage); //쉬는 함수 추가
          console.log(chalk.cyanBright('restingStage 호출 완료. battle로 복귀 중.')); // 디버깅용 추가
          return 'escaped'; //도망친 결과 반환
        } else {
          const monsterDamage = monster.attack();
          player.hp -= monsterDamage;
          logs.push(chalk.redBright(`도망 실패... ${monster.name}의 공격을 받았습니다: ${monsterDamage} 데미지`));

          if (player.hp <= 0) {
            logs.push(
              chalk.redBright(`\n플레이어가 ${monster.name}에게 받은 마지막 데미지는 ${monsterDamage} 입니다.`));
            logs.push(chalk.redBright(`플레이어가 사망했습니다.... 게임이 종료됩니다.`));
            console.clear();
            displayStatus(stage, player, monster); // 상태 출력
            logs.forEach((log) => console.log(log)); // 로그 출력
            return 'lost'; // 전투 패배 결과 반환
          }
        }
        break;
    }
    if (isPlayerDead) break; // 사망 시 반복문 종료
  }
  // 배틀 결과 확인..이겼는지 졌는지
  console.clear();
  // displayStatus(stage, player, monster);
  // logs.forEach((log) => console.log(log)); // 모든 로그 출력
  return player.hp > 0 ? 'won' : 'lost';
};

export default battle;
