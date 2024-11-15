import chalk from "chalk";

// --------------------------displayStatus
function displayStatus(stage, player, monster) {
    console.log(chalk.magentaBright(`\n=== Current Status ===`));
    console.log(
      chalk.cyanBright(`| Stage: ${stage} `) +
        chalk.blueBright(`\n| 플레이어: Player |`, `| 플레이어 체력: ${player.hp} |`, `| 공격력: ${player.minAtt}~${player.maxAtt}|`) +
        chalk.redBright(`\n| 몬스터: ${monster.name} |`, ` | 몬스터 체력: ${monster.hp} |`, `| 공격력: ${monster.minAtt}~${monster.maxAtt} |`));
    console.log(chalk.magentaBright(`=====================\n`));
  }

  export default displayStatus