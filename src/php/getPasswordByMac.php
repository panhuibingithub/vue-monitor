<?php
   require_once('conn.php');
   $data =  json_decode(file_get_contents("php://input"));
   $sqla = "SELECT a.`device_id` ,a.`device_name`,a.`device_mac`,a.`device_pwd` ,a.`device_type` ,a.`device_model` ,a.`device_model` ,a.`device_state` ,a.`publish_addr`  FROM `qdm217407669_db`.`m_device` a "
   		   ." where a.`device_mac` =' ".$data->device_mac . "'";
   $result = mysql_query($sqla,$conn);
   $dataarr = array();
   while($row = mysql_fetch_array($result,MYSQL_ASSOC)){
    $dataarr[]=$row;
   }
   $dataarr = Response::encodeOperations($dataarr);
   Response::json(0,'数据返回成功',$dataarr);
?>