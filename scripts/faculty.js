// Fetch the faculty information and applied lightbox to each faculty.
      getPost('get',{path:'/people'}).done(function(json){
        var title = json.title;
        $("#title-faculty").append(title);
        var subtitle = json.subTitle;
        $("#subTitle-staff").append(subtitle);
        $.each(json.faculty,function(){
          $("#faculty").append('<div class="faculty-members"><h3>'+this.name+'</h3><h4>'+this.title+'</h4><h6><span>Click to view more</span></h6></div>');
          $(".faculty-members").featherlight('<img src="'+this.imagePath+'"/><ul><li>Office: '+this.office+'</li><li>Phone: '+this.phone+'</li><li>Email: '+this.email+'</li></ul>');
        });
      });
