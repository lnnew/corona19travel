module.exports = `<!DOCTYPE html>
<html>

<head>
  <title>svgMap demos</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui">
  <link href="demo.css" rel="stylesheet">
  <link href="../dist/svgMap.css" rel="stylesheet">
  <script src="../dist/svgMap.js"></script>
</head>

<body>
    <!-- Demo GPD -->

    <div class="demo-container">
      <h2>GDP per capita (PPP)</h2>

      <div id="svgMapGPD"></div>
      <script src="../data/gdp.js"></script>
      <script src="../local/countriesEN.js"></script>
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
`
