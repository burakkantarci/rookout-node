var inquirer = require('inquirer');

const image_creator = require('./image-creator')
inquirer
  .prompt([
    {
      type: 'list',
      name: 'category',
      message: 'Select category',
      choices: ['currencies','golds','coins']
    },
    {
      type: 'list',
      name: 'short_code',
      message: 'Select short code',
      choices: ['USD','EUR','GBP','bitcoin','gram-altin']
    },
    {
      type: 'list',
      name: 'alarm',
      message: 'Is this alarming news?',
      choices: ['no','yes']
    }
  ])
  .then(answers => {
    image_creator(answers);
  })