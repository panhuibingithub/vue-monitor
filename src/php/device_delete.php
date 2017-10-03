<?php
require_once ('conn.php');
$data =  json_decode(file_get_contents("php://input"));
$sqla = "delete from `qdm217407669_db`.`m_device` where device_id ='" 
	. $data->device_id . "'";
if (!mysql_query($sqla, $conn)) {
	$dataarr = 'Error: ' . mysql_error();
	Response::json(-1, '删除记录失败', $dataarr);
} else {
	Response::json(0, '删除记录成功', '');
}
?>
