<?php
require_once ('../../conn.php');
$data =  json_decode(file_get_contents("php://input"));
$sqla = "UPDATE `m_account` set `password`='". $data->newPwd 
		."' where `user_id`= " . $data->user_id ." and `password`= '". $data->oldPwd ."'";#
mysql_query("SET NAMES 'utf8'");
if (!mysql_query($sqla, $conn)) {
	$dataarr = 'Error: ' . mysql_error();
	Response::json(-1, '修改记录失败', $dataarr);
} else {
	Response::json(0, '修改记录成功', '');
}
?>
