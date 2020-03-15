module.exports = {
  HTML: function(str){
     console.log(str);

     return `<!DOCTYPE html>
<html>

<head>
  <title>svgMap demos</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui">
  <style>
      body {
        font-family: sans-serif;
        color: #000;
        background: #fff;
        padding: 0;
        margin: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-tap-highlight-color: transparent;
      }

      .demo-wrapper {
        box-sizing: border-box;
        width: 800px;
        max-width: calc(100% - 30px);
        margin: auto;
        padding: 30px 0 0;
      }

      .demo-container {
        padding: 0 0 80px;
      }

      h2 {
        text-align: center;
        font-size: 32px;
        margin: 0 0 25px;
        font-weight: normal;
      }

      @media (max-width: 900px) {
        h2 {
          font-size: 24px;
        }
      }

      @media (max-width: 600px) {
        h2 {
          font-size: 18px;
        }
      }

  </style>
  <style>
      .svgMap-map-wrapper {
        position: relative;
        width: 100%;
        padding-top: 50%;
        overflow: hidden;
        background: #d9ecff;
        color: #111;
      }

      .svgMap-map-wrapper * {
        box-sizing: border-box;
        outline: none;
      }

      .svgMap-map-wrapper .svgMap-map-image {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0;
      }

      .svgMap-map-wrapper .svgMap-map-controls-wrapper {
        position: absolute;
        bottom: 10px;
        left: 10px;
        z-index: 1;
        display: flex;
        overflow: hidden;
        border-radius: 2px;
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
      }

      .svgMap-map-wrapper .svgMap-map-controls-zoom,
      .svgMap-map-wrapper .svgMap-map-controls-move {
        display: flex;
        margin-right: 5px;
        overflow: hidden;
        background: #fff;
      }

      .svgMap-map-wrapper .svgMap-map-controls-zoom:last-child,
      .svgMap-map-wrapper .svgMap-map-controls-move:last-child {
        margin-right: 0;
      }

      .svgMap-map-wrapper .svgMap-control-button {
        cursor: pointer;
        width: 30px;
        height: 30px;
        position: relative;
      }

      .svgMap-map-wrapper .svgMap-control-button.svgMap-zoom-button:before, .svgMap-map-wrapper .svgMap-control-button.svgMap-zoom-button:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #666;
        transition: background-color .2s;
      }

      .svgMap-map-wrapper .svgMap-control-button.svgMap-zoom-button:before {
        width: 11px;
        height: 3px;
      }

      .svgMap-map-wrapper .svgMap-control-button.svgMap-zoom-button:hover:before, .svgMap-map-wrapper .svgMap-control-button.svgMap-zoom-button:hover:after {
        background: #111;
      }

      .svgMap-map-wrapper .svgMap-control-button.svgMap-zoom-button.svgMap-disabled:before, .svgMap-map-wrapper .svgMap-control-button.svgMap-zoom-button.svgMap-disabled:after {
        background: #ccc;
      }

      .svgMap-map-wrapper .svgMap-control-button.svgMap-zoom-in-button:after {
        width: 3px;
        height: 11px;
      }

      .svgMap-map-wrapper .svgMap-country {
        cursor: pointer;
        stroke: #fff;
        stroke-width: 1;
        stroke-linejoin: round;
        vector-effect: non-scaling-stroke;
        transition: fill .2s, stroke .2s;
      }

      .svgMap-map-wrapper .svgMap-country:hover, .svgMap-map-wrapper .svgMap-country.svgMap-active {
        stroke: #333;
      }

      .svgMap-map-wrapper .svgMap-country.svgMap-active {
        stroke-width: 1.5;
      }

      .svgMap-tooltip {
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
        position: absolute;
        z-index: 2;
        border-radius: 2px;
        background: #fff;
        transform: translate(-50%, -100%);
        border-bottom: 1px solid #000;
        display: none;
        pointer-events: none;
        min-width: 60px;
      }

      .svgMap-tooltip.svgMap-tooltip-flipped {
        transform: translate(-50%, 0);
        border-bottom: 0;
        border-top: 1px solid #000;
      }

      .svgMap-tooltip.svgMap-active {
        display: block;
      }

      .svgMap-tooltip .svgMap-tooltip-content-container {
        position: relative;
        padding: 10px 20px;
      }

      .svgMap-tooltip .svgMap-tooltip-content-container .svgMap-tooltip-flag-container {
        text-align: center;
        margin: 2px 0 5px;
      }

      .svgMap-tooltip .svgMap-tooltip-content-container .svgMap-tooltip-flag-container.svgMap-tooltip-flag-container-emoji {
        font-size: 50px;
        line-height: 0;
        padding: 25px 0 15px;
      }

      .svgMap-tooltip .svgMap-tooltip-content-container .svgMap-tooltip-flag-container .svgMap-tooltip-flag {
        display: block;
        margin: auto;
        width: auto;
        height: 32px;
        padding: 2px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 2px;
      }

      .svgMap-tooltip .svgMap-tooltip-title {
        white-space: nowrap;
        font-size: 18px;
        line-height: 28px;
        padding: 0 0 8px;
        text-align: center;
      }

      .svgMap-tooltip .svgMap-tooltip-content {
        white-space: nowrap;
        text-align: center;
        font-size: 14px;
        color: #777;
        margin: -5px 0 0;
      }

      .svgMap-tooltip .svgMap-tooltip-content table {
        padding: 0;
        border-spacing: 0px;
        margin: auto;
      }

      .svgMap-tooltip .svgMap-tooltip-content table td {
        padding: 2px 0;
        text-align: left;
      }

      .svgMap-tooltip .svgMap-tooltip-content table td span {
        color: #111;
      }

      .svgMap-tooltip .svgMap-tooltip-content table td:first-child {
        padding-right: 10px;
        text-align: right;
      }

      .svgMap-tooltip .svgMap-tooltip-content table td sup {
        vertical-align: baseline;
        position: relative;
        top: -5px;
      }

      .svgMap-tooltip .svgMap-tooltip-content .svgMap-tooltip-no-data {
        padding: 2px 0;
        color: #777;
        font-style: italic;
      }

      .svgMap-tooltip .svgMap-tooltip-pointer {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        overflow: hidden;
        height: 10px;
        width: 30px;
      }

      .svgMap-tooltip .svgMap-tooltip-pointer:after {
        content: '';
        width: 20px;
        height: 20px;
        background: #fff;
        border: 1px solid #000;
        position: absolute;
        bottom: 6px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
      }

      .svgMap-tooltip.svgMap-tooltip-flipped .svgMap-tooltip-pointer {
        bottom: auto;
        top: -10px;
        transform: translateX(-50%) scaleY(-1);
      }

      /*# sourceMappingURL=svgMap.css.map */

  </style>

  <script src="/dist/svgMap.js">
  </script>
</head>
<body>

    <!-- KOREA MAP -->
    <div class="demo-container">
      <h2>GDP per capita (PPP)</h2>
      <div id="svgMapGPD"></div>
      <script >
            var svgMapDataGPD = {
              data: {
                "color": {
                  name:  "분류",
                  format: '{0} 군',
                  thresholdMax: 4,
                  thresholdMin: 0
                },
                "banDetail": {
                  name: '실시간 입국 제한 조치 상황: ',
                  format: '{0}'
                },
                "website": {
                  name: '외교부 사이트 링크: ',
                  format: '{0}'
                }
              },
              applyData: 'color',
              values: `+str+`
                 }
      </script>
      <script >
          var kor = {"GH":"\uac00\ub098","GA":"\uac00\ubd09","GY":"\uac00\uc774\uc544\ub098","GM":"\uac10\ube44\uc544","GG":"\uac74\uc9c0","GP":"\uacfc\ub4e4\ub8e8\ud504","GT":"\uacfc\ud14c\ub9d0\ub77c","GU":"\uad0c","GD":"\uadf8\ub808\ub098\ub2e4","GR":"\uadf8\ub9ac\uc2a4","GL":"\uadf8\ub9b0\ub780\ub4dc","GN":"\uae30\ub2c8","GW":"\uae30\ub2c8\ube44\uc0ac\uc6b0","NA":"\ub098\ubbf8\ube44\uc544","NR":"\ub098\uc6b0\ub8e8","NG":"\ub098\uc774\uc9c0\ub9ac\uc544","AQ":"\ub0a8\uadf9 \ub300\ub959","SS":"\ub0a8\uc218\ub2e8","ZA":"\ub0a8\uc544\ud504\ub9ac\uce74","NL":"\ub124\ub35c\ub780\ub4dc","BQ":"\ub124\ub35c\ub780\ub4dc\ub839 \uce74\ub9ac\ube0c","NP":"\ub124\ud314","NO":"\ub178\ub974\uc6e8\uc774","NF":"\ub178\ud37d\uc12c","NZ":"\ub274\uc9c8\ub79c\ub4dc","NC":"\ub274\uce7c\ub808\ub3c4\ub2c8\uc544","NU":"\ub2c8\uc6b0\uc5d0","NE":"\ub2c8\uc81c\ub974","NI":"\ub2c8\uce74\ub77c\uacfc","TW":"\ub300\ub9cc","KR":"\ub300\ud55c\ubbfc\uad6d","DK":"\ub374\ub9c8\ud06c","DM":"\ub3c4\ubbf8\ub2c8\uce74","DO":"\ub3c4\ubbf8\ub2c8\uce74 \uacf5\ud654\uad6d","DE":"\ub3c5\uc77c","TL":"\ub3d9\ud2f0\ubaa8\ub974","DG":"\ub514\uc5d0\uace0 \uac00\ub974\uc2dc\uc544","LA":"\ub77c\uc624\uc2a4","LR":"\ub77c\uc774\ubca0\ub9ac\uc544","LV":"\ub77c\ud2b8\ube44\uc544","RU":"\ub7ec\uc2dc\uc544","LB":"\ub808\ubc14\ub17c","LS":"\ub808\uc18c\ud1a0","RO":"\ub8e8\ub9c8\ub2c8\uc544","LU":"\ub8e9\uc148\ubd80\ub974\ud06c","RW":"\ub974\uc644\ub2e4","LY":"\ub9ac\ube44\uc544","RE":"\ub9ac\uc720\ub2c8\uc628","LT":"\ub9ac\ud22c\uc544\ub2c8\uc544","LI":"\ub9ac\ud788\ud150\uc288\ud0c0\uc778","MG":"\ub9c8\ub2e4\uac00\uc2a4\uce74\ub974","MQ":"\ub9c8\ub974\ud2f0\ub2c8\ud06c","MH":"\ub9c8\uc15c \uc81c\ub3c4","YT":"\ub9c8\uc694\ud2b8","MO":"\ub9c8\uce74\uc624(\uc911\uad6d \ud2b9\ubcc4\ud589\uc815\uad6c)","MK":"\ub9c8\ucf00\ub3c4\ub2c8\uc544","MW":"\ub9d0\ub77c\uc704","MY":"\ub9d0\ub808\uc774\uc2dc\uc544","ML":"\ub9d0\ub9ac","IM":"\ub9e8 \uc12c","MX":"\uba55\uc2dc\ucf54","MC":"\ubaa8\ub098\ucf54","MA":"\ubaa8\ub85c\ucf54","MU":"\ubaa8\ub9ac\uc154\uc2a4","MR":"\ubaa8\ub9ac\ud0c0\ub2c8","MZ":"\ubaa8\uc7a0\ube44\ud06c","ME":"\ubaac\ud14c\ub124\uadf8\ub85c","MS":"\ubaac\ud2b8\uc138\ub77c\ud2b8","MD":"\ubab0\ub3c4\ubc14","MV":"\ubab0\ub514\ube0c","MT":"\ubab0\ud0c0","MN":"\ubabd\uace8","US":"\ubbf8\uad6d","VI":"\ubbf8\uad6d\ub839 \ubc84\uc9c4\uc544\uc77c\ub79c\ub4dc","UM":"\ubbf8\uad6d\ub839 \ud574\uc678 \uc81c\ub3c4","MM":"\ubbf8\uc580\ub9c8","FM":"\ubbf8\ud06c\ub85c\ub124\uc2dc\uc544","VU":"\ubc14\ub204\uc544\ud22c","BH":"\ubc14\ub808\uc778","BB":"\ubc14\ubca0\uc774\ub3c4\uc2a4","VA":"\ubc14\ud2f0\uce78 \uc2dc\uad6d","BS":"\ubc14\ud558\ub9c8","BD":"\ubc29\uae00\ub77c\ub370\uc2dc","BM":"\ubc84\ubba4\ub2e4","BJ":"\ubca0\ub0c9","VE":"\ubca0\ub124\uc218\uc5d8\ub77c","VN":"\ubca0\ud2b8\ub0a8","BE":"\ubca8\uae30\uc5d0","BY":"\ubca8\ub77c\ub8e8\uc2a4","BZ":"\ubca8\ub9ac\uc988","BA":"\ubcf4\uc2a4\ub2c8\uc544 \ud5e4\ub974\uccb4\uace0\ube44\ub098","BW":"\ubcf4\uce20\uc640\ub098","BO":"\ubcfc\ub9ac\ube44\uc544","BI":"\ubd80\ub8ec\ub514","BF":"\ubd80\ub974\ud0a4\ub098\ud30c\uc18c","BT":"\ubd80\ud0c4","MP":"\ubd81\ub9c8\ub9ac\uc544\ub098\uc81c\ub3c4","KP":"\ubd81\ud55c","BG":"\ubd88\uac00\ub9ac\uc544","BR":"\ube0c\ub77c\uc9c8","BN":"\ube0c\ub8e8\ub098\uc774","WS":"\uc0ac\ubaa8\uc544","SA":"\uc0ac\uc6b0\ub514\uc544\ub77c\ube44\uc544","GS":"\uc0ac\uc6b0\uc2a4\uc870\uc9c0\uc544 \uc0ac\uc6b0\uc2a4\uc0cc\ub4dc\uc704\uce58 \uc81c\ub3c4","SM":"\uc0b0\ub9c8\ub9ac\ub178","ST":"\uc0c1\ud22c\uba54 \ud504\ub9b0\uc2dc\ud398","MF":"\uc0dd\ub9c8\ub974\ud0f1","BL":"\uc0dd\ubc14\ub974\ud154\ub808\ubbf8","PM":"\uc0dd\ud53c\uc5d0\ub974 \ubbf8\ud074\ub871","EH":"\uc11c\uc0ac\ud558\ub77c","SN":"\uc138\ub124\uac08","RS":"\uc138\ub974\ube44\uc544","EA":"\uc138\uc6b0\ud0c0 \ubc0f \uba5c\ub9ac\uc57c","SC":"\uc138\uc774\uc178","LC":"\uc138\uc778\ud2b8\ub8e8\uc2dc\uc544","VC":"\uc138\uc778\ud2b8\ube48\uc13c\ud2b8\uadf8\ub808\ub098\ub518","KN":"\uc138\uc778\ud2b8\ud0a4\uce20 \ub124\ube44\uc2a4","SH":"\uc138\uc778\ud2b8\ud5ec\ub808\ub098","SO":"\uc18c\ub9d0\ub9ac\uc544","SB":"\uc194\ub85c\ubaac \uc81c\ub3c4","SD":"\uc218\ub2e8","SR":"\uc218\ub9ac\ub0a8","LK":"\uc2a4\ub9ac\ub791\uce74","SJ":"\uc2a4\ubc1c\ubc14\ub974\uc81c\ub3c4-\uc580\ub9c8\uc6ec\uc12c","SE":"\uc2a4\uc6e8\ub374","CH":"\uc2a4\uc704\uc2a4","ES":"\uc2a4\ud398\uc778","SK":"\uc2ac\ub85c\ubc14\ud0a4\uc544","SI":"\uc2ac\ub85c\ubca0\ub2c8\uc544","SY":"\uc2dc\ub9ac\uc544","SL":"\uc2dc\uc5d0\ub77c\ub9ac\uc628","SX":"\uc2e0\ud2b8\ub9c8\ub974\ud134","SG":"\uc2f1\uac00\ud3ec\ub974","AE":"\uc544\ub78d\uc5d0\ubbf8\ub9ac\ud2b8","AW":"\uc544\ub8e8\ubc14","AM":"\uc544\ub974\uba54\ub2c8\uc544","AR":"\uc544\ub974\ud5e8\ud2f0\ub098","AS":"\uc544\uba54\ub9ac\uce78 \uc0ac\ubaa8\uc544","IS":"\uc544\uc774\uc2ac\ub780\ub4dc","HT":"\uc544\uc774\ud2f0","IE":"\uc544\uc77c\ub79c\ub4dc","AZ":"\uc544\uc81c\ub974\ubc14\uc774\uc794","AF":"\uc544\ud504\uac00\ub2c8\uc2a4\ud0c4","AD":"\uc548\ub3c4\ub77c","AL":"\uc54c\ubc14\ub2c8\uc544","DZ":"\uc54c\uc81c\ub9ac","AO":"\uc559\uace8\ub77c","AG":"\uc564\ud2f0\uac00 \ubc14\ubd80\ub2e4","AI":"\uc575\uadc8\ub77c","AC":"\uc5b4\uc13c\uc158 \uc12c","ER":"\uc5d0\ub9ac\ud2b8\ub9ac\uc544","SZ":"\uc5d0\uc2a4\uc640\ud2f0\ub2c8","EE":"\uc5d0\uc2a4\ud1a0\ub2c8\uc544","EC":"\uc5d0\ucf70\ub3c4\ub974","ET":"\uc5d0\ud2f0\uc624\ud53c\uc544","SV":"\uc5d8\uc0b4\ubc14\ub3c4\ub974","GB":"\uc601\uad6d","VG":"\uc601\uad6d\ub839 \ubc84\uc9c4\uc544\uc77c\ub79c\ub4dc","IO":"\uc601\uad6d\ub839 \uc778\ub3c4\uc591 \uc2dd\ubbfc\uc9c0","YE":"\uc608\uba58","OM":"\uc624\ub9cc","AU":"\uc624\uc2a4\ud2b8\ub808\uc77c\ub9ac\uc544","AT":"\uc624\uc2a4\ud2b8\ub9ac\uc544","HN":"\uc628\ub450\ub77c\uc2a4","AX":"\uc62c\ub780\ub4dc \uc81c\ub3c4","WF":"\uc648\ub9ac\uc2a4-\ud478\ud22c\ub098 \uc81c\ub3c4","JO":"\uc694\ub974\ub2e8","UG":"\uc6b0\uac04\ub2e4","UY":"\uc6b0\ub8e8\uacfc\uc774","UZ":"\uc6b0\uc988\ubca0\ud0a4\uc2a4\ud0c4","UA":"\uc6b0\ud06c\ub77c\uc774\ub098","XB":"\uc720\uc0ac \uc591\ubc29\ud5a5","XA":"\uc720\uc0ac \uc5b5\uc591","IQ":"\uc774\ub77c\ud06c","IR":"\uc774\ub780","IL":"\uc774\uc2a4\ub77c\uc5d8","EG":"\uc774\uc9d1\ud2b8","IT":"\uc774\ud0c8\ub9ac\uc544","IN":"\uc778\ub3c4","ID":"\uc778\ub3c4\ub124\uc2dc\uc544","JP":"\uc77c\ubcf8","JM":"\uc790\uba54\uc774\uce74","ZM":"\uc7a0\ube44\uc544","JE":"\uc800\uc9c0","GQ":"\uc801\ub3c4 \uae30\ub2c8","GE":"\uc870\uc9c0\uc544","CN":"\uc911\uad6d","CF":"\uc911\uc559 \uc544\ud504\ub9ac\uce74 \uacf5\ud654\uad6d","DJ":"\uc9c0\ubd80\ud2f0","GI":"\uc9c0\ube0c\ub864\ud130","ZW":"\uc9d0\ubc14\ube0c\uc6e8","TD":"\ucc28\ub4dc","CZ":"\uccb4\ucf54","CL":"\uce60\ub808","IC":"\uce74\ub098\ub9ac\uc544 \uc81c\ub3c4","CM":"\uce74\uba54\ub8ec","CV":"\uce74\ubcf4\ubca0\ub974\ub370","KZ":"\uce74\uc790\ud750\uc2a4\ud0c4","QA":"\uce74\ud0c0\ub974","KH":"\uce84\ubcf4\ub514\uc544","CA":"\uce90\ub098\ub2e4","KE":"\ucf00\ub0d0","KY":"\ucf00\uc774\ub9e8 \uc81c\ub3c4","KM":"\ucf54\ubaa8\ub85c","XK":"\ucf54\uc18c\ubcf4","CR":"\ucf54\uc2a4\ud0c0\ub9ac\uce74","CC":"\ucf54\ucf54\uc2a4 \uc81c\ub3c4","CI":"\ucf54\ud2b8\ub514\ubd80\uc544\ub974","CO":"\ucf5c\ub86c\ube44\uc544","CG":"\ucf69\uace0-\ube0c\ub77c\uc790\ube4c","CD":"\ucf69\uace0-\ud0a8\uc0e4\uc0ac","CU":"\ucfe0\ubc14","KW":"\ucfe0\uc6e8\uc774\ud2b8","CK":"\ucfe1 \uc81c\ub3c4","CW":"\ud034\ub77c\uc18c","HR":"\ud06c\ub85c\uc544\ud2f0\uc544","CX":"\ud06c\ub9ac\uc2a4\ub9c8\uc2a4\uc12c","KG":"\ud0a4\ub974\uae30\uc2a4\uc2a4\ud0c4","KI":"\ud0a4\ub9ac\ubc14\uc2dc","CY":"\ud0a4\ud504\ub85c\uc2a4","TJ":"\ud0c0\uc9c0\ud0a4\uc2a4\ud0c4","TZ":"\ud0c4\uc790\ub2c8\uc544","TH":"\ud0dc\uad6d","TC":"\ud130\ud06c\uc2a4 \ucf00\uc774\ucee4\uc2a4 \uc81c\ub3c4","TR":"\ud130\ud0a4","TG":"\ud1a0\uace0","TK":"\ud1a0\ucf08\ub77c\uc6b0","TO":"\ud1b5\uac00","TM":"\ud22c\ub974\ud06c\uba54\ub2c8\uc2a4\ud0c4","TV":"\ud22c\ubc1c\ub8e8","TN":"\ud280\ub2c8\uc9c0","TT":"\ud2b8\ub9ac\ub2c8\ub2e4\ub4dc \ud1a0\ubc14\uace0","TA":"\ud2b8\ub9ac\uc2a4\ud0c4\ub2e4\ucfe0\ub098","PA":"\ud30c\ub098\ub9c8","PY":"\ud30c\ub77c\uacfc\uc774","PK":"\ud30c\ud0a4\uc2a4\ud0c4","PG":"\ud30c\ud478\uc544\ub274\uae30\ub2c8","PW":"\ud314\ub77c\uc6b0","PS":"\ud314\ub808\uc2a4\ud0c0\uc778 \uc9c0\uad6c","FO":"\ud398\ub85c \uc81c\ub3c4","PE":"\ud398\ub8e8","PT":"\ud3ec\ub974\ud22c\uac08","FK":"\ud3ec\ud074\ub79c\ub4dc \uc81c\ub3c4","PL":"\ud3f4\ub780\ub4dc","PR":"\ud478\uc5d0\ub974\ud1a0\ub9ac\ucf54","FR":"\ud504\ub791\uc2a4","TF":"\ud504\ub791\uc2a4 \ub0a8\ubd80 \uc9c0\ubc29","GF":"\ud504\ub791\uc2a4\ub839 \uae30\uc544\ub098","PF":"\ud504\ub791\uc2a4\ub839 \ud3f4\ub9ac\ub124\uc2dc\uc544","FJ":"\ud53c\uc9c0","FI":"\ud540\ub780\ub4dc","PH":"\ud544\ub9ac\ud540","PN":"\ud54f\ucf00\uc5b8 \uc12c","HU":"\ud5dd\uac00\ub9ac","HK":"\ud64d\ucf69(\uc911\uad6d \ud2b9\ubcc4\ud589\uc815\uad6c)"};

      </script>
      <script>

          new svgMap({
            targetElementID: 'svgMapGPD',
            countryNames: kor,
            data: svgMapDataGPD
          });
      </script>
    </div>
</body>

</html>
`;} }
