<?php
require_once ('../conn.php');
$data =  json_decode(file_get_contents("php://input"));
$sqla = "UPDATE `qdm217407669_db`.`m_device` set `publish_addr`='". $_POST['publish_addr'] 
		."' where `device_id`='" .  $_POST['device_id']."'";
mysql_query("SET NAMES 'utf8'");
if (!mysql_query($sqla, $conn)) {
	$dataarr = 'Error: ' . mysql_error();
	Response::json(-1, '跟新记录失败', $dataarr);
} else {
	Response::json(0, '跟新记录成功', '');
}
?>
