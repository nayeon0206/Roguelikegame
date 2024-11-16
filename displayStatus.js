import chalk from "chalk";

function displayStatus(stage, player, monster) {
    if (!player || !monster) {
      console.log(chalk.red('상태를 표시할 데이터가 부족합니다. 확인해주세요.'));
      return;
    }
  
    console.log(chalk.magentaBright(`\n======= Current Status =======`));
  
    // 스테이지 정보
    console.log(chalk.cyanBright(`| Stage: ${stage || '??'}`));
  
    // 플레이어 정보
    console.log(chalk.blueBright(`| 플레이어: Player`));
    console.log(chalk.blueBright(`| 플레이어 체력: ${player.hp} / ${player.maxHp}`));
    console.log(chalk.blueBright(`| 플레이어 공격력: ${player.minAtt} ~ ${player.maxAtt}`));
    console.log(chalk.blueBright(`| 방어 확률: ${(player.defendChance * 100).toFixed(0)}%`));
  
    // 몬스터 정보
    console.log(chalk.redBright(`\n| 몬스터: ${monster.name}`));
    console.log(chalk.redBright(`| 몬스터 체력: ${monster.hp}`));
    console.log(chalk.redBright(`| 몬스터 공격력: ${monster.minAtt} ~ ${monster.maxAtt}`));
  
    console.log(chalk.magentaBright(`=============================\n`));
  }
  

export default displayStatus;
