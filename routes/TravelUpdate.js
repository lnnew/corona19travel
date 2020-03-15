const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
let rawdata = fs.readFileSync('/db/beta.json');
let beta = JSON.parse(rawdata)[0];
const db = low(adapter);
const fs = require("fs");
var express = require('express');
var router = express.Router();

router.get('/', function (request, response) {
  html = "<!doctype html><html><head></head><body>"
  function modify(countryCode, targetAtr, newAttr) {
    db.set(CountryCode+'.'+String(targetAtr), newAttr )
      .write();
  }
  for(var nation in beta) {

  }

  html+="</body></html>"


});

module.exports = router;
