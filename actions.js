const config = require('config');
const rp = require('request-promise');
const pkg = require('./package.json');
require('colors');

/**
 * Returns network request promise
 * @param {string} path - Part of the requested resources
 * @param {number} [skip] - Number of results to skip
 * @returns {Promise}
 */
function request(path, skip = 0) {
  return rp({
    url: `${config.url}${path}/json/${skip}`,
    json: true,
  });
}

/**
 * Prints commands on screen
 * @param {object[]} commands - Commands array
 * @param {number} [skip] - Number of results to skip
 * @param {string} [filter] - Text to filter commands
 */
function print(commands, skip = 0, filter) {
  if (commands) {
    const re = new RegExp(filter, 'i');

    commands
      .forEach((command, index) => {
        if (!filter || command.summary.search(re) >= 0) {
          console.log(`${index + 1 + parseInt(skip, 10)}) ${command.summary.bold} (${command.votes} votes)`.green);
          console.log('>', command.command);
          console.log();
        }
      });
  }
}

module.exports = {
  /**
   * Prints 
   * @param {*} program 
   */
  show(program) {
    if (program.popular) {
      request('browse/sort-by-votes', program.skip)
        .then((commands) => {
          print(commands, program.skip, program.filter);
        });
    }
    else if (program.using) {
      request(`using/${program.using}`, program.skip)
        .then((commands) => {
          print(commands, program.skip, program.filter);
        });
    }
    else if (program.matching) {
      request(`matching/${program.matching}/${Buffer.from(program.matching).toString('base64')}`, program.skip)
        .then((commands) => {
          print(commands, program.skip, program.filter);
        });
    }
    else {
      console.log('>', pkg.name.green.bold, pkg.description.bold);
      program.help();
    }
  },
};
