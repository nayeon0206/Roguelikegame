import chalk from "chalk";

const monsterData = [
  {
    stage: '1-5',
    monsters: [
      { name: '박쥐', hp: '30-60', attack: '3-16' },
      { name: '전갈', hp: '30-60', attack: '3-16' },
      { name: '슬라임', hp: '30-60', attack: '3-16' },
      { name: '뱀', hp: '30-60', attack: '3-16' },
    ],
  },
  {
    stage: '6-8',
    monsters: [
      { name: '늑대', hp: '70-100', attack: '13-22' },
      { name: '도깨비', hp: '70-100', attack: '13-22' },
      { name: '스켈레톤', hp: '70-100', attack: '13-22' },
      { name: '좀비', hp: '70-100', attack: '13-22' },
    ],
  },
  {
    stage: '9',
    monsters: [
      { name: '골렘', hp: '120-150', attack: '19-24' },
      { name: '불사조', hp: '120-150', attack: '19-24' },
      { name: '미이라', hp: '120-150', attack: '19-24' },
      { name: '유령기사', hp: '120-150', attack: '19-24' },
    ],
  },
  {
    stage: '10',
    monsters: [{ name: '드래곤', hp: '300', attack: '21-26' }],
  },
];
  // 데이터 출력 로직 추가
console.clear();
console.log(chalk.yellowBright('\n몬스터 데이터'));
console.log(chalk.cyan('=========================================\n'));

monsterData.forEach((stageData) => {
  console.log(chalk.bold.green(`★ Stage ${stageData.stage}`));
  stageData.monsters.forEach((monster) => {
    console.log(
      `  ${chalk.bold.magenta(monster.name)} - ${chalk.cyanBright(
        `HP: ${monster.hp}, Attack: ${monster.attack}`
      )}`
    );
  });
  console.log(); // 스테이지 간 간격 추가
});

console.log(chalk.cyan('=========================================\n'));

  export default monsterData;
  