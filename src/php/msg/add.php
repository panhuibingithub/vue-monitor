<?php
require_once ('../conn.php');
$data = json_decode(file_get_contents("php://input"));
$sqla = " INSERT INTO  `m_msg`(`msg_id` ,`user_id` ,`device_id` ,`group_id` ,`user_info` ,`scores` ,`msg_type` ,`msg_content` ) VALUES ((SELECT if(MAX(b.`msg_id`),MAX(b.`msg_id`)+1,0) from `m_msg` b),'" 
	. $_POST['user_id'] . "','" 
	. $_POST['device_id'] . "','" 
	. $_POST['group_id'] . "','" 
	. $_POST['user_info'] . "','" 
	. $_POST['scores'] . "','" 
	. $_POST['msg_type'] . "','" 
	. $_POST['msg_content'] . "')";
mysql_query("SET NAMES 'utf8'");
if (!mysql_query($sqla, $conn)) {
	$dataarr = 'Error: ' . mysql_error();
	Response::json(-1, '新增记录失败', $dataarr);
} else {
	Response::json(0, '新增记录成功', '');
}
?>
