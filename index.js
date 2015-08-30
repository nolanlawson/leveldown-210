'use strict';

var levelup = require('levelup');
var leveldown = require('leveldown');
var rimraf = require('rimraf');
var dbName = 'testdb';

var opts = {db: leveldown};
var db;
rimraf(dbName, function (err) {
  if (err) {
    return console.log(err);
  }
  db = levelup(dbName, opts, function (err) {
    if (err) {
      return console.log(err);
    }
    process.nextTick(function () {
      leveldown.destroy(dbName, function (err) {
        if (err) {
          return console.log(err);
        }
      });
    });
  });
});

console.log(db);
