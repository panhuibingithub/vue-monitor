<?php
require_once ('conn.php');
$data =  json_decode(file_get_contents("php://input"));
$sqla = "INSERT INTO `m_device` (`device_id`,`device_name`,`device_mac`,`device_pwd`,`device_type`,`device_model`,`device_state`,`publish_addr`) 
	values ((SELECT MAX(b.device_id)+1 from `m_device` b),'" . $data->device_name . "','" . $data->device_mac . "','" . $data->device_pwd . "','" . $data->device_type . "','" . $data->device_model . "','" . $data->device_state . "','" . $data->publish_addr . "')";
mysql_query("SET NAMES 'utf8'");
if (!mysql_query($sqla, $conn)) {
	$dataarr = 'Error: ' . mysql_error();
	Response::json(-1, '新增记录失败', $dataarr);
} else {
	Response::json(0, '新增记录成功', '');
}
?>
