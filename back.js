var express = require('express')
var app = express()
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
var template = require('./dist/index2.js');
const fs = require('fs');


let currency = fs.readFileSync('./data/patientdb.json');
let cData = JSON.parse(currency);
var patientstr= "|";
for(var i in cData.korea) {
  patientstr+=i+":"+String(cData.korea[i])+"  "
}
patientstr+= "|";
app.get('/dist/svgMap.js', function(req, res) {
    res.sendFile(path.join(__dirname + ('/dist/svgMap.js')));
});
app.get('/data/n.jpg', function(req, res) {
    res.sendFile(path.join(__dirname + ('/data/n.jpg')));
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



var gp;
app.get('/',function(req, res) {
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
      fs.readFile('./data/globeP.html', function read(err, data) {
          if (err) {
              throw err;
          }
          gp =data.toString();
          var html = template.HTML(str,gp,patientstr, stat, worldT);
          res.send(html);
      });
});

var updatePRouter = require('./routes/PatientUpdate.js');
app.use('/update_patient', updatePRouter);

var authPRouter = require('./routes/auth.js');
app.use('/wjdtjddnjsdbwlgushafs', authRouter);


app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
