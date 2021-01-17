import prompt from 'prompt';

let stamina = 10;
let panic = 10;

prompt.start();
prompt.get(['name'], function (err, result) {
  console.log('> name: ' + result.name);
  printStats();
});

const printStats = () => {
  console.log(`> stamina: ${stamina}`);
  console.log(`> panic: ${panic}`);
};

const rollDice = () => {};
