var express = require('express')
var app = express();
var session = require('express-session')
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
var template = require('./dist/index2.js');
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
app.use(compression());
app.use(session({
  secret: 'asadlfkj!@#!@#dfgasdg',
  resave: false,
  saveUninitialized: true,
  store: new LokiStore()
}));

app.get('/dist/svgMap.js', function(req, res) {
    res.sendFile(path.join(__dirname + ('/dist/svgMap.js')));
});
app.get('/data/italy.jpg', function(req, res) {
    res.sendFile(path.join(__dirname + ('/data/italy.jpg')));
});
app.get('/data/hongkong.jpg', function(req, res) {
    res.sendFile(path.join(__dirname + ('/data/hongkong.jpg')));
});
app.get('/data/japan.jpg', function(req, res) {
    res.sendFile(path.join(__dirname + ('/data/japan.jpg')));
});
app.get('/data/china.jpg', function(req, res) {
    res.sendFile(path.join(__dirname + ('/data/china.jpg')));
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
var gp;
app.get('/',function(req, res) {
  let rawdat1a = fs.readFileSync(path.join(__dirname + ('./china/chinaDB.json')));
  let chinaDB = JSON.parse(rawdat1a);
  let currency = fs.readFileSync(path.join(__dirname + ('./data/patientdb.json')));
  let cData = JSON.parse(currency);
  var patientstr= "|";
  var globePatients = cData.globe;
  var koreaN = cData.korea["확진환자"];
  for(var i in cData.korea) {
    patientstr+=i+":"+String(cData.korea[i])+"  "
  }
  patientstr+= "|";
  let rawdata = fs.readFileSync('./db/beta.json');
  let a =  JSON.parse(rawdata);
  let beta = a[0];
  let worldT = a["last_update"];
  var str="{";
  for (var n in beta) {
    str +="\""+ n+"\""+": { \"color\":\""+beta[n]['color']+"\", \"banDetail\":\""+beta[n]['banDetail']+"\", \"website\":\" "+beta[n]['website']+"\"}"
    str+=","
  }
  str= str.slice(0,str.length-1) + "}"
  let stat = a[1];
      fs.readFile(path.join(__dirname + ('./data/globeP.html'))), function read(err, data) {
          if (err) {
              throw err;
          }
          gp =data.toString();
          var html = template.HTML(str,gp,patientstr, stat, worldT, chinaDB,globePatients,koreaN, c_rate.c_out(cData["currency"]));
          res.send(html);
      });
});

var updatePRouter = require('./routes/PatientUpdate.js');
app.use('/update_patient', updatePRouter);

var authRouter = require('./routes/auth.js')(passport);
app.use('/wjdtjddnjsdbwlgushafs', authRouter);


app.use(function (req, res, next) {
  res.send("/");
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
 res.send("/");
});

app.listen(process.env.PORT|| 3000, function () {
  console.log('Example app listening on port 3000!')
});
