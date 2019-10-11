

//login.html
function joining()
{
  var id = document.getElementsByName('client_id')[0].value;
  var pw = document.getElementsByName('client_pw')[0].value;

  if(id=='' || pw=='')
    alert("아이디 또는 패스워드를 입력해주세요.");
  else
  {
    $.ajax({url: './test.php',
             data : {
               clientId : id,
               clientpw : pw,
               func : 'joinsuccess'
             },
             type : 'post',
             success: function(data){
               alert(data);
             }
     });

  }
}
function go_null()
{
  document.getElementsByName('client_id')[0].value='';
  document.getElementsByName('client_pw')[0].value='';
}
function login()
{
  var id = document.getElementsByName('client_id')[0].value;
  var pw = document.getElementsByName('client_pw')[0].value;

  if(id=='' || pw=='')
    alert("아이디 또는 패스워드를 입력해주세요.");
  else
  {
    $.ajax({url: './test.php',
             data : {
               clientId : id,
               clientpw : pw,
               func : 'loginsuccess'
             },
             type : 'post',
             success: function(data){
                if(data.substr(0, 4)=="move")
                {
                  location.href="./todolist.html";
                }
                else
                  alert(data);
             }
     });
  }
}
//todolist.html
function onAddList()
{
  document.getElementById('addlist').style.display="block";
}
function onSearch()
{
  document.getElementById('search').style.display="block";
}
function submitList()
{
  var memo = document.getElementById('memo').value;
  var start = document.getElementById('start_date').value;
  var end = document.getElementById('end_date').value;

  if(memo==''||start==''||end=='')
  {
    alert("기입하지 않은 것이 있는 지 확인하시오.");
  }
  else
  {
    var kind = document.getElementById('kind').value;

    if(kind=='가족')
      kind='family';
    else if(kind=='학교')
      kind='school';
    else if(kind=='여행')
      kind='travel';
    else
      kind='sport';

    var filename = "_"+kind+".txt";
    var fileInfo = memo+"|"+start+"|"+end+"\n";

    //파일 만들기
    $.ajax({url: './test.php',
             data : {
               aFilename : filename,
               aFileInfo : fileInfo,
               func : 'makefile'
             },
             type : 'post',
             success: function(data){
               updateList();
               closeAdd();
             }
     });

  }
  document.getElementById('addlist').style.display="none";

}
function updateList()
{
  var famObject = document.getElementById('familyList');
  var schObject = document.getElementById('schoolList');
  var tripObject = document.getElementById('travelList');
  var sptObject = document.getElementById('sportList');

  fileContext('family');
  fileContext('school');
  fileContext('travel');
  fileContext('sport');
}
function fileContext(temp)
{
  var _kindof = "_"+temp+".txt";

  $.ajax({url: './test.php',
           data : {
             kindOf : _kindof,
             func : 'fileContext'
           },
           type : 'post',
           success: function(data){

                if(data!="null\n")
                {
                  var listObject = document.getElementById(temp+'List');

                  var listArray = data.split('\n');

                  for(var i=0; i<listArray.length;i++)
                  {
                    if(listArray[i].indexOf('|')==-1)
                      continue;
                    var thisList = listArray[i].split('|');
                    thisList = thisList[0]+" ("+thisList[1]+" ~ "+thisList[2]+") <span class='glyphicon' onclick='deleteList(\""+listArray[i].toString()+"\", "+temp+")'>&#xe014;</span>";
                    var li = document.createElement('li');
                    li.innerHTML=thisList;
                    listObject.appendChild(li);
                    li.setAttribute('draggable', 'true');
                    li.setAttribute('ondragstart', 'drag(event)');
                    li.setAttribute('id', temp+"_"+i+"_list");
                  }
                }
           }
   });
}
function closeAdd()
{
  document.getElementById('kind').value='가족';
  document.getElementById('memo').value='';
  document.getElementById('start_date').value='';
  document.getElementById('end_date').value='';
  document.getElementById('addlist').style.display="none";
}
function closeSearch()
{
  document.getElementById('keyword').value='';
  document.getElementById('start_date_s').value='';
  document.getElementById('end_date_s').value='';
  document.getElementById('sort').value='메모';
  document.getElementById('search').style.display="none";
}
function searchList()
{
  $.ajax({url: './test.php',
           data : {
             func : 'getFile'
           },
           type : 'post',
           success: function(data){
             if(data!="null\n")
             {
               var keyword = document.getElementById('keyword').value;
               var start = document.getElementById('start_date_s').value;
               var end = document.getElementById('end_date_s').value;

               var allfile = data;
               var newfile = [];
               var nindex = 0;

               allfile = allfile.split('\n');

               for(var i=0;i<allfile.length;i++)
               {
                 if(allfile[i].indexOf('|')==-1)
                  continue;
                 var thisfile = allfile[i].split('|');

                 if(keyword!=''&&start!=''&&end!='')
                 {
                   if(thisfile[0].indexOf(keyword)!=-1&&thisfile[1]>=start&&thisfile[2]<=end)
                   {
                     newfile[nindex]=thisfile;
                     nindex += 1;
                   }
                 }
                 else if(keyword==''&&start!=''&&end!='')
                 {
                   if(thisfile[1]>=start&&thisfile[2]<=end)
                   {
                     newfile[nindex]=thisfile;
                     nindex += 1;
                   }
                 }
                 else if(keyword!=''&&start==''&&end!='')
                 {
                   if(thisfile[0].indexOf(keyword)!=-1&&thisfile[2]<=end)
                   {
                     newfile[nindex]=thisfile;
                     nindex += 1;
                   }
                 }
                 else if(keyword!=''&&start!=''&&end=='')
                 {
                   if(thisfile[0].indexOf(keyword)!=-1&&thisfile[1]>=start)
                   {
                     newfile[nindex]=thisfile;
                     nindex += 1;
                   }
                 }
                 else if(keyword!=''&&thisfile[0].indexOf(keyword)!=-1)
                 {
                   newfile[nindex]=thisfile;
                   nindex += 1;
                 }
                 else if(start!=''&&thisfile[1]>=start)
                 {
                   newfile[nindex]=thisfile;
                   nindex += 1;
                 }
                 else if(thisfile[2]<=end)
                 {
                   newfile[nindex]=thisfile;
                   nindex += 1;
                 }
                 else if(keyword==''&&start==''&&end=='')
                 {
                   newfile[nindex]=thisfile;
                   nindex += 1;
                 }
               }
               //여기까지는 통과
               var up = document.getElementById('up');
               var down = document.getElementById('down');

               if(up.checked==false && down.checked==false)
                alert("출력 형태를 체크해주십시오");
               else if(up.checked==true && down.checked==true)
                alert("둘 중 하나만 체크해주십시오");
               else
               {
                 var sort = document.getElementById('sort').value;
                 var filtered = newfile;

                 sorted_list = filtered.sort(function(a, b){
                    if(sort=='메모')
                    {
                      var p1 = a[0];
                      var p2 = b[0];

                      if(up.checked==true)
                      {
                        if(p1 < p2)
                          return -1;
                        else if(p1 > p2)
                          return 1;
                      }
                      else
                      {
                        if(p1 > p2)
                          return -1;
                        else if(p1 < p2)
                          return 1;
                      }
                    }
                    else if(sort=='시작 날짜')
                    {
                      var p1 = a[1];
                      var p2 = b[1];

                      if(up.checked==true)
                      {
                        if(p1 < p2)
                          return -1;
                        else if(p1 > p2)
                          return 1;
                      }
                      else
                      {
                        if(p1 > p2)
                          return -1;
                        else if(p1 < p2)
                          return 1;
                      }
                    }
                    else if(sort=='끝나는 날짜')
                    {
                      var p1 = a[2];
                      var p2 = b[2];
                      if(up.checked==true)
                      {
                        if(p1 < p2)
                          return -1;
                        else if(p1 > p2)
                          return 1;
                      }
                      else
                      {
                        if(p1 > p2)
                          return -1;
                        else if(p1 < p2)
                          return 1;
                      }
                    }
                    return 0;
                  });
                  if(sorted_list.length>=1)
                  {
                    var searchObject = document.getElementById('result_of_search');

                    if(searchObject.childNodes.length==1)
                      searchObject.removeChild(searchObject.firstChild);

                    var ul = document.createElement('ul');

                    for(var i=0; i<sorted_list.length;i++)//왠지 모르겠지만 null값 두개가 더출력되므로...
                    {
                      var partof = sorted_list[i];
                      partof = partof[0]+" ("+partof[1]+" ~ "+partof[2]+")<br>";
                      var li = document.createElement('li');
                      li.innerHTML=partof;
                      ul.appendChild(li);
                      searchObject.appendChild(ul);
                    }
                  }
                  closeSearch();
                 }
               }
             }

   });

}
function allowDrop(ev)
{
  ev.preventDefault();
}
function drag(ev)
{
  ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev)
{
  ev.preventDefault();

  var data = ev.dataTransfer.getData("text");
  var child = document.getElementById(data);
  var parent = document.getElementById(data).parentNode;//원래부모

  var beforeId = parent.parentNode.getAttribute('id');
  var afterId = '';

  var flag = '';

  if(ev.target.tagName=='TD')
  { //td/ul/li
    afterId = ev.target.getAttribute('id');
    var tdlist = ev.target.childNodes[0];

    if(tdlist.childNodes.length==0)
    {
      tdlist.appendChild(child);
      flag = 'end';
    }
    else
    {
      tdlist.insertBefore(child, tdlist.firstChild);
      flag = 'start';
    }
  }
  else //ev.target.tagName=='LI'
  {
    afterId = ev.target.parentNode.parentNode.getAttribute('id');
    var parent = ev.target.parentNode;

    if(ev.target.nextSibling!=null)
    {
      parent.insertBefore(child, ev.target.nextSibling);

      var beforeOfChild = ev.target.childNodes[0].data;  //child(옮기려는 리스트)가 옮겨질 때 child 앞에 있게 될 리스트
      var splitString = [];

      splitString[0] = beforeOfChild.substring(0, beforeOfChild.indexOf(" ("));
      splitString[1] = beforeOfChild.substring(beforeOfChild.indexOf("(")+1, beforeOfChild.indexOf("(")+11);
      splitString[2] = beforeOfChild.substring(beforeOfChild.indexOf("~")+2, beforeOfChild.indexOf(")"));

      flag = splitString;
    }
    else
    {
      parent.appendChild(child);
      flag = 'end';
    }
  }

  var changeString = child.childNodes[0].data;  //옮길 string

  var splitString = [];

  splitString[0] = changeString.substring(0, changeString.indexOf(" ("));
  splitString[1] = changeString.substring(changeString.indexOf("(")+1, changeString.indexOf("(")+11);
  splitString[2] = changeString.substring(changeString.indexOf("~")+2, changeString.indexOf(")"));

  $.ajax({url: './test.php',
           data : {
             flag : flag,
             string : splitString,
             before : beforeId,
             after : afterId,
             func : 'drag_and_drop'
           },
           type : 'post',
           success: function(data){

           }
   });

}
function deleteList(thisList, temp)
{
  var type = temp.getAttribute('id');
  $.ajax({url: './test.php',
           data : {
             type : type,
             string : thisList,
             func : 'deleteList'
           },
           type : 'post',
           success: function(data){
             location.reload();
           }
   });

}
