<?php
 require_once('../conn.php');
   $sqla = "SELECT `msg_id` ,`user_id` ,`device_id` ,`group_id` ,`user_info` ,`scores` ,`msg_type` ,`msg_content` FROM `qdm217407669_db`.`m_msg` a ";
   $result = mysql_query($sqla,$conn);
   $dataarr = array();
   while($row = mysql_fetch_array($result,MYSQL_ASSOC)){
    $dataarr[]=$row;
   }
   $dataarr = Response::encodeOperations($dataarr);
   Response::json(0,'数据返回成功',$dataarr);
?>
