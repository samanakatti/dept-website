// Fetches the research by byInterestArea data and applied accordion to each interest area.

getPost('get',{path:'/research'}).done(function(json){
  $.each(json.byInterestArea,function(json){
    $("#accordion").append('<h3>'+this.areaName+'</h3>');
    var list='<ul>';
    var con = this.citations;
    for(var j=0;j<con.length;j++ )
        {
          list+=('<li>'+con[j]+'</li>');
        }
        list+=('</ul>');
        $('#accordion').append('<div>'+list+'</div>');
    });
    $( "#accordion" ).accordion({
      collapsible: true,
      active: false,
      heightStyle: "content"});
});
