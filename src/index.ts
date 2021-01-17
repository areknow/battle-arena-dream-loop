import yesno from 'yesno';

let stamina: number;
let panic: number;
let enemyHealth: number;
let rollCount: number;
let bodyCount: number;

const dice = [
  '+-------+\r\n|       |\r\n|   ●   |\r\n|       |\r\n+-------+',
  '+-------+\r\n| ●     |\r\n|       |\r\n|     ● |\r\n+-------+',
  '+-------+\r\n| ●     |\r\n|   ●   |\r\n|     ● |\r\n+-------+',
  '+-------+\r\n| ●   ● |\r\n|       |\r\n| ●   ● |\r\n+-------+',
  '+-------+\r\n| ●   ● |\r\n|   ●   |\r\n| ●   ● |\r\n+-------+',
  '+-------+\r\n| ●   ● |\r\n| ●   ● |\r\n| ●   ● |\r\n+-------+'
];

const reset = () => {
  stamina = 10;
  panic = 10;
  enemyHealth = 10;
  rollCount = 0;
  bodyCount = 0;
};

const printStats = () => {
  console.log(`+------------------+----+`);
  console.log(`| YOUR STAMINA     | ${numberFormat(stamina)} |`);
  console.log(`| YOUR PANIC LEVEL | ${numberFormat(panic)} |`);
  console.log(`| REMAINING ROLLS  | ${numberFormat(rollCount)} |`);
  console.log(`+------------------+----+`);
  console.log(`| ENEMY HEALTH     | ${numberFormat(enemyHealth)} |`);
  console.log(`| ENEMIES KILLED   | ${numberFormat(bodyCount)} |`);
  console.log(`+------------------+----+\n`);
};

const numberFormat = (number: number) => {
  if (number < 0) {
    return ` 0`;
  } else {
    if (number < 10) {
      return ` ${number}`;
    } else {
      return number;
    }
  }
};

const rollDice = () => {
  return Math.floor(Math.random() * 6) + 1;
};

const gameTurn = () => {
  const roll = rollDice();
  console.log(`\n${dice[roll - 1]}`);
  console.log(`\nYou roll a ${roll}.`);
  switch (roll) {
    case 1:
      console.log(`The user gets health, and their panic level increases by 2.\n`);
      panic += 2;
      break;
    case 2:
      console.log(`The user dodges the attack, but their stamina is reduced by 1.\n`);
      stamina -= 1;
      break;
    case 3:
      console.log(`The user deflects the attack. There is no stat change.\n`);
      break;
    case 4:
      console.log(`The enemy backs away; the user’s stamina increases by 1.\n`);
      stamina += 1;
      break;
    case 5:
      console.log(
        `The enemy dodges, but the user strikes a glancing blow. The user’s panic is reduced by 1. The enemy loses 3 health points.\n`
      );
      panic -= 2;
      enemyHealth -= 3;
      break;
    case 6:
      console.log(
        `The enemy takes significant damage. The user’s panic is reduced by 3. Their stamina is increased by 2. The enemy loses 5 health points.\n`
      );
      panic -= 3;
      stamina += 2;
      enemyHealth -= 5;
      break;
  }
  panic += 1;
  stamina -= 1;
  rollCount += 1;
  printStats();
};

const startApp = async () => {
  reset();
  while (rollCount < 10) {
    const ok = await yesno({
      question: '\n> Roll dice? (Y/n)',
      defaultValue: true
    });
    if (ok) {
      gameTurn();
    } else {
      console.log('\nTHERE IS NO ESCAPE!');
      gameTurn();
    }
    if (enemyHealth <= 0) {
      console.log('Enemy dies, new enemy entering arena.\n');
      enemyHealth = 10;
      bodyCount += 1;
    }
    if (stamina === 0) {
      console.log('You died, game over.\n');
      startApp();
    }
  }
  if (rollCount === 10 && enemyHealth > 0) {
    console.log('You ran out of dice rolls, game over.\n');
    startApp();
  }
};

startApp();
