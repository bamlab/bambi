const eslint = require('eslint');
const path = require('path');

const checkPrettierRulesAsync = require('./tools/checkPrettierRulesAsync');
const lintAsync = require('./tools/lintAsync');

const configFile = path.resolve(__dirname, '../node.js');

it(`has a Node config`, () => {
  expect(
    () =>
      new eslint.CLIEngine({
        configFile,
        useEslintrc: false,
      })
  ).not.toThrow();
});

it(`lints with the Node config`, async () => {
  let report = await lintAsync(
    {
      configFile,
      fix: true,
      ignore: false,
      useEslintrc: false,
    },
    ['__tests__/fixtures/*all*.js', '__tests__/fixtures/*node*.js']
  );
  let { results } = report;
  for (let result of results) {
    let relativeFilePath = path.relative(__dirname, result.filePath);
    delete result.filePath;
    expect(result).toMatchSnapshot(relativeFilePath);
  }
});

it(`doesn't conflict with Prettier`, async () => {
  let { success, message } = await checkPrettierRulesAsync(configFile);
  expect(success).toMatchSnapshot('success');
  expect(message).toMatchSnapshot('message');
});
