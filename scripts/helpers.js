// Methods to fetch the data

function getPost(getPost,d){
  return $.ajax({
        type:getPost,
        dataType:'json',
        data:d,
        cache:false,
        async:true,
        url:"proxy.php"
      })
  }

  function getdata(getPost,d){
    return $.ajax({
          type:getPost,
          dataType:'html',
          data:d,
          cache:false,
          async:true,
          url:"proxy.php"
        })
    }
