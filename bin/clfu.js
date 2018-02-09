#!/usr/bin/env node

const program = require('commander');
const actions = require('../actions');
const pkg = require('../package.json');

program
  .version(pkg.version, '-v, --version');

program
  .command('popular')
  .description('Show all commands sorted by votes')
  .option('-s, --skip <n>', 'Skip <n> items')
  .option('-t, --take <n>', 'Take only <n> items', parseInt)
  .action(actions.popular);

program
  .command('matching <text>')
  .description('Show commands which contain <text> in description or in command')
  .option('-s, --skip <n>', 'Skip <n> items', parseInt)
  .option('-t, --take <n>', 'Take only <n> items', parseInt)
  .action(actions.matching);

program
  .command('using <command>')
  .description('Show commands using <command>')
  .option('-s, --skip <n>', 'Skip <n> items', parseInt)
  .option('-t, --take <n>', 'Take only <n> items', parseInt)
  .action(actions.using);

program.parse(process.argv);
