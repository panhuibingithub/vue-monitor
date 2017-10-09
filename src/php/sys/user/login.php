<?php
   require_once('../../conn.php');
   $data = json_decode(file_get_contents("php://input"));
   $sqla ="SELECT a.`user_id` ,a.`user_name` ,a.`telephone`,a.`password`,a.`user_role` FROM `m_account` a WHERE  a.`user_name` = '".$data->user_name
   			."' and `password` = '".$data->password."'";
   $result = mysql_query($sqla,$conn);
   $dataarr = array();
   while($row = mysql_fetch_array($result,MYSQL_ASSOC)){
    $dataarr[]=$row;
   }
   $dataarr = Response::encodeOperations($dataarr);
   if(count($dataarr)>0){
   	  Response::json(0,'数据返回成功',$dataarr);
   }else{
   	  Response::json(-1,'用户名或密码错误!',$dataarr);
   }
   
?>