'use strict';

var levelup = require('levelup');
var leveldown = require('leveldown');
var sublevel = require('level-sublevel');

var cachedDB;

function LevelPouch(opts, callback) {
  console.log('new LevelPouch');
  var oldCallback = callback;
  callback = callback || function () {};
  var api = this;
  var instanceId;
  var stores = {};
  var db;
  var name = opts.name;


  if (cachedDB) {
    db = cachedDB;
    afterDBCreated();
  } else {
    console.log('calling levelup');
    cachedDB = sublevel(levelup(name, opts, function (err) {
      console.log('got levelup callback');
      if (err) {
        return callback(err);
      }
      db = cachedDB;
      afterDBCreated();
    }));
  }

  function afterDBCreated() {
    callback(null, api);
  }

  // close and delete open leveldb stores
  api._destroy = function (callback) {
    console.log('_destroy()');
    if (cachedDB) {
      cachedDB.close(function () {
        callDestroy(name, callback);
      });
    } else {
      callDestroy(name, callback);
    }
  };
  function callDestroy(name, cb) {
    if (typeof leveldown.destroy === 'function') {
      console.log('leveldown.destroy', name);
      leveldown.destroy(name, function (err) {
        if (err) {
          console.log('leveldown.destroy threw an error', err);
          console.log(err.stack);
          console.trace();
        }
        cb(err);
      });
    } else {
      process.nextTick(cb);
    }
  }
}

var db = new LevelPouch({name: 'leveldb_test'})
console.log('about to call db.destroy()');
db._destroy(function (err) {
  console.log('called destroy()', err);
});

