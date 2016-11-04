#!/usr/bin/env node
const minimist = require('minimist');
const debug = require('debug');
const config = require('config');
const OoyalaApi = require('./lib');
const constants = require('./constants');

const print = debug('oo');
const argv = minimist(process.argv.slice(2));

if (!config.api) {
  console.info(constants.CONFIG_HELP_TEXT);
} else if (argv.h || argv.help) {
  console.info(constants.HELP_TEXT);
} else if (argv.v || argv.version) {
  console.info(constants.VERSION);
} else {
  const api = new OoyalaApi(config.api.key, config.api.secret, {expirationTime: config.api.period, concurrency: 6});
  try {
    require(`./command/${argv._[0]}`)(api, argv._[1], argv);
  } catch (err) {
    print(`${err.message} ${err.stack}`);
    console.info(constants.HELP_TEXT);
  }
}
