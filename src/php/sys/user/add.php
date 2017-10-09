<?php
require_once ('../../conn.php');
$data = json_decode(file_get_contents("php://input"));
$sqla = "INSERT INTO `m_account` (`user_id`,`user_name`,`telephone`,`password`,`user_role`) 
	values ((SELECT MAX(b.user_id)+1 from `m_account` b),'" 
	. $data -> user_name . "','" 
	. $data -> telephone . "','" 
	. $data -> password . "','" 
	. $data -> user_role . "')";
mysql_query("SET NAMES 'utf8'");
if (!mysql_query($sqla, $conn)) {
	$dataarr = 'Error: ' . mysql_error();
	Response::json(-1, '新增记录失败', $dataarr);
} else {
	Response::json(0, '新增记录成功', '');
}
?>
