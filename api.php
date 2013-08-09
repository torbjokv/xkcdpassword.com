<?php
header("Pragma: no-cache");
header("Cache-Control: s-maxage=0, max-age=0, must-revalidate, no-cache");

#https://skydrive.live.com/?cid=3732e80b128d016f&id=3732E80B128D016F%213584
# remove digits " (\d*)$"

$str = file_get_contents('words/en.txt'); //Take the contents from the file to the variable
$result = explode("\n",$str); //Split it by ','



$w1 = $result[array_rand($result)];

header('Content-Type: text/plain; charset=utf-8');
header('Access-Control-Allow-Origin: *');
echo $w1;

?>
