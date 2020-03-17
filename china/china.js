
$('.china_path').hover(function(e) {
   $('#info-box').css('display','block');
   var name =  $(this).data('info');
   var banDetail=$(this).data('ban');

   var html = `<h2>${name}</h2><hr style=" border-width: 4px;">
   <div>
   <br><p style= "font-size : 10px;">현재 조치:${banDetail}</p></div>`;

   $('#info-box').html(html);

 });



 $('.china_path').mouseleave(function(e) {
 $('#info-box').css('display','none');
});

  $('.world_path').hover(function(e) {
    $('#info-box1').css('display','block');
    var name =  $(this).data('name');
    var banDetail=$(this).data('ban');
    var html = `<h2>${name}</h2><hr style=" border-width: 4px;">
    <div>
    <br><p style= "font-size : 10px;">현재 조치:${banDetail}</p></div>`;
    $('#info-box1').html(html);

  });


  $('.world_path').mouseleave(function(e) {
  $('#info-box1').css('display','none');
});

  $("#chinh").mousemove(function(e) {
  $('#info-box').css('top',e.pageY-$('#info-box').height()-30);
  $('#info-box').css('left',e.pageX-($('#info-box').width())/2);
}).mouseover();
  $("#map").mousemove(function(e) {
  $('#info-box1').css('top',e.pageY-$('#info-box1').height()-30);
  $('#info-box1').css('left',e.pageX-($('#info-box1').width())/2);
  }).mouseover();
