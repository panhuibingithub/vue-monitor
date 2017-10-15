<?php
require_once ('../conn.php');
$data = json_decode(file_get_contents("php://input"));
$sqla = " INSERT INTO  `m_user`(`user_id` ,`user_id` ,`device_id` ,`group_id` ,`user_info` ,`scores` ,`msg_type` ,`msg_content` ) VALUES ((SELECT if(MAX(b.`msg_id`),MAX(b.`msg_id`)+1,0) from `m_msg` b),'" 
	. $data -> user_id . "','" 
	. $data -> device_id . "','" 
	. $data -> group_id . "','" 
	. $data -> user_info . "','" 
	. $data -> scores . "','" 
	. $data -> msg_type . "','" 
	. $data -> msg_content . "')";
mysql_query("SET NAMES 'utf8'");
if (!mysql_query($sqla, $conn)) {
	$dataarr = 'Error: ' . mysql_error();
	Response::json(-1, '新增记录失败', $dataarr);
} else {
	Response::json(0, '新增记录成功', '');
}
?>
