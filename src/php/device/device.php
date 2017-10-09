<?php
 require_once('../conn.php');
   $sqla = "SELECT a.`device_id` ,a.`device_name`,a.`device_mac`,a.`device_ip`,a.`device_account`,a.`device_pwd` ,a.`device_ip` ,a.`device_model` ,a.`device_state` ,a.`publish_addr`  FROM `qdm217407669_db`.`m_device` a ";
   $result = mysql_query($sqla,$conn);
   $dataarr = array();
   while($row = mysql_fetch_array($result,MYSQL_ASSOC)){
    $dataarr[]=$row;
   }
   $dataarr = Response::encodeOperations($dataarr);
   Response::json(0,'数据返回成功',$dataarr);
?>
