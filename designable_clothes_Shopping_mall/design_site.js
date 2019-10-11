//-------------------- 디자인 ----------------------//
//디자인 버튼을 누르면 불러오기 창이 없어지고 디자인 창이 뜸
function clickstore()
{
  document.getElementById('left').childNodes[1].style.display = "none";
  document.getElementById('right').childNodes[1].style.display = "none";

  document.getElementById('call_modal').style.display = "none";
  document.getElementById('store_modal').style.display = "block";

  document.getElementById('start_design_modal').style.display = "block";
  document.getElementById('start_upload_modal').style.display = "none";
}
//client id를 화면 상단에 띄워놓음
function showClientId()
{
  var a = document.getElementById('clienet');

  $.ajax({url: './server.php',
           data : {
             func : 'showid'
           },
           type : 'post',
           success: function(data){
             document.getElementById('client').innerHTML = data;
           }
   });
}
//옷 선택하는 함수
function selectClothes()
{
  var clothes = document.getElementById('clothes');

  if(clothes.value == ' ' || clothes.value == '' )
    alert("옷 종류를 선택해 주십시오");
  else if(clothes.value == '반팔')
    document.getElementById('imagediv').innerHTML = '<image src="./clothes/t_shirt.png" id="designimg" alt="t_shirt" style="width:325px;height:325px;">';
  else if(clothes.value == '긴팔')
    document.getElementById('imagediv').innerHTML = '<image src="./clothes/sleeve.png" id="designimg" alt="sleeve" style="width:390px;height:325px;">';
  else if(clothes.value == '긴바지')
    document.getElementById('imagediv').innerHTML = '<image src="./clothes/jean.png" id="designimg"  alt="jean" style="width:247px;height:364px;">';
  else if(clothes.value == '반바지')
    document.getElementById('imagediv').innerHTML = '<image src="./clothes/pants.png" id="designimg" alt="pants" style="width:325px;height:325px;">';
  else if(clothes.value == '긴치마')
    document.getElementById('imagediv').innerHTML = '<image src="./clothes/skirt_l.png" id="designimg" alt="long skirt" style="width:364px;height:364px;">';
  else if(clothes.value == '짧은치마')
    document.getElementById('imagediv').innerHTML =  '<image src="./clothes/skirt_s.png" id="designimg" alt="short skirt" style="width:325px;height:325px;">';
  else
    document.getElementById('imagediv').innerHTML = '<image src="./clothes/hood.png" id="designimg" alt="hood" style="width:299px;height:325px;">';

  getPrice(); //가격 업데이트

}
//색상 선택하는 코드 -------------------------------------------
var textColorBox=true;

function selectColor(color){

  document.cc.textColor.value = "#"+color;  //img에 칼라 적용
  document.getElementById('imagediv').childNodes[0].style.background=document.cc.textColor.value;

  ContentColor.style.display="none";
  //덮어쓰기

  getPrice(); //가격 업데이트
}

function cColor(){
  if(document.getElementById('clothes').value==' '||document.getElementById('clothes').value=='')
    alert("옷 종류를 선택해 주세요");
  else if(textColorBox){
   ContentColor.style.display="block";
   var RGB="000000#FFFFFF#FFCCFF#FF99FF#FF66FF#FF33FF#FF00FF#FFFFCC#FFCCCC#FF99CC#FF66CC#FF33CC#FF00CC#FFFF99#FFCC99#FF9999#FF6699#FF3399#FF0099#FFFF66#FFCC66#FF9966#FF6666#FF3366#FF0066#FFFF33#FFCC33#FF9933#FF6633#FF3333#FF0033#FFFF00#FFCC00#FF9900#FF6600#FF3300#FF0000#CCFFFF#CCCCFF#CC99FF#CC66FF#CC33F#CC00FF#CCFFCC#CCCCCC#CC99CC#CC66CC#CC33CC#CC00CC#CCFF00#CCCC99#CC9999#CC6699#CC3399#CC0099#CCFF66#CCCC66#CC9966#CC6666#CC3366#CC0066#CCFF33#CCCC33#CC9933#CC6633#CC3333#CC0033#CCFF00#CCCC00#CC9900#CC6600#CC3300#CC0000#99FFFF#99CCFF#9999FF#9966FF#9933FF#9900FF#99FFCC#99CCCC#9999CC#9966CC#9933CC#9900CC#99FF99#99CC99#999999#996699#993399#990099#99FF66#99CC66#999966#996666#993366#990066#99FF33#99CC33#999933#996633#993333#990033#99FF00#99CC00#999900#996600#993300#990000#66FFFF#66CCFF#6699FF#6666FF#6633FF#6600FF#66FFCC#66CCCC#6699CC#6666CC#6633CC#6600CC#66FF99#66CC99#669999#666699#663399#660099#66FF66#66CC66#669966#666666#663366#660066#66FF33#66CC33#669933#666633#663333#660033#66FF00#66CC00#669900#666600#663300#660000#33FFFF#33CCFF#3399FF#3366FF#3333FF#3300FF#33FFCC#33CCCC#3399CC#3366CC#3333CC#3300CC#33FF99#33CC99#339999#336699#333399#330099#33FF66#33CC66#339966#336666#333366#330066#33FF33#33CC33#339933#336633#333333#330033#33FF00#33CC00#339900#336600#333300#330000#00FFFF#00CCFF#0099FF#0066FF#0033FF#0000FF#00FFCC#00CCCC#0099CC#0066CC#0033CC#0000CC#00FF99#00CC99#009999#006699#003399#000099#00FF66#00CC66#009966#006666#003366#000066#00FF33#00CC33#009933#006633#003333#000033#00FF00#00CC00#009900#006600#003300#000000";
   RGBColorArray=RGB.split("#");
   var tag="<table border=1 bordercolor=#000000 cellspacing=0 cellpadding=0 bgcolor=#ffffff><tr>";
   for(var i=1;i<RGBColorArray.length;){
    tag=tag+"<tr>";
    for(var j=0;j<12;j++){
     tag=tag+"<td bgcolor=#"+RGBColorArray[i]+" width=15 height=15 ondblclick=selectColor('"+RGBColorArray[i]+"')></td>";
     i++;
     if(RGBColorArray==i) break;
    }
    tag=tag+"</tr>";
  }
   tag=tag+"</table>";
   ContentColor.innerHTML=tag;
   textColorBox=false;
   //색상과 패턴 둘 중 하나만 입력되게 하기 위함
   if(document.getElementById('hidden_file').innerHTML!=""&&document.getElementById('pattern').files.length!=0)
   {
     document.getElementById('hidden_file').innerHTML="";
   }
   getPrice();  //가격 업데이트
}
else{
   ContentColor.innerHTML="";
   textColorBox=true;
}

}
//색상 삭제
function deleteColor()
{
  document.getElementsByName('textColor')[0].value="";
  if(document.getElementById('hidden_file').innerHTML!="")
    document.getElementById('designimg').style.background="#FFFFFF";  //옷 색 초기화
  getPrice(); // 가격 업데이트
}
//무늬 넣는 함수
function putPattern()
{
    var x = document.getElementById("pattern");

    if(x!="" && x!=null)
    {
      var txt = "";

      if(x.files.length==0)
       alert("파일을 취소하였습니다.");
      else
      { //사용자가 직접 패턴 파일을 업로드하여 그 업로드된 이미지를 배경으로 지정한다
        var reader = new FileReader();

        var file = x.files[0];
        reader.readAsDataURL(file);
        reader.onload = function(){
         var nowstyle = document.getElementById('designimg').getAttribute('style');
         document.getElementById('designimg').style=nowstyle+"background-image:url('"+reader.result+"');";
        }
      }
    }
  document.getElementsByName('textColor')[0].value="";  //패턴과 색상 둘 중 하나만 적용되게 하기 위함
  getPrice(); //가격 업데이트
}
function addPattern() //패턴을 추가하기 위해 hidden file에 file tage 추가
{
  if(document.getElementById('clothes').value==' '||document.getElementById('clothes').value=='')
    alert("옷 종류를 선택해 주세요");
  else
    document.getElementById('hidden_file').innerHTML = "<input type=file id='pattern' onchange='putPattern()'>";
}
//무늬 삭제
function deletePattern()
{
  //document.getElementById('pattern').files=null;
  if(document.getElementsByName('textColor')[0].value!="")
    document.getElementById('designimg').style.background="#FFFFFF";  //옷 색 초기화
  document.getElementById('hidden_file').innerHTML="";
  getPrice(); //가격 업데이트
}
//글자 넣는 함수
function lettering()
{
  var letter = document.getElementById('letter');

  var clothes = document.getElementById('clothes');

  if(clothes.value == ' ')
    alert("옷 종류를 선택해 주십시오");
  else if(letter.value == '')
    alert("글자를 입력해주세요");
  else {
    {
      var div = document.getElementById('moveletter');
      div.innerHTML=letter.value;
      getPrice();   //가격 업데이트
    }
  }
}
//글자 삭제
function deleteletter()
{
  document.getElementById('moveletter').innerHTML="";
  document.getElementById('letter').value="";
  getPrice();   //가격 업데이트
}
function addIcon()  //아이콘 추가하는 함수
{
  if(document.getElementById('clothes').value=="선택"||document.getElementById('clothes').value=='')
    alert("옷 종류를 선택해 주십시오");
  else    //아이콘을 추가하기 위해 hidden icon에 file tag 추가
    document.getElementById('hidden_icon').innerHTML = "<input type=file id='icon' onchange='putIcon()'>";
}
//옷에 그림 넣는 함수
function putIcon()
{
  var x = document.getElementById("icon");

  if(x!="" && x!=null)
  {
    var txt = "";

    if(x.files.length==0)
     alert("파일을 취소하였습니다.");
    else
    {
      var reader = new FileReader();

      var file = x.files[0];  //파일을 사용자가 직접 업로드하면 그 업로드된 아이콘 파일을 꾸미는 데 이용
      reader.readAsDataURL(file);
      reader.onload = function(){
       document.getElementById('iconlist').style.display='block';
       document.getElementById("iconlist").src = reader.result;
      }
    }
  }
  else {
    document.getElementById('iconlist').style.display='none';
  }
  getPrice(); //가격 업데이트
}
//그림 삭제
function deleteIcon()
{
  document.getElementById('iconlist').style.display='none';
  document.getElementById('hidden_icon').innerHTML="";
  getPrice(); //가격 업데이트
}
//--------마우스로 글자 혹은 그림을 움직이게 하는 코드
var img_L = 0;
var img_T = 0;
var targetObj;

function getLeft(o){
  return parseInt(o.style.left.replace('px', ''));
}
function getTop(o){
  return parseInt(o.style.top.replace('px', ''));
}

 // 이미지 움직이기
function moveDrag(e){
  var e_obj = window.event? window.event : e;
  var dmvx = parseInt(e_obj.clientX + img_L);
  var dmvy = parseInt(e_obj.clientY + img_T);
  targetObj.style.left = dmvx +"px";
  targetObj.style.top = dmvy +"px";
  return false;
 }

 // 드래그 시작
function startDrag(e, obj){
  targetObj = obj;
  var e_obj = window.event? window.event : e;
  img_L = getLeft(obj) - e_obj.clientX;
  img_T = getTop(obj) - e_obj.clientY;

  document.onmousemove = moveDrag;
  document.onmouseup = stopDrag;
  if(e_obj.preventDefault) e_obj.preventDefault();
 }

 // 드래그 멈추기
function stopDrag(){
  document.onmousemove = null;
  document.onmouseup = null;
}
//가격을 매기는 함수
function getPrice()
{
     var price = 0;

     if(document.getElementById('clothes').value!="선택"&&document.getElementById('clothes').value!="")
       price = 15000;
     if(document.getElementsByName('textColor')[0].value!="" && document.getElementsByName('textColor')[0].value!="#FFFFFF")
       price = price + 5000;
     else if(document.getElementById('hidden_file').innerHTML!=""&&document.getElementById('pattern').files.length!=0)
       price = price + 8000;
     if(document.getElementById('letter').value!="")
       price = price + 5000;
     if(document.getElementById('iconlist').src!="./clothes/designicon.png")
       price = price + 6000;

     document.getElementById('price_design').innerHTML=price;
 }
 //사용자가 디자인 한 것을 저장
 function storeNewDesign()
 {
   if(document.getElementById('clothes').value=="선택"||document.getElementById('clothes').value=="")
    alert("디자인된 옷이 없습니다.");
   else {
     var canvas ="";
     html2canvas($("#start_design_modal"), {  //div를 캡쳐하는 코드
       onrendered: function(canvas) {
         var photo = canvas.toDataURL('image/png');
         var price = document.getElementById('price_design').innerHTML;
         $.ajax({
           method : 'POST',
           url : './server.php',
           data : {
             photo : photo,
             price : price,
             func : 'capture'
           },
           success: function(data){
              alert(data);
              location.href = location.href;
           }
         });
      }
     });
   }
 }

 //---------------불러오기---------------//

var imagelist = []; //사용자가 주문한 이미지에 대한 경로를 배열로 만듦
var i = 0; //imagelist 순서

//불러오기 버튼을 누르면 디자인 하는 창이 없어지고 불러오는 창이 뜸
function clickcall()
{
  document.getElementById('store_modal').style.display = "none";
  document.getElementById('call_modal').style.display = "block";

  document.getElementById('start_design_modal').style.display = "none";
  document.getElementById('start_upload_modal').style.display = "block";

  document.getElementById('left').childNodes[1].style.display = "block";
  document.getElementById('right').childNodes[1].style.display = "block";

  //저장된 디자인 파일을 불러온다 (로드 후 맨 처음 화면이므로 첫번째 이미지 파일을 띄운다)
  $.ajax({
    method : 'POST',
    url : './server.php',
    data : {
      func : 'load'
    },
    success: function(data){  //data : 사용자의 폴더(id_info 디렉토리)에 있는 모든 디자인 파일 이름
      if(data=="\n" || data=="")
        alert("디자인이 존재하지 않습니다.");
      else {
        var imagelist = data.split('||');
        var cid = document.getElementById('client').innerHTML;  //디자인 파일을 load
        document.getElementById('load_image').innerHTML = "<img src='./"+cid+"_info/"+imagelist[0]+"' alt='undefined' id='userimg' style='width:300px;height:300px;'>";
        showDesignName();

        var forDesignInfo = "";

        for(var i = 0 ;i<imagelist.length;i++)  //오른쪽 창이 사용자의 주문 화면이므로 저장되어있는 디자인들을 체크박스와 함께 출력
        {
          if(imagelist[i]!="" && imagelist[i]!="\n")
            forDesignInfo = forDesignInfo+imagelist[i].replace(".png", "")+"    <input type=checkbox><br>";
        }

        document.getElementById('design_info').innerHTML = forDesignInfo;
      }
    }
  });
}
//next 버튼을 누르면 다음 디자인을 띄움
function nextDesign()
{
  var cid = document.getElementById('client').innerHTML;
  var nowImage = document.getElementById('userimg').src;

  $.ajax({
    method : 'POST',
    url : './server.php',
    data : {
      func : 'load'
    },
    success: function(data){
      if(data=="\n" || data=="")
        alert("디자인이 존재하지 않습니다.");
      else {
        var imagelist = data.split('||');

        for(var i = 0;i<imagelist.length;i++)
        {
          if(nowImage.indexOf(imagelist[i])!==-1)
          {
            if(i==imagelist.length-2) //||를 기준으로 자르느라 마지막 값이 null값인 채로 있기 때문에 length-2
            {
              alert("다음 디자인이 존재하지 않습니다.");
              break;
            }
            else
            {//현재 이미지의 다음 이미지 이므로 i+1
              document.getElementById('load_image').innerHTML = "<img src='./"+cid+"_info/"+imagelist[i+1]+"' alt='undefined' id='userimg' style='width:300px;height:300px;'>";
              showDesignName();
              break;
            }
          }
        }
      }
    }
  });
}
//prev 버튼을 누르면 이전 디자인을 띄움
function prevDesign()
{
  var cid = document.getElementById('client').innerHTML;
  var nowImage = document.getElementById('userimg').src;

  $.ajax({
    method : 'POST',
    url : './server.php',
    data : {
      func : 'load'
    },
    success: function(data){
      if(data=="\n" || data=="")
        alert("디자인이 존재하지 않습니다.");
      else {
        var imagelist = data.split('||');

        for(var i = 0;i<imagelist.length;i++)
        {
          if(nowImage.indexOf(imagelist[i])!==-1)
          {
            if(i==0)
            {
              alert("이전 디자인이 존재하지 않습니다.");
              break;
            }
            else
            {//현재 이미지의 이전 이미지 이므로 i-1
              document.getElementById('load_image').innerHTML = "<img src='./"+cid+"_info/"+imagelist[i-1]+"' alt='undefined' id='userimg' style='width:300px;height:300px;'>";
              showDesignName();
              break;
            }
          }
        }
      }
    }
  });
}
//load된 디자인 사진들 밑에 해당 사진의 이름과 가격을 띄움
function showDesignName()
{
    var nowImage = document.getElementById('userimg').src;
    var cid = document.getElementById('client').innerHTML;
    cid = cid.replace("\n", "");
    //src가 절대주소로 되므로 http:// ~ /id_info/ 까지 다 지운다
    var toRemoved = nowImage.indexOf("/"+cid+"_info/");
    var removed = nowImage.substr(0, toRemoved);
    removed = removed+"/"+cid+"_info/";
    var nowName = nowImage.replace(removed, "");
    nowName = nowName.replace(".png", "");  //.png도 지운다

    nowPrice = nowName.split("_")[2]; //2번째 단어가 가격이다
    document.getElementById('design_name').innerHTML = nowName+"<br><br>price : "+nowPrice;
    //이름과 가격 함께 출력
}
//주문을 하는 함수
function order()
{
  if(confirm("정말 주문하시겠습니까?"))
  {
    //order_list.txt에 주문 내역 저장
    var design_info = document.getElementById('design_info');
    if(design_info.innerHTML=="")
      alert("주문 할 디자인이 없습니다.");
    else
    {
      var infos = design_info.childNodes;
      var orderlist = "";
      for(var i = 1 ; i<infos.length;i=i+3) //체크된 파일을 저장(index 1, 4, 7, ..이 체크박스이며, index 0, 3, 6, ...이 해당 디자인 이미지 파일)
      {
        if(infos[i].checked==true)
        {
          orderlist = orderlist+infos[i-1].data+"\n";
        }
      }
      if(orderlist=="")
      {
        alert("주문할 디자인을 체크해주십시오");
      }
      else
      {
        $.ajax({
          method : 'POST',
          url : './server.php',
          data : {
            orderlist : orderlist,
            func : 'orderlist'
          },
          success: function(data){
            alert(data);  //잘 저장되었다는 알림
            location.href=location.href;
          }
        });
      }
    }
  }
  else
    alert("좀 더 생각하시고 결정해주세요 :)");
}
function checkOrder()
{
  $.ajax({
    method : 'POST',
    url : './server.php',
    data : {
      func : 'myorder'
    },
    success: function(data){
      alert(data);  //사용자 개인의 주문 내역을 alert로 띄워줌
    }
  });
}
