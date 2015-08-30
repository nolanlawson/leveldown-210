Reproduce [leveldown#210](https://github.com/Level/leveldown/issues/210)
-----

Steps to repro:

```
git clone https://github.com/nolanlawson/leveldown-210.git
cd leveldown-210
npm i
node index.js
```

To see it passing with older versions of levelup/leveldown/sublevel, change the package.json to:

```js
{
  "name": "repro-pouchdb-leveldown-bug",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "level-sublevel": "5.2.3",
    "leveldown": "0.10.5",
    "levelup": "0.18.6",
    "rimraf": "^2.4.3"
  }
}
```
