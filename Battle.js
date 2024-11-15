import chalk from 'chalk';
import readlineSync from 'readline-sync';
import displayStatus from './displayStatus.js';
// import Monster from './Monster.js';

//-----------------------------배틀
const battle = async (stage, player, monster) => {
  let logs = [];

 // 몬스터 등장 메시지
 logs.push(chalk.redBright(`앗, ${monster.name}(이)가 나타났다!!`));

  // 몬스터나 플레이어 둘 중 하나의 체력이 0이 될때 까지 반복해야함
  while (player.hp > 0 && monster.hp > 0) {
    console.clear();
    displayStatus(stage, player, monster);
    logs.forEach((log) => console.log(log));

    console.log(
      chalk.green(`\n1. 공격하기 2. 연속 공격 (25%) 3. 방어하기 (${(player.defendChance * 100).toFixed(0)}%) 4. 도망치기! 돔황챠! (50%) `),
    );
    const choice = readlineSync.question('your choice? ');

    if (choice !== '1' && choice !== '2' && choice !== '3' && choice !== '4') {
      console.log(chalk.red('유효하지 않은 선택입니다! 다시 선택해주세요.'));
      continue;  // 잘못된 입력이 들어오면 다시 반복문 시작
    }

    logs.push(chalk.yellowBright(`\n${choice} 번을 선택하셨습니다.`));

    // 플레이어의 선택에 따라 다음 행동 처리 switch는 case // 실행내용 // break가 끝에 꼭 들어가야함
    switch (choice) {
      // case 1은 기본공격
      case '1': // 공격하기
        const playerDamage = player.attack();
        // -=는 빼기할당
        monster.hp -= playerDamage;
        logs.push(chalk.blue(`${monster.name}에게 ${playerDamage} 만큼 피해를 입혔습니다! `));
        const monsterDamage = monster.attack();
        player.hp -= monsterDamage;
        logs.push(chalk.red(`플레이어가 ${monsterDamage} 만큼의 피해를 입었습니다.`));
        break;

      // case 2는 연속공격을 하게끔하기
      case '2': //연속 공격 (25% 확률) // Math.random()이라는 함수가 0과 1사이에 있는 숫자를 입력 해야 함. 30%라고 30을 넣으면 안됨!!
        if (Math.random() < 0.25) {
          // 0.25 이하일 때 연속 공격 성공
          //첫번째 공격
          const firstAttackDamage = player.attack();
          monster.hp -= firstAttackDamage;
          logs.push(
            chalk.blue(
              `연속 공격 성공!`,
              `\n첫 번째 공격으로 ${monster.name}에게 ${firstAttackDamage} 데미지를 입혔습니다!`,
            ),
          );
          // 두번째 공격
          const secondAttackDamage = player.attack();
          monster.hp -= secondAttackDamage;
          logs.push(
            chalk.blue(
              `두 번째 공격으로 ${monster.name}에게 ${secondAttackDamage} 데미지를 입혔습니다!`,
            ),
          );

        } else {
          // 연속 공격 실패 시 몬스터의 반격
          logs.push(chalk.red(`연속 공격 실패... ${monster.name}의 반격을 받았습니다!`));
          const monsterDamage = monster.attack();
          player.hp -= monsterDamage;
          logs.push(chalk.red(`${monster.name}에게 ${monsterDamage} 데미지를 입었습니다.`));

        }
        break;

      case '3': // 방어하기 (30퍼센트 확률)
        if (Math.random() < player.defendChance) {
          logs.push(chalk.yellow(`\n방어에 성공했습니다!${monster.name}의 공격을 막아냈습니다!!`));
        } else {
          const monsterDamage = monster.attack();
          player.hp -= monsterDamage;
          logs.push(
            chalk.red(`\n방어실패..! ${monster.name}에게 ${monsterDamage} 데미지를 입었습니다....`),
          );
        }
        break;

      case '4': // 도망치기 돔황챠! (50% 확률)
        if (Math.random() < 0.5) {
          console.log(chalk.yellow(`\n${monster.name}에게서 무사히 도망쳤습니다!`));
          return 'escaped'; // 배틀에서 탈출
        } else {
          const monsterDamage = monster.attack();
          player.hp -= monsterDamage;
          logs.push(
            chalk.red(`도망 실패... ${monster.name}의 공격을 받았습니다: ${monsterDamage} 데미지`),
          );
        }
        break;
    }
    
    logs.forEach(log => console.log(log)); // 모든 로그를 출력
  }
  // 배틀 결과 확인..이겼는지 졌는지
  return player.hp > 0 ? 'won' : 'lost';
};

export default battle;
