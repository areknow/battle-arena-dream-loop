import { adjectives, animals, colors, Config, uniqueNamesGenerator } from 'unique-names-generator';
import yesno from 'yesno';
import { DICE } from './constants';

let stamina: number;
let panic: number;
let enemyHealth: number;
let rollCount: number;
let bodyCount: number;
let enemyName: string;

const nameConfig: Config = {
  dictionaries: [adjectives, colors, animals],
  separator: ' ',
  length: 3,
  style: 'capital'
};

const reset = () => {
  stamina = 10;
  panic = 10;
  enemyHealth = 10;
  rollCount = 0;
  bodyCount = 0;
  enemyName = uniqueNamesGenerator(nameConfig);
};

const printStats = () => {
  console.log(`\r\n+------------------+----+`);
  console.log(`| YOUR STAMINA     | ${numberFormat(stamina)} |`);
  console.log(`| YOUR PANIC LEVEL | ${numberFormat(panic)} |`);
  console.log(`| REMAINING ROLLS  | ${numberFormat(rollCount)} |`);
  console.log(`+------------------+----+`);
  console.log(`| ENEMY HEALTH     | ${numberFormat(enemyHealth)} |`);
  console.log(`| ENEMIES KILLED   | ${numberFormat(bodyCount)} |`);
  console.log(`+------------------+----+\r\n`);
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
  console.log(`${DICE[roll - 1]}`);
  console.log(`You roll a ${roll}.`);
  console.log(`You are battling against the ${enemyName}.`);
  switch (roll) {
    case 1:
      console.log(`The user gets health, and their panic level increases by 2.`);
      panic += 2;
      break;
    case 2:
      console.log(`The user dodges the attack, but their stamina is reduced by 1.`);
      stamina -= 1;
      break;
    case 3:
      console.log(`The user deflects the attack. There is no stat change.`);
      break;
    case 4:
      console.log(`The enemy backs away; the user’s stamina increases by 1.`);
      stamina += 1;
      break;
    case 5:
      console.log(
        `The enemy dodges, but the user strikes a glancing blow. The user’s panic is reduced by 1. The enemy loses 3 health points.`
      );
      panic -= 2;
      enemyHealth -= 3;
      break;
    case 6:
      console.log(
        `The enemy takes significant damage. The user’s panic is reduced by 3. Their stamina is increased by 2. The enemy loses 5 health points.`
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
      question: '> Roll dice? (Y/n)\r\n',
      defaultValue: true
    });
    if (ok) {
      gameTurn();
    } else {
      console.log('THERE IS NO ESCAPE!\r\n');
      gameTurn();
    }
    if (enemyHealth <= 0) {
      console.log('Enemy dies, new enemy entering arena.\r\n');
      enemyName = uniqueNamesGenerator(nameConfig);
      enemyHealth = 10;
      bodyCount += 1;
    }
    if (stamina <= 0 || panic >= 20) {
      console.log('You died, game over.\r\n');
      startApp();
      return;
    }
  }
  if (rollCount === 10 && enemyHealth > 0) {
    console.log('You ran out of dice rolls, game over.\r\n');
    startApp();
  }
};

startApp();
