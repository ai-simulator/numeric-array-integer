# numeric-array-integer

JavaScript numeric array implemented using bitwise operations on an integer.

This implementation allows for simple and efficient storage of fixed length arrays of small integers as an integer.

[![NPM version](https://img.shields.io/npm/v/numeric-array-integer.svg?style=flat-square)](https://npmjs.org/package/numeric-array-integer)
[![CI](https://github.com/paradite/numeric-array-integer/actions/workflows/node.js.yml/badge.svg)](https://github.com/paradite/numeric-array-integer/actions/workflows/node.js.yml)

## Install:

```bash
$ yarn add numeric-array-integer
```

## Usage:

```js
const integer = new NumericArrayInteger(4, 10);
integer.setPos(0, 3);
integer.setPos(2, 2);
const data = integer.getData();
console.log(data); // 515
const integer2 = NumericArrayInteger.fromData(data, 4, 10);
console.log(integer2.getPos(0)); // 3
console.log(integer2.getPos(2)); // 2
```

For more examples, see https://github.com/paradite/numeric-array-integer/blob/main/test/index.test.ts
