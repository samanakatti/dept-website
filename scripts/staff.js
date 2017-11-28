// Fetches the staff information, applied lightbox.

getPost('get',{path:'/people'}).done(function(json){
  var title = json.title;
  $("#title-staff").append(title);
  var subtitle = json.subTitle;
  $("#subTitle").append(subtitle);
  $.each(json.staff,function(){
    $("#staff").append('<div class="staff-members"><h3>'+this.name+'</h3><h4>'+this.title+'</h4><h6><span>Click to view more</span></h6></div>');
    $(".staff-members").featherlight('<img src="'+this.imagePath+'"/><ul><li>Office: '+this.office+'</li><li>Phone: '+this.phone+'</li><li>Email: '+this.email+'</li></ul>');
  });
});
