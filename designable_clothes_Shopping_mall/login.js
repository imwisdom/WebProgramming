function login()
{
  var _id = document.getElementsByName('login_id')[0].value;
  var _pw = document.getElementsByName('login_pw')[0].value;

  if(_id=='' || _pw=='' )
  {
      alert("입력하지 않은 값이 있는지 확인하시오.");
  }
  else
  {
    $.ajax({url: './server.php',  //id와 pw 값을 server에서 검사
             data : {
               id : _id,
               pw : _pw,
               func : 'loginsuccess'
             },
             type : 'post',
             success: function(data){
                if(data.substr(0, 4)=="move")
                {
                  alert("로그인에 성공하였습니다.");
                  location.href="./design_site.html"; //성공하면 디자인 사이트로 이동
                }
                else
                  alert(data);
             }
     });
  }

}
//회원가입 하는 함수
function joining()
{
  var _name = document.getElementsByName('client_name')[0].value;
  var _id = document.getElementsByName('client_id')[0].value;
  var _pw = document.getElementsByName('client_pw')[0].value;
  var _tel = document.getElementsByName('client_tel')[0].value;
  var _date = document.getElementsByName('client_date')[0].value;
  var _dist = document.getElementsByName('client_dist')[0].value;

  if(_name=='' || _id=='' || _pw=='' || _tel=='' || _date=='' || _dist=='')
    alert("입력하지 않은 값이 있는지 확인하시오.");
  else
  {
    $.ajax({url: './server.php',  //서버에 사용자가 입력한 정보들을 저장
             data : {
               name : _name,
               id : _id,
               pw : _pw,
               tel : _tel,
               date : _date,
               dist : _dist,
               func : 'joinsuccess'
             },
             type : 'post',
             success: function(data){
               alert(data);
             }
     });
  }
}
