
module.exports = {
  c_out: function(currency) {
      console.log(currency);
      var i = currency["통화명"];
      var us =currency['미국'];
      var jp =currency['일본'];
      var eu =currency['유럽연합'];
      var cn =currency[  '중국'];
      /*
      {
  '통화명': [ '매매기준율', '전일대비', '등락률' ],
  '미국': [ 'USD', '1,218.00', '전일대비상승11.00', '+0.91%' ],
  '일본': [ 'JPY', '100', '1,146.51', '전일대비하락15.80', '-1.36%' ],
  '유럽연합': [ 'EUR', '1,359.35', '전일대비상승3.04', '+0.22%' ],
  '중국': [ 'CNY', '173.94', '전일대비상승1.87', '+1.09%' ]
}
      */

       return `<style>



                        #pricing-table {
                        	margin: 100px auto;
                        	text-align: center;
                        	width: auto; /* total computed width = 222 x 3 + 226 */
                        }

                        #pricing-table .plan {
                        	font: 12px 'Lucida Sans', 'trebuchet MS', Arial, Helvetica;
                        	text-shadow: 0 1px rgba(255,255,255,.8);
                        	background: #fff;
                        	border: 1px solid #ddd;
                        	color: #333;
                        	padding: 20px;
                        	width: 25%;
                        	float: left;
                        	position: relative;
                        }
                        pricing-table .plan:nth-child(1) {
                        	-moz-border-radius: 5px 0 0 5px;
                        	-webkit-border-radius: 5px 0 0 5px;
                        	border-radius: 5px 0 0 5px;
                        }

                        #pricing-table .plan:nth-child(4) {
                        	-moz-border-radius: 0 5px 5px 0;
                        	-webkit-border-radius: 0 5px 5px 0;
                        	border-radius: 0 5px 5px 0;
                        }

                        /* --------------- */

                        #pricing-table h3 {
                        	font-size: 20px;
                        	font-weight: normal;
                        	padding: 20px;
                        	margin: -20px -20px 50px -20px;
                        	background-color:white;
                          }

                        #pricing-table #most-popular h3 {
                        	background-color: #ddd;
                        	margin-top: -30px;
                        	padding-top: 30px;
                        	-moz-border-radius: 5px 5px 0 0;
                        	-webkit-border-radius: 5px 5px 0 0;
                        	border-radius: 5px 5px 0 0;
                        }

                        #pricing-table .plan:nth-child(1) h3 {
                        	-moz-border-radius: 5px 0 0 0;
                        	-webkit-border-radius: 5px 0 0 0;
                        	border-radius: 5px 0 0 0;
                        }

                        #pricing-table .plan:nth-child(4) h3 {
                        	-moz-border-radius: 0 5px 0 0;
                        	-webkit-border-radius: 0 5px 0 0;
                        	border-radius: 0 5px 0 0;
                        }
                        @media screen and (max-width: 1000px) {
                          #pricing-table .plan {
                            font: 8px 'Lucida Sans', 'trebuchet MS', Arial, Helvetica;
                            padding: 10px;
                            width: 50%;
                            }
                          #pricing-table h3 span {
                            font: bold 8px/60px Georgia, Serif;
                            border: 2px solid #fff;
                            height: 60px;
                            width: 60px;
                                }
                          #pricing-table .signup {
                          display:none;
                          font: bold 5px Arial, Helvetica;
                          }
                        }

                        #pricing-table h3 span {
                        	display: block;
                        	font: bold 15px/100px Georgia, Serif;

                        	background: #fff;
                        	border: 5px solid #fff;
                        	height: 100px;
                        	width: 100px;
                        	margin: 10px auto -65px;
                        	-moz-border-radius: 100px;
                        	-webkit-border-radius: 100px;
                        	border-radius: 100px;
                        	-moz-box-shadow: 0 5px 20px #ddd inset, 0 3px 0 #999 inset;
                        	-webkit-box-shadow: 0 5px 20px #ddd inset, 0 3px 0 #999 inset;
                        	box-shadow: 0 5px 20px #ddd inset, 0 3px 0 #999 inset;
                        }

                        /* --------------- */

                        #pricing-table ul {
                        	margin: 20px 0 0 0;
                        	padding: 0;
                        	list-style: none;
                          color:#d9138a;
                        }

                        #pricing-table li {
                        	border-top: 1px solid #ddd;
                        	padding: 10px 0;
                        }

                        /* --------------- */

                        #pricing-table .signup {
                        	position: relative;
                        	padding: 8px 20px;
                        	margin: 20px 0 0 0;
                        	color: #fff;
                        	font: bold 14px Arial, Helvetica;
                        	text-transform: uppercase;
                        	text-decoration: none;
                        	display: inline-block;
                        	background-color: #12a4d9;
                        	border-radius: 3px;
                        	text-shadow: 0 1px 0 rgba(0,0,0,.3);
                        	-moz-box-shadow: 0 1px 0 rgba(255, 255, 255, .5), 0 2px 0 rgba(0, 0, 0, .7);
                        	-webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, .5), 0 2px 0 rgba(0, 0, 0, .7);
                        	box-shadow: 0 1px 0 rgba(255, 255, 255, .5), 0 2px 0 rgba(0, 0, 0, .7);
                        }


                        #pricing-table .signup:active, #pricing-table .signup:focus {
                        	background: #62bc30;
                        	top: 2px;
                        	-moz-box-shadow: 0 0 3px rgba(0, 0, 0, .7) inset;
                        	-webkit-box-shadow: 0 0 3px rgba(0, 0, 0, .7) inset;
                        	box-shadow: 0 0 3px rgba(0, 0, 0, .7) inset;
                        }

                        /* --------------- */

                        .clear:before, .clear:after {
                          content:"";
                          display:table
                        }

                        .clear:after {
                          clear:both
                        }

                        .clear {
                          zoom:1
                        }
                               </style>
       <div id="pricing-table" class="clear" align="center">

    <div class="plan">
        <h3> ${us[1]}<span>${us[0]}</span></h3>
        <a class="signup" href="">${us[2]}</a>
        <ul>
			       <li><b>등락률</b>${us[3]}</li>
        </ul>
    </div>
    <div class="plan">
        <h3>${jp[2]}<span>${jp[1]}${jp[0]}</span></h3>
        <a class="signup">${jp[3]}</a>
        <ul>
			       <li><b>등락률</b>${jp[4]}</li>
        </ul>
    </div>
    <div class="plan">
        <h3>${eu[1]}<span>${eu[0]}</span></h3>
        <a class="signup">${eu[2]}</a>
        <ul>
             <li><b>등락률</b>${eu[3]}</li>
        </ul>
    </div>
    <div class="plan">
        <h3>${cn[1]}<span>${cn[0]}</span></h3>
        <a class="signup">${cn[2]}</a>
        <ul>
             <li><b>등락률</b>${cn[3]}</li>
        </ul>
    </div>

</div>



`;} }
