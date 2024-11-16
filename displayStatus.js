import chalk from "chalk";

function displayStatus(stage, player, monster) {
    if (!stage || !player || !monster) {
        console.log(chalk.redBright('상태를 표시할 데이터가 부족합니다. 확인해주세요.'));
        return;
    }

    const isBossStage = stage === 10;

    console.log(isBossStage
        ? chalk.redBright(`\n======= Boss Stage =======`)
        : chalk.magentaBright(`\n======= Current Status =======`)
    );

    console.log(chalk.cyanBright(`| Stage: `.padEnd(15) + stage));
    console.log(chalk.blueBright(`| 플레이어 체력: `.padEnd(15) + `${player.hp} / ${player.maxHp}`));
    console.log(chalk.blueBright(`| 플레이어 공격력: `.padEnd(15) + `${player.minAtt} ~ ${player.maxAtt}`));
    console.log(chalk.blueBright(`| 방어 확률: `.padEnd(15) + `${(player.defendChance * 100).toFixed(0)}%`));

    console.log(isBossStage
        ? chalk.yellowBright(`\n| 보스 이름: `.padEnd(15) + monster.name)
        : chalk.redBright(`\n| 몬스터 이름: `.padEnd(15) + monster.name)
    );
    console.log(chalk.redBright(`| 몬스터 체력: `.padEnd(15) + monster.hp));
    console.log(chalk.redBright(`| 몬스터 공격력: `.padEnd(15) + `${monster.minAtt} ~ ${monster.maxAtt}`));

    console.log(chalk.magentaBright(`=============================\n`));
}

export default displayStatus;
