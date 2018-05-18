# eslint-plugin-bam

Advise usage of ternary instead of uncasted falsy variable

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-bam`:

```
$ npm install eslint-plugin-bam --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-bam` globally.

## Usage

Add `bam` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["bam"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "bam/rule-name": 2
  }
}
```

## Supported Rules

* Fill in provided rules here
