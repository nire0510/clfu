#!/usr/bin/env node

const program = require('commander');
const actions = require('../actions');

program
  .version('0.1.0')
  .option('-p, --popular', 'Show all commands sorted by votes')
  // .option('-t, --tag <tag>', 'Show commands tagged with <tag>')
  .option('-u, --using <command>', 'Show commands using <command>')
  .option('-m, --matching <text>', 'Show commands which contain <text> in description or in command')
  .option('-f, --filter <text>', 'Filter only commands which contain <text> in description')
  .option('-s, --skip <items>', 'Skip first <items> items')
  .parse(process.argv);

actions.show(program);
