<?php
$func = $_POST['func'];

function loginsuccess($cid, $cpw) //로그인 함수
{
  $memberFile = fopen('./member_list.txt', "r") or die("undefined");
  //member list에 있어야 로그인 가능
  $isExist=0;

  while(!feof($memberFile))
  {
    $info = explode("|", fgets($memberFile));

    if($info[0]==$cid)
    {
      $isExist = 1;
      if($info[1] == $cpw."\n")
      {
        session_start();  //로그인이 성공하면 세션에 id 저장
        $_SESSION['user_id']=$cid;

        echo "move".$_SESSION['user_id'];
      }
      else {
        echo "패스워드가 틀립니다.";
      }
      break;
    }
  }
  if($isExist==0)
  {
    echo "존재하지 않는 아이디입니다.";
  }


} //회원가입 하는 함수
function joinsuccess($cid, $cpw, $cname, $ctel, $cdate, $cdist)
{
  $memberFile = fopen('./member_list.txt', "r") or die("unable1");
  $isExist = 0;
  //member list 파일에 아이디가 이미 있으면 안됨
  while(!feof($memberFile))
  {
    $info = explode("|", fgets($memberFile));
    if($info[0]==$cid)
    {
      echo "이미 존재하는 아이디가 있습니다.";
      $isExist = 1;
      break;
    }
  }
  if($isExist==0)
  {
    $memberFile = fopen('./member_list.txt', 'a') or die("unable2");
    fwrite($memberFile, $cid."|".$cpw."\n");  //멤버 저장
    fclose($memberFile);

    mkdir("./".$cid."_info", 0777, true);
    //회원가입이 성공하여 정식 회원이 되면 사용자만의 id_info 디렉토리가 생성되고, id_info.txt 텍스트파일에 정보 저장
    $client_info = fopen('./'.$cid.'_info/'.$cid.'_info.txt', "a") or die("unable3");
    fwrite($client_info, $cname."\n".$cid."\n".$cpw."\n".$ctel."\n".$cdate."\n".$cdist."\n");

    fclose($client_info);

    echo "성공적으로 저장되었습니다.";
  }
}
function showid() //id를 화면에 띄워놓기 위한 함수
{
  session_start();
  $id = $_SESSION['user_id'];
  echo $id;
}
function capture($photo, $price)  //캡쳐하는 함수
{
  list($type, $photo) = explode(';', $photo);
  list(, $photo)      = explode(',', $photo);
  $data = base64_decode($photo);

  session_start();
  $id = $_SESSION['user_id'];
  //캡쳐하여 이미지파일로 저장
 
  file_put_contents('./'.$id.'_info/'.$id.'_'.date("Y-m-d").'_'.$price.'_'.time().'.png', $data);
  echo "저장되었습니다.";
  die;

}
function load() //사용자가 디자인 한 것을 load하기 위한 함
{
  session_start();
  $id = $_SESSION['user_id'];

  if(!is_dir("./".$id."_info"))
  {
    echo "저장된 디자인이 존재하지 않습니다.";
  }
  else
  {
    $dir = opendir("./".$id."_info") or die("undefined");

    $files = "";

    while(($filename = readdir($dir))!=false)
    {
      $length = strlen($filename);

      if(substr($filename, $length-3)=="png") //사용자만의 디렉토리 id_info 폴더에 png파일이 있으면 디자인 이미지이므로 js쪽으로 넘긴다
      {
        $files = $files.$filename.'||';
      }
    }
    closedir($dir);

    echo $files;
  }

}
function orderlist($orderlist)  //운영자 시점 전체 주문 리스트
{ //여기서 js가 준 data인 $orderlist가 사용자가 주문한 리스트이므로 이를 통째로 order_list.txt에 넣음
  $orderfile = fopen('./order_list.txt', 'a') or die("unable2");
  fwrite($orderfile, $orderlist);

  fclose($orderfile);

  session_start();
  $id = $_SESSION['user_id'];

  $myorder = fopen('./'.$id.'_info/'.$id.'_order.txt', "a") or die("unable3");

  fwrite($myorder, $orderlist);
  fclose($myorder);

  echo "주문이 접수되었습니다.";
}
function myorder()  //사용자 자신의 주문 현황을 볼 수 있음
{
  session_start();
  $id = $_SESSION['user_id'];

  $orderfile = fopen('./'.$id.'_info/'.$id.'_order.txt', 'r') or die("unable2");

  $orderdata = "";
  while(!feof($orderfile))
  {
    $orderdata = $orderdata.fgets($orderfile);
  }

  if($orderdata=="")
    echo "접수된 주문이 없습니다.";
  else {
    echo $orderdata;
  }

} //js상에서 func 값을 넘겨받으면 그 func 값에 맞게 함수 실행
switch($func){
  case 'loginsuccess' :
    $clientId = $_POST['id'];
    $clientpw = $_POST['pw'];
    loginsuccess($clientId, $clientpw);
    break;
  case 'joinsuccess' :
    $clientId = $_POST['id'];
    $clientpw = $_POST['pw'];
    $clientName = $_POST['name'];
    $clientTel = $_POST['tel'];
    $clientDate = $_POST['date'];
    $clientDist = $_POST['dist'];
    joinsuccess($clientId, $clientpw, $clientName, $clientTel, $clientDate, $clientDist);
    break;
  case 'showid' :
    showid();
    break;
  case 'capture' :
    $photo = $_POST['photo'];
    $price = $_POST['price'];
    capture($photo, $price);
    break;
  case 'load' :
    load();
    break;
  case 'orderlist':
    $orderlist = $_POST['orderlist'];
    orderlist($orderlist);
    break;
  case 'myorder':
    myorder();
    break;
}



?>

