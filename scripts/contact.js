//contact form
getdata('get',{path:'/contactForm'}).done(function(html){
  $(".contact-body").append(html);
});
