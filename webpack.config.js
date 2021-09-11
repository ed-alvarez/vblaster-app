const { development, production } = require('./webpack');

module.exports = (env, argv) =>
	argv.mode !== 'development' ? production : development;
