
var today = new Date();
var startDate = new Date(today.getFullYear(), today.getMonth(), 1);
var lastDate = new Date(today.getFullYear(), today.getMonth()+1, 0);
//달력 만드는 함수
function calendar(){

  var dateOfCal = document.getElementById("calendar");
  var titleOfCal = document.getElementById("titleOfCal");
  titleOfCal.innerHTML = today.getFullYear()+"年 "+(today.getMonth()+1)+"日";
  //dow : day of week(요일)
  var dowOfStart = startDate.getDay();

  var squareOfCal = '';
  for(var i=0;i<42;i++)
  {
    if(i%7==0) squareOfCal = squareOfCal+'<tr>';
    squareOfCal = squareOfCal + '<td';
    if(i<=lastDate.getDate()+dowOfStart-1 && i>=dowOfStart)
    {
      if(i-dowOfStart+1==today.getDate()) squareOfCal = squareOfCal + ' class=now id='+(i-dowOfStart+1)+' OndblClick="callList('+(i-dowOfStart+1)+')"';
      else if(i-dowOfStart+1>today.getDate())  squareOfCal = squareOfCal + ' class=after id='+(i-dowOfStart+1)+' OndblClick="callList('+(i-dowOfStart+1)+')"';
      else squareOfCal = squareOfCal + ' class=before id='+(i-dowOfStart+1)+' ';
      squareOfCal = squareOfCal + '>';
      if(i%7==0) squareOfCal = squareOfCal + '<font color=red>';
      else if(i%7==6) squareOfCal = squareOfCal + '<font color=blue>';
      squareOfCal = squareOfCal + '<p>'+(i-dowOfStart+1)+'</p>';
    }
    else squareOfCal = squareOfCal + '>';
    squareOfCal = squareOfCal + '</td>';

    if(i%7==6) squareOfCal = squareOfCal+'</tr>';
  }
  dateOfCal.innerHTML = squareOfCal;
}
//일정 추가할 때
function callList(i)
{
  document.getElementById('addPlan').style.display="block";
  document.getElementById('notice-add').innerHTML=i+'日 일정추가';

  //cancel 버튼을 누를 경우
  document.getElementById('cancel').onclick=function(){
    document.getElementById('inputPlan').value='';
    document.getElementById('addPlan').style.display="none";
  }
  var parent = document.getElementById(i);  //각 날짜에 해당하는 테이블 칸임, 스케줄들의 부모

  //add버튼을 누를 경우
  document.getElementById('add').onclick=function(){
    var a = document.getElementById('inputPlan').value;
    //스케줄 만들기
    if(a!='')
    {
      var li = document.createElement('div');
      li.id = 'listbox';
      li.innerHTML='<input type="textarea" id="list" value='+a+' /><span id="close" >&times;</span>';

      var closeNode = li.childNodes[1]; //x버튼
      closeNode.addEventListener('click', openEdit);  //x버튼을 클릭하면 수정하는 창이 띄워짐
      parent.appendChild(li);

      document.getElementById('inputPlan').value='';
      document.getElementById('addPlan').style.display="none";
    }
  }
  function openEdit()
  {
    var thislist = this.parentNode; //해당 스케줄(노드)

    var i = thislist.parentNode.id;
    var day = i*1;
    if(i<10) day = "0"+i*1;

    var thisdate; //해당 스케줄의 처음 날짜
    if(today.getMonth()+1<10) thisdate = today.getFullYear()+"-0"+(today.getMonth()+1)+"-"+day;
    else thisdate = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+day;

    var childs = thislist.parentNode.childNodes;  //해당 스케줄이 있는 해당 테이블 칸의 childenode는 하나 빼고 다 스케줄노드임

    var indexOfthis = 0*1;

    for(var a=1;a<childs.length;a++)
    {
      if(childs[a]==thislist)
      {
        indexOfthis=a;
        break;
      }
    }

    document.getElementById('editPlan').style.display="block";
    document.getElementById('edittext').innerHTML='일정 날짜 변경: <input type = "date" id="editDate" value="'+thisdate+'" /><br/>일정 순서 변경: <input type="number" id="editOrder" value="'+indexOfthis+'" min="1" max="'+(childs.length-1)+'"/><br/>';

    //날짜 바꾸면 순서 바꾸는거 disable되는거 구현
    document.getElementById('editDate').onchange=function(){
      if(document.getElementById('editDate').value != thisdate)
        document.getElementById('editOrder').disabled=true;
      else
        document.getElementById('editOrder').disabled=false;
    }
    //delete 버튼을 눌렀을 때
    document.getElementById('delete').onclick=function(){
      thislist.parentNode.removeChild(thislist);
      document.getElementById('editPlan').style.display="none";
    }
    //save 버튼을 눌렀을 때
    document.getElementById('save').onclick=function(){

      //날짜 변경
      if(document.getElementById('editOrder').disabled==true)
      {
        var edate = document.getElementById('editDate').value;
        var todaydate = today.getFullYear()+"-";
        if(today.getMonth()+1<10) todaydate=todaydate+"0"+(today.getMonth()+1)+"-";
        else todaydate = todaydate + (getMonth()+1)+"-";
        if(today.getDate()<10) todaydate=todaydate+"0"+today.getDate();
        else todaydate = todaydate + today.getDate();

        if(edate < todaydate)
        {
          alert("지난 날로 이동이 불가능합니다.");
          document.getElementById('editDate').value = thisdate;
          document.getElementById('editOrder').disabled=false;
        }

        else if(edate.substring(0, 4)!=thisdate.substring(0, 4))
        {
          alert("이번 년도가 아닌 날로 이동이 불가능합니다.");
          document.getElementById('editDate').value = thisdate;
          document.getElementById('editOrder').disabled=false;
        }

        else if(edate.substring(5, 7)!=thisdate.substring(5, 7))
        {
          alert("이번 달이 아닌 날로 이동이 불가능합니다.");
          document.getElementById('editDate').value = thisdate;
          document.getElementById('editOrder').disabled=false;
        }
        else   //날짜 변경 시작
        {
          document.getElementById(edate.substring(8, 10)*1).appendChild(thislist);
          document.getElementById('editPlan').style.display="none";

        }
      }
      else //순서 변경
      {
        var eorder = document.getElementById('editOrder').value;

        if(eorder*1+1==thislist.parentNode.childNodes.length)
        {
          thislist.parentNode.appendChild(thislist);
        }
        else if(thislist==childs[eorder-1])
        {
          thislist.parentNode.insertBefore(childs[eorder], thislist);
        }
        else
          thislist.parentNode.insertBefore(thislist, childs[eorder]);
        document.getElementById('editPlan').style.display="none";
      }
    }
  }
}
//모달 창 어두운부분 클릭해도 닫히게 함
window.onload=function(){
  window.onclick = function(event){
    if(event.target==document.getElementById('addPlan'))
      document.getElementById('addPlan').style.display="none";
    if(event.target==document.getElementById('editPlan'))
      document.getElementById('editPlan').style.display="none";
  }
}
