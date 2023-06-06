<?php
$properties = file("application.properties");
if (preg_match('/"([^"]+)"/', $properties[0], $m)) $servername = $m[1];
if (preg_match('/"([^"]+)"/', $properties[1], $m)) $username = $m[1];
if (preg_match('/"([^"]+)"/', $properties[2], $m)) $password = $m[1];
if (preg_match('/"([^"]+)"/', $properties[3], $m)) $dbname = $m[1];
if (preg_match('/"([^"]+)"/', $properties[4], $m)) $bitrixDB = $m[1];

$conn = mysqli_connect($servername, $username, $password, $dbname);


$json = file_get_contents('php://input');
$data = json_decode($json);// Converts it into a PHP object


$ip = $data->ip;
$mac = $data->mac;
$inv = $data->inv;

$delSQL="DELETE FROM `Computers` WHERE `ip`='".$ip."' and `mac`='".$mac."' and `inv`='".$inv."';";

$checkResult = mysqli_query($conn, $delSQL);



