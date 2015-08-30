Reproduce [leveldown#210](https://github.com/Level/leveldown/issues/210)
-----

Steps to repro:

```
git clone https://github.com/nolanlawson/leveldown-210.git
cd leveldown-210
npm i
node index.js
```

You might have to run `node index.js` twice to see it.

You'll see the error output:

```
new LevelPouch
calling levelup
about to call db.destroy()
_destroy()
leveldown.destroy leveldb_test
leveldown.destroy threw an error [Error: IO error: lock leveldb_test/LOCK: already held by process]
Error: IO error: lock leveldb_test/LOCK: already held by process
    at Error (native)
Trace
    at /tmp/dsflksfdld/leveldown-210/index.js:57:19
called destroy() [Error: IO error: lock leveldb_test/LOCK: already held by process]
got levelup callback

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

Then you'll see:

```
new LevelPouch
calling levelup
about to call db.destroy()
_destroy()
got levelup callback
leveldown.destroy leveldb_test
called destroy() undefined

```
