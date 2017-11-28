// Fetches the research made by Professors and applied lightbox to each Prof's research.


getPost('get',{path:'/research'}).done(function(json){
  $.each(json.byFaculty,function(json){
    $('#researchFaculty').append('<div class="fac-res"><h3>'+this.facultyName+'</h3><span>Click to view more</span></div>');
    var list='<ul>';
    var con = this.citations;
    for(var j=0;j<con.length;j++ )
        {
          list+=('<li>'+con[j]+'</li>');
        }
        list+=('</ul>');
        $('.fac-res').featherlight('<div><h3>'+this.facultyName+'</h3>'+list+'</div>');
        });
  });
