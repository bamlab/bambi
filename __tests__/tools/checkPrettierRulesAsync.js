const path = require('path');
const process = require('process');
const spawnAsync = require('@expo/spawn-async');

module.exports = async function checkPrettierRulesAsync(configFile) {
  let env = Object.assign(process.env, {
    PATH: path.resolve(__dirname, '../../node_modules/.bin') + path.delimiter + process.env.PATH,
  });

  let { stdout: configString } = await spawnAsync(
    'eslint',
    ['--config', configFile, '--no-eslintrc', '--print-config', configFile],
    { env }
  );

  let resultPromise = spawnAsync('eslint-config-prettier-check', [], { env });
  let { child } = resultPromise;
  child.stdin.setEncoding('utf8');
  child.stdin.write(configString);
  child.stdin.end();

  let result;
  try {
    result = await resultPromise;
  } catch (e) {
    if (e.status === 2) {
      result = e;
    } else {
      throw e;
    }
  }

  return {
    success: result.status === 0,
    message: result.stderr,
  };
};
