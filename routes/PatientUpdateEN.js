const low = require('lowdb');
const fs = require("fs");
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/PatientdbEN.json');
const adapter2 = new FileSync('./db/beta.json');
let enDat = fs.readFileSync('./db/beta.json');

const db = low(adapter);
const db2= low(adapter2);
let beta = JSON.parse(enDat)[0];
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var express = require('express');
var router = express.Router();

router.get('/', function (request, response) {
  var n0=0,n12=0,n34=0;
  for(var i in beta){
    if(beta[i]['color'] ==0) {
      n0+=1;
    }
    if(beta[i]['color']==1 ||beta[i]['color']==2) {
      n12+=1;
    }
    if(beta[i]['color']==3||beta[i]['color']==4) {
        n34+=1;
  }
}
  db2.set('1', {
    "n0":n0,
    "n12":n12,
    "n34":n34
  } ).write();
  var date = new Date(),
      datevalues = [
         date.getFullYear(),
         date.getMonth()+1,
         date.getDate(),
         date.getHours(),
         date.getMinutes(),
         date.getSeconds(),
      ];
      db2.set('last_update',  datevalues[0]+"."+datevalues[1]+"."+datevalues[2]+"  "+datevalues[3]+":"+datevalues[4]+":"+datevalues[5] )
        .write();
      db.set('last_update',  datevalues[0]+"."+datevalues[1]+"."+datevalues[2]+"  "+datevalues[3]+":"+datevalues[4]+":"+datevalues[5] )
        .write();
  JSDOM.fromURL("http://ncov.mohw.go.kr/en/bdBoardList.do?brdId=16&brdGubun=161&dataGubun=&ncvContSeq=&contSeq=&board_id=&gubun=").then(dom => {
          var enDat = dom.window.document.getElementsByClassName('ca_value'); //[0].querySelectorAll("li")
        db.set('korea.'+"Confirmed Cases",   enDat[0].textContent.trim() )
          .write();
          db.set('korea.'+"Released from Quarantine",   enDat[2].textContent.trim() )
            .write();
          db.set('korea.'+"Quarantined",   enDat[4].textContent.trim() )
            .write();
            db.set('korea.'+"Deceased",   enDat[6].textContent.trim() )
              .write();

  //   const KPdata= ``
  //   var kphtml = `<table>`+KPdata+'	</table>';
  //   fs.writeFile('data/koreaPEN.html', kphtml, (err) => {
  //   if (err) throw err;
  // });
  });
  JSDOM.fromURL("https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%ED%99%98%EC%9C%A8&oquery=nodejs%ED%99%98%EC%9C%A8&tqi=UErGPdprvhGssmuiLu0sssssstN-341467").then(dom => {
    var enDat = dom.window.document.getElementsByClassName('rate_table_info')[0].querySelectorAll("tr");
    var defs=enDat[0].textContent.trim().split(" ");
    var us=enDat[1].textContent.trim().split(" ");
    var jp=enDat[2].textContent.trim().split(" ");
    var eu =enDat[3].textContent.trim().split(" ");
    var cn=enDat[4].textContent.trim().split(" ");
    for( var i = 0; i<5; i++){
      var a = enDat[i].textContent.trim().split(" ");
      db.set('currency.'+a[0],  a.slice(1,a.length) )
        .write();
    }
  });

  JSDOM.fromURL("http://ncov.mohw.go.kr/en/bdBoardList.do?brdId=16&brdGubun=163&dataGubun=&ncvContSeq=&contSeq=&board_id=&gubun=").then(dom => {
    var enDat = dom.window.document.getElementsByClassName('num')[0].querySelectorAll("tr");

    var us = enDat[39].textContent,
    cn = enDat[1].textContent,
    jp = enDat[5].textContent
    if(us.indexOf("미국")==-1 || cn.indexOf("중국")==-1|| jp.indexOf("일본")==-1) {
    for ( var i =0; i<enDat.length;i++) {
        if(enDat[i].textContent.indexOf("미국")!=-1) {
            us = enDat[i].textContent;
        }
        if(enDat[i].textContent.indexOf("중국")!=-1) {
            cn = enDat[i].textContent;
        }
        if(enDat[i].textContent.indexOf("일본")!=-1&& enDat[i].textContent.indexOf("크루즈")==-1) {
            jp = enDat[i].textContent;
        }
      }
    }
    db.set('globe.us', us.slice(us.indexOf("미국")+"미국".length ,us.length).trim())
      .write();
      db.set('globe.cn', cn.slice(cn.indexOf("중국")+"중국".length ,cn.length).trim())
        .write();
        db.set('globe.jp', jp.slice(jp.indexOf("일본")+"일본".length ,jp.length).trim())
          .write();


    const globedata= dom.window.document.getElementsByClassName('num')[0].innerHTML;
    var globehtml = `<style>
    table, td {
    	color: #000;
    	font: normal normal 12px Verdana, Geneva, Arial, Helvetica, sans-serif
    }

    /* end basic styling                                 */

    /* define height and width of scrollable area. Add 16px to width for scrollbar          */
    div.tableContainer {
    	clear: both;
    	border: 1px solid #963;
    	height: 285px;
    	overflow: auto;
    	width: 900px
    }

    /* Reset overflow value to hidden for all non-IE browsers. */
    html>body div.tableContainer {
    	overflow: hidden;
    	width: 900px
    }

    /* define width of table. IE browsers only                 */
    div.tableContainer table {
    	float: left;
    	/* width: 740px */
    }

    /* define width of table. Add 16px to width for scrollbar.           */
    /* All other non-IE browsers.                                        */
    html>body div.tableContainer table {
    	/* width: 756px */
    }

    /* set table header to a fixed position. WinIE 6.x only                                       */
    /* In WinIE 6.x, any element with a position property set to relative and is a child of       */
    /* an element that has an overflow property set, the relative value translates into fixed.    */
    /* Ex: parent element DIV with a class of tableContainer has an overflow property set to auto */

    thead.fixedHeader tr {
    	position: relative;
    }
    #customers td, #customers th {
      border: 1px solid #ddd;
      padding: 8px;
    }
    #customers td {
      width: 50%;
    }
    #customers tr:nth-child(even){background-color: #f2f2f2;}

    #customers tr:hover {background-color: #ddd;}

    #customers th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #1abc9c;
      color: white;
    }
    /* set THEAD element to have block level attributes. All other non-IE browsers            */
    /* this enables overflow to work on TBODY element. All other non-IE, non-Mozilla browsers */

    /* make the TH elements pretty */
    thead.fixedHeader th {
    	background: #C96;
    	border-left: 1px solid #EB8;
    	border-right: 1px solid #B74;
    	border-top: 1px solid #EB8;
    	font-weight: normal;
    	padding: 4px 3px;
    	text-align: left
    }

    html>body tbody.scrollContent {
    	display: block;
    	height: 262px;
    	overflow: auto;
    	width: 100%
    }

    html>body thead.fixedHeader {
    	display: table;
    	overflow: auto;
    	width: 100%
    }

    /* make TD elements pretty. Provide alternating classes for striping the table */
    /* http://www.alistapart.com/articles/zebratables/                             */
    tbody.scrollContent td, tbody.scrollContent tr.normalRow td {
    	background: #FFF;
    	border-bottom: none;
    	border-left: none;
    	border-right: 1px solid #CCC;
    	border-top: 1px solid #DDD;
    	padding: 2px 3px 3px 4px
    }



    tbody.scrollContent tr.alternateRow td {

    	background: #EEE;
    	border-bottom: none;
    	border-left: none;
    	border-right: 1px solid #CCC;
    	border-top: 1px solid #DDD;
    	padding: 2px 3px 3px 4px
    }
        </style>
    <table id="customers" align="center" class="scrollTable">`+globedata.replace(`</span></caption>`,`</h2>`).replace(`<caption><span class="hdn">`,`<h2 align="center"   id ="koreamap" class= "htag" style="margin-top:50px;"><i class="fa fa-th-list" style="color:#1abc9c"></i>`).replace("<thead>",`<thead class="fixedHeader">`).replace(`<tbody>`,`<tbody class="scrollContent">`)+'	</table>';
    fs.writeFile('data/globePEN.html', globehtml, (err) => {
    if (err) throw err;
  });

  });
  //  fs.appendFile('./data/Patients.json', result2)

  // Set some defaults
  db.defaults({ globe: {}, korea:{},currency:{}, last_update:""})
    .write();
  response.redirect('/');
});

module.exports = router;
