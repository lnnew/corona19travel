var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var bcrypt = require('bcryptjs');
var db = require('../lib/db');
var shortid = require('shortid');
var auth = require('../lib/auth');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./db/beta.json');
const writeB = low(adapter); //set writeB.set('', )  .write();
const adapter2 = new FileSync('./china/chinaDB.json');
const writeC = low(adapter2);
//var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template.js');

module.exports = function (passport) {
  router.get('/create', function (request, response) {
    let rawdata = fs.readFileSync('./db/beta.json');
    let chinadata = fs.readFileSync('./china/chinaDB.json');
    let readB= JSON.parse(rawdata)[0]; //read beta[i]['color']
    let readC = JSON.parse(chinadata);
    if (!auth.isOwner(request, response)) {
      response.redirect('/');
      return false;
    }
    var buttons='<a href="/">홈</a><h1>전세계 DB 업데이트</h1>';
    for(var key in readB){
      var old_color =readB[key]['color'];
      var old_banDetail=readB[key]['banDetail'];
      var old_website=readB[key]['website'];

      buttons +=`  <form action="/wjdtjddnjsdbwlgushafs/create_process" method="post">
              <h3>${key}</h3>
              <p><input type="text" name="key" placeholder="건들지 말것(입력 x)" value="${key}"></p>
              <p>색깔 값 조정</p>
              <p><input type="text" name="color" placeholder="${old_color}" value="${old_color}"></p>
              <p>banDetail</p>
                <p><input name="banDetail" placeholder="${old_banDetail}" value="${old_banDetail}"></textarea></p>
                <p>웹사이트 </p>
                <p><input name="website" placeholder="${old_website}"  value="${old_website}">
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
          `
    }
    buttons+="<h1>중국 DB 업데이트<h1><h3>4군 #B01E1E한국전역 입국제한,,도착 비자 중단</h3><h3> 3군 #A44752한국 일부 지역 입국제한</h3><h3>2군 #8B99BC입국 가능 / 격리 조치</h3><h3>1군#977085입국 가능 / 자가격리,검역강화</h3><h3>0군 #7EC2F1 정상</h3>";

    for(var key in readC){
      var old_color =readC[key]['color'];
      var old_banDetail=readC[key]['banDetail'].replace("\"","").replace("\"","");
          console.log(readC[key]['banDetail']);
      console.log(old_color);
        console.log(readC[key]['banDetail'].replace("\"","").replace("\"",""));

      buttons +=`  <form action="/wjdtjddnjsdbwlgushafs/china_process" method="post">
              <h3>${key}</h3>
              <p><input type="text" name="key" placeholder="건들지 말것(입력 x)" value="${key}"></p>
              <p>색깔 값 조정</p>
              <p><input type="text" name="color" placeholder="${old_color}" value="${old_color}"></p>
              <p>banDetail</p>
              <p><input type="text" name="banDetail" placeholder="${old_banDetail}" value="${old_banDetail}"></p>
              <p>
                <input type="submit">
              </p>
            </form>
          `
    }

    html="<!doctype html><html><head></head><body>"+buttons+"</body><html>";
      response.send(html);
  });
  router.post('/china_process', function (request, response) {
    if (!auth.isOwner(request, response)) {
      response.redirect('/');
      return false;
    }
    var post = request.body;
    var key = post.key;
    var new_c = post.color;
    var new_b = "\""+post.banDetail+"\"";
    console.log(post);
    console.log(typeof post.banDetail);
    writeC.set(key,{"color":new_c, "banDetail":new_b } )  .write();
    response.redirect(`/wjdtjddnjsdbwlgushafs/create`);
  });



  router.post('/create_process', function (request, response) {
    if (!auth.isOwner(request, response)) {
      response.redirect('/');
      return false;
    }
    var post = request.body;
    var key = post.key;
    var new_c = post.color;
    var new_b = post.banDetail;
    var new_w = post.website;
    writeB.set('0.'+key,{"color":new_c, "banDetail":new_b, "website":new_w} )  .write();
    response.redirect(`/wjdtjddnjsdbwlgushafs/create`);
  });

  router.get('/login', function (request, response) {

    var title = 'WEB - login';
    var html =  `<!doctype html><html><head></head><body>
      <h3>관리자 데이터베이스 업데이트</h3>
      <form action="/wjdtjddnjsdbwlgushafs/login_process" method="post">
        <p><input type="text" name="email" placeholder="email""></p>
        <p><input type="password" name="pwd" placeholder="password"></p>
        <p>
          <input type="submit" value="login">
        </p>
      </form><body></html>
    `;
    response.send(html);
  });

  router.post('/login_process',
    passport.authenticate('local', {
      successRedirect: '/wjdtjddnjsdbwlgushafs/create',
      failureRedirect: '/wjdtjddnjsdbwlgushafs/login'
    }));
/*
  router.get('/register', function (request, response) {
    var title = 'WEB - login';
    var html = template.HTML(title, `
        <form action="/wjdtjddnjsdbwlgushafs/register_process" method="post">
          <p><input type="text" name="email" placeholder="email" value="egoing7777@gmail.com"></p>
          <p><input type="password" name="pwd" placeholder="password" value="111111"></p>
          <p><input type="password" name="pwd2" placeholder="password" value="111111"></p>
          <p><input type="text" name="displayName" placeholder="display name" value="egoing"></p>
          <p>
            <input type="submit" value="register">
          </p>
        </form>
      `, '');
    response.send(html);
  });

  router.post('/register_process', function (request, response) {
    var post = request.body;
    var email = post.email;
    var pwd = post.pwd;
    var pwd2 = post.pwd2;
    var displayName = post.displayName;
    if (pwd !== pwd2) {
      response.redirect('/wjdtjddnjsdbwlgushafs/register');
    } else {
      bcrypt.hash(pwd, 10, function (err, hash) {
        var user = {
          id: shortid.generate(),
          email: email,
          password: hash,
          displayName: displayName
        };
        db.get('users').push(user).write();
        request.login(user, function (err) {
          console.log('redirect');
          return response.redirect('/');
        })
      });
    }
  });
*/


  router.get('/logout', function (request, response) {
    request.logout();
    request.session.save(function () {
      response.redirect('/');
    });
  });

  return router;
}
