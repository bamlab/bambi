# eslint-config-bambi

Shared ESLint configs for Node, Web, React Native, and Expo projects.

## Credits

This is a friendly fork of eslint-config-universe from expo folks, as we want to configure special rules for our projects.

## Installation

```sh
yarn add --dev eslint-config-bambi
```

You will also need to install `eslint` and `prettier`:

```sh
yarn add --dev eslint prettier
```

## Usage

Import this config into your own ESLint configuration using the `extends` option. ESLint checks both package.json and .eslintrc.* files for its configuration:

### package.json

```js
{
  "eslintConfig": {
    // Choose from bambi/native, bambi/node, bambi/web
    "extends": "bambi"
  }
}
```

### .eslintrc.js

```js
module.exports = {
  extends: 'bambi',
};
```

## Customizing Prettier

If you would like to customize the Prettier settings, create a file named `.prettierrc` in your project directory. This file must declare a Prettier configuration like this:

```js
{
  "printWidth": 100,
  "tabWidth": 2,
  "singleQuote": true,
  "jsxBracketSameLine": true,
  "trailingComma": "es5"
}
```

## Support for Different Platforms

There are several configs for different platforms. They are:

* `bambi`: the basic config for JavaScript projects for which there isn't a more specific config
* `bambi/native`: the config for React Native projects, including Expo projects, with support for React and JSX
* `bambi/web`: the config for code that runs in web browsers, with support for React and JSX
* `bambi/node`: the config for code that runs in Node

For an Expo project, your configuration might look like this:

```js
"eslintConfig": {
  "extends": "bambi/native"
}
```

You also can extend multiple configs, which is useful for projects that span several platforms:

```js
"eslintConfig": {
  "extends": ["bambi/node", "bambi/web"]
}
```

## Philosophy

This config is designed to mark severe problems (ex: syntax errors) as errors and stylistic issues as warnings. This lets your team apply policies like, "make sure a commit has no errors but ignore warnings if the commit didn't introduce them."

It's also designed to be a more lenient config for teams who are stronger at decision-making and have a culture of osmotically learning coding guidelines and benefit more from flexibility than rigid rules.