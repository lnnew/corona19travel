var express = require('express')
var app = express();
var session = require('express-session')
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
var template = require('./dist/index2.js');
var templateEN = require('./dist/index2en.js');
var c_rate = require('./dist/c_rate.js');
const fs = require('fs');
var db = require('./lib/db');

var helmet = require('helmet');
app.use(helmet());
var compression = require('compression');
var bodyParser = require('body-parser');
var LokiStore = require('connect-loki')(session);
var passport = require('./lib/passport')(app);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
var  http =require('http');
setInterval(function() {
    http.get("http://corona19travel.herokuapp.com/patient_update");
}, 6000); // every 10 minutes (600000)

app.use(compression());
app.use(session({
  secret: 'asadlfkj!@#!@#dfgasdg',
  resave: false,
  saveUninitialized: true,
  store: new LokiStore()
}));
app.use('/robots.txt', function (req, res, next) {
    res.type('text/plain')
    res.send("User-agent: *\nAllow: /");
});

app.get('/dist/svgMap.js', function(req, res) {
    res.sendFile(path.join(__dirname + ('/dist/svgMap.js')));
});
app.get('/data/italy.JPG', function(req, res) {
    res.sendFile(path.join(__dirname + ('/data/italy.JPG')));
});
app.get('/data/europe.JPG', function(req, res) {
    res.sendFile(path.join(__dirname + ('/data/europe.JPG')));
});
app.get('/data/hongkong.JPG', function(req, res) {
    res.sendFile(path.join(__dirname + ('/data/hongkong.JPG')));
});
app.get('/data/japan.JPG', function(req, res) {
    res.sendFile(path.join(__dirname + ('/data/japan.JPG')));
});
app.get('/data/china.JPG', function(req, res) {
    res.sendFile(path.join(__dirname + ('/data/china.JPG')));
});
app.get('/data/globeTravel.JPG', function(req, res) {
    res.sendFile(path.join(__dirname + ('/data/globeTravel.JPG')));
});
app.get('/data/banner.jpg', function(req, res) {
    res.sendFile(path.join(__dirname + ('/data/banner.jpg')));
});
app.get('/data/3sky.jpg', function(req, res) {
    res.sendFile(path.join(__dirname + ('/data/3sky.jpg')));
});


app.get('/dist/dbParse.js', function(req, res) {
    res.sendFile(path.join(__dirname + ('/dist/dbParse.js')));
});
app.get('/china/china.js', function(req, res) {
    res.sendFile(path.join(__dirname + ('/china/china.js')));
});
app.get('/china/chinaEN.js', function(req, res) {
    res.sendFile(path.join(__dirname + ('/china/chinaEN.js')));
});
var gp;
app.get('/',function(req, res) {
  let rawdat1a = fs.readFileSync(path.join(__dirname + ('/china/chinaDB.json')));
  let chinaDB = JSON.parse(rawdat1a);
  let currency = fs.readFileSync(path.join(__dirname + ('/data/Patientdb.json')));
  let cData = JSON.parse(currency);
  var patientstr= "|";
  var globePatients = cData.globe;
  var koreaN = cData.korea["확진환자"];
  for(var i in cData.korea) {
    patientstr+=i+":"+String(cData.korea[i])+"  "
  }
  patientstr+= "|";
  let rawdata = fs.readFileSync(path.join(__dirname + ('/db/beta.json')));
  let a =  JSON.parse(rawdata);
  let beta = a[0];
  let worldT = a["last_update"];
  let stat = a[1];
      fs.readFile(path.join(__dirname + ('/data/globeP.html')), function read(err, data) {
          if (err) {
              throw err;
          }
          gp =data.toString();
          for(key in beta) {

            if(  beta[key]["banDetail"]==undefined ||  beta[key]["banDetail"]=="" ){
               beta[key]["banDetail"]="현재 입국 조치 제한 없음";
            }
            if(  beta[key]["website"]=="" || ! beta[key]["website"]){
               beta[key]["website"]="http://www.corona19travel.info/";
            }
            var colorB = beta[key]["color"];
            if(colorB==0){
              beta[key]["color"]="#7EC2F1";
              beta[key]["banDetail"]="현재 입국 조치 제한 없음";
            }
            if(colorB==1){
              beta[key]["color"]="#977085";
            }
            if(colorB==2){
              beta[key]["color"]=" #8B99BC";
            }
            if(colorB==3){
              beta[key]["color"]="#A44752";
            }
            if(colorB==4){
              beta[key]["color"]=" #B01E1E";
            }
          }
          var html = template.HTML(beta,gp,patientstr, stat, worldT, chinaDB,globePatients,koreaN, c_rate.c_out(cData["currency"]));
          res.send(html);
      });
});
app.get('/EN/',function(req, res) {
  let rawdat1a = fs.readFileSync(path.join(__dirname + ('/china/chinaDBEN.json')));
  let chinaDB = JSON.parse(rawdat1a);
  let currency = fs.readFileSync(path.join(__dirname + ('/data/PatientdbEN.json')));
  let cData = JSON.parse(currency);
  var patientstr= "|";
  var globePatients = cData.globe;
  var koreaN = cData.korea[  "Confirmed Cases"];
  for(var i in cData.korea) {
    patientstr+=i+":"+String(cData.korea[i])+"  "
  }
  patientstr+= "|";
  let rawdata = fs.readFileSync(path.join(__dirname + ('/db/beta.json')));
  let r1awdata = fs.readFileSync(path.join(__dirname + ('/db/betaEN.json')));
  let a =  JSON.parse(rawdata);
  let beta =JSON.parse(r1awdata);
  let worldT = a["last_update"];
  let stat = a[1];
      fs.readFile(path.join(__dirname + ('/data/globePEN.html')), function read(err, data) {
          if (err) {
              throw err;
          }
          gp =data.toString();
          for(key in beta) {

            if(  beta[key]["banDetail"]==undefined ||  beta[key]["banDetail"]=="" ){
               beta[key]["banDetail"]="No entry ban at this point ";
            }
            if(  beta[key]["website"]=="" || ! beta[key]["website"]){
               beta[key]["website"]="http://www.corona19travel.info/";
            }
            var colorB = beta[key]["color"];
            if(colorB==0){
              beta[key]["color"]="#7EC2F1";
              beta[key]["banDetail"]="No entry ban at this point ";
            }
            if(colorB==1){
              beta[key]["color"]="#977085";
            }
            if(colorB==2){
              beta[key]["color"]=" #8B99BC";
            }
            if(colorB==3){
              beta[key]["color"]="#A44752";
            }
            if(colorB==4){
              beta[key]["color"]=" #B01E1E";
            }
          }
          var html = templateEN.HTML(beta,gp,patientstr, stat, worldT, chinaDB,globePatients,koreaN, c_rate.c_out(cData["currency"]));
          res.send(html);
      });
});

var updatePRouter = require('./routes/PatientUpdate.js');
app.use('/update_patient', updatePRouter);
var updatePRouter = require('./routes/PatientUpdateEN.js');
app.use('/update_patientEN', updatePRouter);

var authRouter = require('./routes/auth.js')(passport);
app.use('/wjdtjddnjsdbwlgushafs', authRouter);


app.use(function (req, res, next) {
  res.redirect("/");
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
 res.redirect("/");
});

app.listen(process.env.PORT|| 3000, function () {
  console.log('Example app listening on port 3000!')
});
