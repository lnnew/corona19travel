const fs = require('fs');
      //let rawdata = fs.readFileSync('/db/beta.json');
      let rawdata = fs.readFileSync('../db/beta.json');
      let beta = JSON.parse(rawdata)[0];
      var svgMapDataGPD = {
        data: {
          "color": {
            name:  "분류",
            format: '{0} 군',
            thresholdMax: 5,
            thresholdMin: 1
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
        values: beta
      }
