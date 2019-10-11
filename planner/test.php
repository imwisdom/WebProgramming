<?php
$func = $_POST['func'];

function joinsuccess($cid, $cpw)
{
  $person = fopen('./data/person.txt', "r") or die("unable");
  $isExist = 0;

  while(!feof($person))
  {
    $info = explode("|", fgets($person));
    if($info[0]==$cid)
    {
      echo "이미 존재하는 아이디가 있습니다.";
      $isExist = 1;
      break;
    }
  }
  if($isExist==0)
  {
    $person = fopen('./data/person.txt', "a") or die("unable");
    fwrite($person, $cid."|".$cpw."\n");

    fclose($person);

    echo "성공적으로 저장되었습니다.";
  }
}

function loginsuccess($cid, $cpw)
{
  $person = fopen('./data/person.txt', "r") or die("unable");

  $isExist = 0;

  while(!feof($person))
  {
    $info = explode('|', fgets($person));

    if($info[0]==$cid)
    {
      $isExist = 1;
      if($info[1]==$cpw."\n")
      {
        echo "move";

        session_start();
        $_SESSION['user_id'] = $cid;
      }
      else
      {
        echo "패스워드가 틀립니다.";
      }
      break;
    }
  }
  if($isExist==0)
    echo "존재하지 않는 아이디입니다.";
}

function makefile($fileName, $fileInfo)
{
  session_start();
  $id = $_SESSION['user_id'];

  $data = fopen("./data/".$id.$fileName, "a") or die("unable");
  fwrite($data, $fileInfo);
  fclose($data);
}
function fileContext($kindOf)
{
  session_start();
  $id = $_SESSION['user_id'];
  if(file_exists("./data/".$id.$kindOf))
  {
      $data = file_get_contents("./data/".$id.$kindOf);
      echo $data;
  }
  else {
    echo "null";
  }
}
function getFile()
{
  session_start();
  $id = $_SESSION['user_id'];

  $data = "";
  if(file_exists("./data/".$id."_family.txt"))
    $data = file_get_contents("./data/".$id."_family.txt", "a");
  if(file_exists("./data/".$id."_travel.txt"))
    $data = $data.file_get_contents("./data/".$id."_travel.txt", "a");
  if(file_exists("./data/".$id."_school.txt"))
    $data = $data.file_get_contents("./data/".$id."_school.txt", "a");
  if(file_exists("./data/".$id."_sport.txt"))
    $data = $data.file_get_contents("./data/".$id."_sport.txt", "a");

  if($data =="")
    echo "null";
  else
    echo $data;

}
function drag_and_drop($flag, $string, $before, $after)
{
  session_start();
  $id = $_SESSION['user_id'];
  //전 항목에서 삭제
  $data = file_get_contents("./data/".$id."_".$before.".txt");

  $data = str_replace($string[0]."|".$string[1]."|".$string[2]."\n", "", $data);

  $beforeFile = fopen("./data/".$id."_".$before.".txt", "w") or die("unable1");
  fwrite($beforeFile, $data);
  fclose($beforeFile);

  //새로운 항목에서 추가
  $newdata = $string[0]."|".$string[1]."|".$string[2]."\n";  //추가할것

  if($flag=="start")
  {
    $afterData = file_get_contents("./data/".$id."_".$after.".txt");
    $afterData = $newdata.$afterData;

    $afterFile = fopen("./data/".$id."_".$after.".txt", "w") or die("unable1");
    fwrite($afterFile, $afterData);

    fclose($afterFile);
  }
  else if($flag=="end")
  {
    $afterFile = fopen("./data/".$id."_".$after.".txt", "a") or die("unable2");
    fwrite($afterFile, $newdata);

    fclose($afterFile);
  }
  else
  {
    $sibling = $flag[0]."|".$flag[1]."|".$flag[2]."\n";
    $afterFile = fopen("./data/".$id."_".$after.".txt", "r") or die("unable3");
    $afterData = '';

    $getData = '';
    while(!feof($afterFile))
    {
      $getLine = fgets($afterFile);
      $getData = $getData.$getLine;

      if($getLine==$sibling)
      {
        $getData = $getData.$newdata;
      }
    }
    fclose($afterFile);
    $afterFile = fopen("./data/".$id."_".$after.".txt", "w") or die("unable4");
    fwrite($afterFile, $getData);
    fclose($afterFile);
  }
}
function deleteList($string, $type)
{
  session_start();
  $id = $_SESSION['user_id'];
  $data = file_get_contents("./data/".$id."_".$type.".txt");

  $data = str_replace($string,"", $data);

  $beforeFile = fopen("./data/".$id."_".$type.".txt", "w") or die("unable1");
  fwrite($beforeFile, $data);
  fclose($beforeFile);
}
switch($func){
  case 'joinsuccess' :
    $clientId = $_POST['clientId'];
    $clientpw = $_POST['clientpw'];
    joinsuccess($clientId, $clientpw);
    break;
  case 'loginsuccess' :
    $clientId = $_POST['clientId'];
    $clientpw = $_POST['clientpw'];
    loginsuccess($clientId, $clientpw);
    break;
  case 'makefile' :
    $fileName = $_POST['aFilename'];
    $fileInfo = $_POST['aFileInfo'];
    makefile($fileName, $fileInfo);
    break;
  case 'fileContext' :
    $kindOf = $_POST['kindOf'];
    fileContext($kindOf);
    break;
  case 'getFile' :
    getFile($keyword, $start, $end);
    break;
  case 'drag_and_drop' :
    $flag = $_POST['flag'];
    $string = $_POST['string'];
    $before = $_POST['before'];
    $after = $_POST['after'];
    drag_and_drop($flag, $string, $before, $after);
    break;
  case 'deleteList' :
    $string = $_POST['string'];
    $type = $_POST['type'];
    deleteList($string, $type);
    break;

}
?>
