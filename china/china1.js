$.ajaxSetup({ async: false });

  $('.china_path').hover(function(e) {
    $.getJSON( "/china/chinaDB.json", function(chinaDB ) {
     for(var a in chinaDB.keys()){
       alert(a+""+chinaDB.a);
     }
    $('#info-box').css('display','block');
    var name =  $(this).data('info');
    var data;
    alert(chinaDB);
    if ( chinaDB[name]) {
       data= chinaDB[name];
       alert("1",data);
    }else {
       data= {
        "color": 0,
        "banDetail": "한국인 대상 입국 제한 조치 없음"
      };
    }

    if ( chinaDB[name]) {
      var color = chinaDB[name]["color"];
    }else {
      var color = 0;
    }

    var html = `<h2>${name}</h2><hr style=" border-width: 4px;">
    </div>
    <h3>${data.color}</h3><br><p style= "font-size : 10px;">현재 조치:${data.banDetail}</p></div>`;

    $('#info-box').html(html);
      });
  });






  $('.china_path').mouseleave(function(e) {
  $('#info-box').css('display','none');
});
  $("#map").mousemove(function(e) {
  $('#info-box').css('top',e.pageY-$('#info-box').height()-30);
  $('#info-box').css('left',e.pageX-($('#info-box').width())/2);
}).mouseover();
