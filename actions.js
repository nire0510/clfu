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
    url: `http://www.commandlinefu.com/commands/${path}/json/${skip}`,
    json: true,
  });
}

/**
 * Prints commands on screen
 * @param {object[]} commands - Commands array
 * @param {number} take - Number of commands to print
 */
function print(commands, take) {
  if (commands) {
    commands
      .forEach((command, index) => {
        if (!take || index < take) {
          console.log(`${index + 1}) ${command.summary.bold} (${command.votes} votes)`.green);
          console.log('>', command.command);
          console.log();
        }
      });
  }
}

function validate(command, options) {
  if (Number.isNaN(options.skip) === true || (options.skip && /\D/.test(options.skip))) {
    console.error('Skip must be a valid positive number');
    process.exit();
  }

  if (Number.isNaN(options.take) === true || (options.take && (/\D/.test(options.take) || options.take > 25))) {
    console.error('Take must be a valid positive number between 0 and 25');
    process.exit();
  }
}

module.exports = {
  popular(options) {
    validate('popular', options);
    request('browse/sort-by-votes', options.skip)
      .then((commands) => {
        print(commands, options.take);
      });
  },

  matching(match, options) {
    validate('matching', options);
    request(`matching/${match}/${Buffer.from(match).toString('base64')}`, options.skip)
      .then((commands) => {
        print(commands, options.take);
      });
  },

  using(command, options) {
    validate('using', options);
    request(`using/${command}`, options.skip)
      .then((commands) => {
        print(commands, options.take);
      });
  },
};
