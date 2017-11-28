$(document).ready(function(){
  $(".parallaxer").parallaxer();

  // Fetch the About data.

  getPost('get',{path:'/about'}).done(function(json){
    $('#about').append('<h2>'+json.title+'</h2>');
    $('#about').append('<p>'+json.description+'</p>');
    $('#about').append('<p>"'+json.quote+'"<h5>-'+json.quoteAuthor+'</h5></p>');

  });

  // Fetch the Undergrad degree information and applied lightbox to show the concentrations

  getPost('get',{path:'/degrees/undergraduate'}).done(function(json){
    $('#undergraduate').append('<h2>Our Undergraduate Degrees</h2>');
    $.each(json.undergraduate,function()
    {
      $('#undergraduate').append('<div id="degree" class="'+this.degreeName+'"><h3>'+this.title+'</h3><p>'+this.description+'</p></div>');
      var list='<ul>';
      var con = this.concentrations;
      for(var j=0;j<con.length;j++ )
      {
        list+=('<li>'+con[j]+'</li>');
      }
      list+=('</ul>');
      $('.'+this.degreeName).featherlight('<div><h3>'+this.title+'</h3>'+list+'</div>');
    });
  });

  // Fetch the Graduate degree information and applied lightbox to show the concentrations,
  // Also Graduate Certificates does not have any lightbox, it just lists the data.

  getPost('get',{path:'/degrees/graduate'}).done(function(json){
    $('#graduate').append('<h2>Our Graduate Degrees</h2>');
    $.each(json.graduate,function(i, item)
    {
      if(i<(json.graduate).length-1)
      {
        $('#graduate').append('<div id="degree-grad" class="'+this.degreeName+'"><h3>'+this.title+'</h3><p>'+this.description+'</p></div>');
        var list='<ul>';
        for(var j=0;j<this.concentrations.length;j++ )
        {
          list+=('<li>'+this.concentrations[j]+'</li>');
        }
        list+=('</ul>');
        $('.'+this.degreeName).featherlight('<div><h3>'+this.title+'</h3>'+list+'</div>');
      }
      else
      {
        var list ='<ul>';
        for(var j=0;j<this.availableCertificates.length;j++)
        {
          list+=('<li>'+this.availableCertificates[j]+'</li>');
        }
        list+=('</ul>');
        $('#graduate').append('<div id = "degree-grad"><h3>Our Graduate Advanced Certificates</h3>'+list+'</div>');
      }
    });
  });

  // Fetch the Minor degree information and applied lightbox to show the description.

  getPost('get',{path:'/minors'}).done(function(json){
           $('#ugminors').append('<h2>Our Undergrad Minors Degrees</h2>');
          $.each(json.UgMinors,function()
          {
              var content = $('<div class ="minors"><h3>'+this.title+'</h3></div>');
              var lbcontent = '<p><h2>'+this.title+'</h2>'+this.description+'</p>';
              var lb=$(lbcontent);
              content.featherlight(lb);
              $('#ugminors').append(content);
              var list = '<div class="tab-list"><ul id="horizontal-list">Courses: </br>';
              for(var j=0;j<this.courses.length;j++)
                  {
                      list+=('<li class="'+this.courses[j]+'">'+this.courses[j]+' ');
                      var courselist = this.courses[j];
                      var path ='/course/courseID='+courselist;
                      getPost('get',{path:path}).done(function(json){
                        var item = $('<h3>'+json.title+'</h3><p>'+json.description+'</p></li>');
                        $('.'+courselist).featherlight(item);
                      });
                  }
                  list+=('</ul></div>');
                  content.append(list);
          });
      });

  // Fetch the employement data, implemented DataTable to display coop and employers list.

  getPost('get',{path:'/employment'}).done(function(json){
    $('#emp').append('<h2>'+json.introduction.title+'</h2>');
    $.each(json.introduction.content,function(){
      $('#emp').append('<div class = "content-emp"><h3>'+this.title+'</h3><p>'+this.description+'</p></div></br>');
    });
    $('#emp').append('<div class = "emp-name"><h3>'+json.employers.title+'</h3></div>');
    var employers = json.employers.employerNames;
    for(var i =0; i<employers.length;i++){
      $(".emp-name").append('<h6 class="emp-list">'+employers[i]+'</h6>');
    }
    $('#emp').append('<div class = "emp-name"><h3>'+json.careers.title+'</h3></div>');
    var careers = json.careers.careerNames;
    for(var i =0; i<careers.length;i++){
      $(".emp-name").append('<h6 class="career-list">'+careers[i]+'</h6>');
    }

    $('#emp').append('<h3>'+json.degreeStatistics.title+'</h3>');
    $.each(json.degreeStatistics.statistics, function(){
      $('#emp').append('<div class="stats"><h4>'+this.value+'</h4><p>'+this.description+'</p></div>');
    });
    // coop table;
    $("#coop").append('</br><div class="fill"><h3>'+json.coopTable.title+'</h3></div>');
    var table =$('<table id="dtable">');
    var tbody = '<tbody>';
    $.each(json.coopTable.coopInformation,function(){
      tbody+=('<tr><td>'+this.employer+'</td><td>'+this.degree+'</td><td>'+this.city+'</td><td>'+this.term+'</td></tr>');
    });
    tbody+='</tbody>';
    table.append('<thead><tr><th>Employer</th><th>Degree</th><th>City</th><th>Term</th></thead>'+tbody+'</table>');
    table.DataTable({ paging: false});
    $('.fill').featherlight(table);

    // employers table;

    $("#coop").append('<div class="fill"><h3>'+json.employmentTable.title+'</h3></div>');
    var emptable =$('<table id="tab">');
    var emptbody = '<tbody>';
    $.each(json.employmentTable.professionalEmploymentInformation,function(){
      emptbody+=('<tr><td>'+this.employer+'</td><td>'+this.degree+'</td><td>'+this.city+'</td><td>'+this.title+'</td><td>'+this.startDate+'</td></tr>');
    });
    emptbody+='</tbody>';
    emptable.append('<thead><tr><th>Employer</th><th>Degree</th><th>City</th><th>Title</th><th>Start Date</th></thead>'+emptbody+'</table>');
    emptable.DataTable({ paging: false});
    $('.fill').featherlight(emptable);
  });

  // Fetch the footer information.

  getPost('get',{path:'/footer'}).done(function(json){
    var social = json.social;
    $('#footer').append('<h2>'+social.title+'</h2>'+'<p>'+social.tweet+'</p>');
    $('#footer').append('<div class="socialicons"><div class="twitter"><a href='+social.twitter+'><i class="fa fa-twitter-square fa-2x" aria-hidden="true"></i></a></div></div><div class="socialicons"><div class="facebook"><a href='+social.facebook+' ><i class="fa fa-facebook-square fa-2x" aria-hidden="true"></i></a></div><div>');
    var links = json.quickLinks;
    $('#footer').append('<div class="container"><div class="links"></div></div>');
    var list ='<ul>';
    for(var i=0;i<json.quickLinks.length;i++){
      list+=('<li><a href='+json.quickLinks[i].href+'>'+json.quickLinks[i].title+'</a></li>');
    }
    list+='</ul>';
    $('.links').append(list);
    $('.container').append('<div class="copyright"><p>'+json.copyright.html+'</p></div>');
  });

  // Tags for the navigation menu.

  $('#tag').append('<li><a href="#"><i class="fa fa-user"></i> People<i class="fa fa-caret-down"></i></a><ul><li><a href="faculty.html">Faculty</a></li><li><a href="staff.html">Staff</a></li></ul></li>');
  $('#tag').append('<li><a href="#"><i class="fa fa-space-shuttle"></i> Research<i class="fa fa-caret-down"></i></a><ul><li><a href="interest.html">By Interest</a></li><li><a href="interestFaculty.html">By Faculty</a></li></ul></li>');
  // $('#tag').append('<li><a href="resources.html"><i class="fa fa-newspaper-o"></i> Resources</a></li>');
  $('#tag').append('<li><a href="news.html"><i class="fa fa-university"></i> News</a></li>');
  $('#tag').append('<li><a href="contact.html"><i class="fa fa-envelope"></i> Contact Forms</a></li>');

  // Displays the menu onclick function

  $("#showmenu").click(function(e){
    e.preventDefault();
    $("#menu").toggleClass("show");
    $('#menu').animate({
      left: "0px"}, 200);
      $('.main').animate({
        left: "100px" }, 200);
      });

      $('.icon-close').click(function() {
        $('#menu').animate({
          left: "-285px"  }, 200);
          $('.main').animate({
            left: "0px"
          }, 200);
        });

        // Displays the list within the People and Research tags.

        $("#menu a").click(function(event){
          // event.preventDefault();
          if($(this).next('ul').length){
            $(this).next().slideToggle('500');
            $(this).find('i').toggleClass('fa-caret-down fa-caret-left');
          }
        });

        // Fetch the resources data and applied lightbox to each resource.

        getPost('get',{path:'/resources'}).done(function(json){
          $('.resources').append('<h2>'+json.title+'</h2><br>');
          $('.resources').append('<div class="student"><h3>'+json.studyAbroad.title+'</h3></div>');
          var list = '<ul>';
          for(var i=0;i<json.studyAbroad.places.length;i++){
            list+=('<li><h4>'+json.studyAbroad.places[i].nameOfPlace+'</h4><p>'+json.studyAbroad.places[i].description+'</p></li>');
          }
          list+='</ul>';
          var content = $('<div class="study-abroad"><p>'+json.studyAbroad.description+'</p>'+list+'</div>');
          $('.student').featherlight(content);
          $('.resources').append('<div class="student"><h3>'+json.tutorsAndLabInformation.title+'</h3></div>');
          $('.student').featherlight('<p>'+json.tutorsAndLabInformation.description+'</p><a href="'+json.tutorsAndLabInformation.tutoringLabHoursLink+'">Tutoring hours link</a>')
          $('.resources').append('<div class="student"><h3>'+json.studentAmbassadors.title+'</h3></div>');
          var list1 = '<ul>';
          for(var i=0;i<json.studentAmbassadors.subSectionContent.length;i++){
            list1+=('<li><h4>'+json.studentAmbassadors.subSectionContent[i].title+'</h4><p>'+json.studentAmbassadors.subSectionContent[i].description+'</p></li>');
          }
          list1+='</ul>';
          var lbam = $('<div class="student-am">'+list1+'<a href="'+json.studentAmbassadors.applicationFormLink+'">Application Form Link</a><h5>Note: '+json.studentAmbassadors.note+'</h5></div>');
          $('.student').featherlight(lbam);
          var forms = json.forms;
          $('.resources').append('<div class="student"><h3>Forms</h3></div>');
          var listgrad = '<ul><h3>Graduate Forms</h3>';
          for(var i=0;i<forms.graduateForms.length;i++){
            listgrad+=('<li><h4>'+forms.graduateForms[i].formName+'<a href="'+forms.graduateForms[i].href+'">Application Form Link</a></h4></li>');
          }
          listgrad+='</ul>';
          var gradform = '<div class="form-app">'+listgrad+'</div>';

          var listug = '<ul><h3>Undergraduate Forms</h3>';
          for(var i=0;i<forms.undergraduateForms.length;i++){
            listug+=('<li><h4>'+forms.undergraduateForms[i].formName+'<a href="'+forms.undergraduateForms[i].href+'">Application Form Link</a></h4></li>');
          }
          listug+='</ul>';
          var ugform = '<div class="form-app">'+listug+'</div>';
          var common = $(gradform+ugform);
          $('.student').featherlight(common);
          $('.resources').append('<div class="student"><h3>'+json.coopEnrollment.title+'</h3></div>');
          var listenroll = '<ul>';
          for(var i=0;i<json.coopEnrollment.enrollmentInformationContent.length;i++){
            listenroll+=('<li><h4>'+json.coopEnrollment.enrollmentInformationContent[i].title+'</h4><p>'+json.coopEnrollment.enrollmentInformationContent[i].description+'</p></li>');
          }
          listenroll+='</ul>';
          var enroll = $('<div class="enroll">'+listenroll+'<a href="'+json.coopEnrollment.RITJobZoneGuidelink+'">RIT JobZone Guide link</a></div>');
          $('.student').featherlight(enroll);

          $('.resources').append('<div class="student"><h3>'+json.studentServices.title+'</h3></div>');
          var services = '<div class ="services"><ul><li><h3>'+json.studentServices.academicAdvisors.title+'</h3></li><p>'+json.studentServices.academicAdvisors.description+'</p>';
          services+='<li><h3>'+json.studentServices.facultyAdvisors.title+'</h3></li><p>'+json.studentServices.facultyAdvisors.description+'</p>';
          services+='<li><h3>'+json.studentServices.professonalAdvisors.title+'</h3></li>';
          var listser='<ul>';
          for(var j=0;j<json.studentServices.professonalAdvisors.advisorInformation.length;j++){
            listser+='<li>'+json.studentServices.professonalAdvisors.advisorInformation[j].name+'</li><li>'+json.studentServices.professonalAdvisors.advisorInformation[j].department+'</li><li>'+json.studentServices.professonalAdvisors.advisorInformation[j].email+'</li></br>'
          }
          listser+='</ul>';
          services+=listser;
          services+='<li><h3>'+json.studentServices.istMinorAdvising.title+'</h3></li>';
          var listmin='<ul>';
          for(var j=0;j<json.studentServices.istMinorAdvising.minorAdvisorInformation.length;j++){
            listmin+='<li>'+json.studentServices.istMinorAdvising.minorAdvisorInformation[j].title+'</li><li>'+json.studentServices.istMinorAdvising.minorAdvisorInformation[j].advisor+'</li><li>'+json.studentServices.istMinorAdvising.minorAdvisorInformation[j].email+'</li></br>'
          }
          listmin+='</ul></div>';
          $('.student').featherlight(services+listmin);
        });

      }); //end of document.ready
      // function courseList(courseID) {
      //   getPost('get',{path:'/minors/course/courseID='+courseID}).done(function(json){
      //     console.log("hi from done");
      //     var item = $('<h3>'+json.title+'</h3><p>'+json.description+'</p></li>');
      //     $('.'+courselist).featherlight(item);
      //   });
      // }
