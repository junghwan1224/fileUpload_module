
$('#ok_button_on_board').click(function(){
  var title = $('#title_name').val();
  var contents = $('#contents').val();
  var now = new Date();
        function leadingZeros(n, digits){
          var zero='';
          n = n.toString();
          if(n.length < digits){
            for(i = 0 ; i < digits - n.length; i++){
              zero += '0';
            }
          }
          return zero + n;
        }
  var post_date = leadingZeros(now.getYear()-100,2)+ '-'+
                  leadingZeros(now.getMonth()+1,2)+'-' +
                  leadingZeros(now.getDate(),2);




  if(title=='')
  alert("제목을 입력하세요");
  else if(contents == '')
  alert("내용을 입력하세요");
  else{

    var data2 = new FormData();
    data2.append('title', title);
    data2.append('contents', contents);
    data2.append('date', post_date);
    data2.append('upload_file', $('input[name=board_file]')[0].files[0]);

    $.ajax({
      type: 'POST',
      url: '/board/goBoard',
      contentType:false,
      processData: false,
      data: data2,
      success: function(result) {
        if (result['result']=='success'){
          console.log(data2);
          alert('등록완료 file');
          location.reload();
        }
        else{
          console.log(result);
          alert('등록실패1 file');
        }
      },
      error: function(error){
        alert('등록실패2 file');
      }
    });


  }
});
