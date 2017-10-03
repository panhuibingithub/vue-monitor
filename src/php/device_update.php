<?php
require_once ('conn.php');
$data =  json_decode(file_get_contents("php://input"));
$sqla = "UPDATE `qdm217407669_db`.`m_device` set `device_name`='". $data->device_name ."',`device_type`='" . $data->device_type ."',`device_mac`='" . $data->device_mac ."',`device_pwd`='" . $data->device_pwd . "',`device_model`='" . $data->device_model . "',`device_state`='" . $data->device_state . "',`publish_addr`='" . $data->publish_addr 
		."' where `device_id`= " . $data->device_id;
mysql_query("SET NAMES 'utf8'");
if (!mysql_query($sqla, $conn)) {
	$dataarr = 'Error: ' . mysql_error();
	Response::json(-1, '新增记录失败', $dataarr);
} else {
	Response::json(0, '新增记录成功', '');
}
?>
