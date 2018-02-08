const config = require('config');
const rp = require('request-promise');
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
  popular(options) {
    request('browse/sort-by-votes', options.skip)
      .then((commands) => {
        print(commands, options.skip, options.filter);
      });
  },

  matching(match, options) {
    request(`matching/${match}/${Buffer.from(match).toString('base64')}`, options.skip)
      .then((commands) => {
        print(commands, options.skip, options.filter);
      });
  },

  using(command, options) {
    request(`using/${command}`, options.skip)
      .then((commands) => {
        print(commands, options.skip, options.filter);
      });
  },
};
