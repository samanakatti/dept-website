// Fetches the news data, applied lightbox to each news.

getPost('get',{path:'/news'}).done(function(json){
  var count = json.older.length;
  var i =0;
  $.each(json.year,function(json){
    $('.timeline').append('<div class="container left"><div class="content"><h3>Date: '+this.date+'</h3><h3>'+this.title+'</h3></div></div>');
    $(".content").featherlight('<p><h3>'+this.title+'</h3>'+this.description+'</p>');
  });
  $.each(json.older,function(json){
              while(i<count){
                // Logic to display the news elements alernatively
      if(i%2==0) {
              $('.timeline').append('<div class="container right"><div class="content"><h3>Date: '+this.date+'</h3><h3>'+this.title+'</h3></div></div>');
              $(".content").featherlight('<p><h3>'+this.title+'</h3>'+this.description+'</p>');
                  }
      else {
          $('.timeline').append('<div class="container left"><div class="content"><h3>Date: '+this.date+'</h3><h3>'+this.title+'</h3></div></div>');
          $(".content").featherlight('<p><h3>'+this.title+'</h3>'+this.description+'</p>');
            }
      i++;
     break;
    }
    });
  });
