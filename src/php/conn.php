<?php
 header("Content-Type: text/html;charset=utf-8"); 
 $servername="qdm217407669.my3w.com";
 $username= "qdm217407669";
 $password= "Apple9787123123";
 $dbname="qdm217407669_db";
 $conn = mysql_connect($servername,$username,$password);
 if(!$conn){
  echo "数据库连接失败！";
 }
mysql_query("set character set 'utf-8'");
mysql_select_db($dbname);
 class Response{
  public static function encodeOperations ($array){
	foreach ((array)$array as $key => $value) {
		if (is_array($value)) {
			$array[$key] = Response::encodeOperations($array[$key]);
		} else {
			$array[$key] =iconv('GBK', 'UTF-8', $value);
		}
	}
	return $array;
  }
  public static function json($code,$message="",$data=array()){
   $result=Array(
    'code'=>$code,
    'message'=>$message,
    'data'=>$data
   );
   echo json_encode($result);
   exit;
  }
 }

?>
