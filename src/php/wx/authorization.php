<?php
   require_once('conn.php');
    $ch = curl_init();
	$timeout = 5;
	curl_setopt ($ch, CURLOPT_URL, "https://api.weixin.qq.com/sns/jscode2session?appid=wx34eff525599bcf25&secret=737749b7bda7e1b50c56b91fc3d709af&js_code=".$_POST['js_code']."&grant_type=authorization_code");
	curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
	$file_contents = curl_exec($ch);
	curl_close($ch);
    Response::json(0,'数据返回成功',$file_contents);
?>