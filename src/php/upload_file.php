<?php
require_once ('conn.php');

if ($_FILES["file"]["error"] > 0) {
	$msg = "Error: " . $_FILES["file"]["error"];
	Response::json(1002, '文件上传失败', $msg);
} else {
	$fileName = "upload/".time(). $_FILES["file"]["name"];
	move_uploaded_file($_FILES["file"]["tmp_name"], $fileName);
	Response::json(0, '文件上传成功', $fileName);
}

?>