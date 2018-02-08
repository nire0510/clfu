#!/usr/bin/env node

const program = require('commander');
const actions = require('../actions');
const pkg = require('../package.json');

program
  .version(pkg.version);

program
  .command('popular')
  .description('Show all commands sorted by votes')
  .option('-f, --filter <text>', 'Filter only commands which contain <text> in description')
  .option('-s, --skip <items>', 'Skip first <items> items')
  .action(actions.popular);

program
  .command('matching <match>')
  .description('Show commands which contain <match> in description or in command')
  .option('-f, --filter <text>', 'Filter only commands which contain <text> in description')
  .option('-s, --skip <items>', 'Skip first <items> items')
  .action(actions.matching);

program
  .command('using <command>')
  .description('Show commands using <command>')
  .option('-f, --filter <text>', 'Filter only commands which contain <text> in description')
  .option('-s, --skip <items>', 'Skip first <items> items')
  .action(actions.using);

program.parse(process.argv);
