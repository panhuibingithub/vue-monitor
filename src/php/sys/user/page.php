<?php
   require_once('../../conn.php');
   $data = json_decode(file_get_contents("php://input"));
   $sqla ="SELECT a.`user_id` ,a.`user_name` ,a.`telephone`,a.`password`,a.`user_role` FROM `m_account` a WHERE  a.`user_name` like '%".$data->key."%'
	 ORDER BY a.`user_id` LIMIT ".($data->pageSize*($data->pageNo-1)).",".($data->pageSize*$data->pageNo-1);
   $result = mysql_query($sqla,$conn);
   $dataarr = array();
   while($row = mysql_fetch_array($result,MYSQL_ASSOC)){
    $dataarr[]=$row;
   }
   $dataarr = Response::encodeOperations($dataarr);
   Response::json(0,'数据返回成功',$dataarr);
?>