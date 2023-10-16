<?php
$servername = "localhost";
$username = "DB2022_xyla";
$password = "DB2022_xyla";
$dbname = "DB2022_xyla";
$conn = mysqli_connect($servername, $username, $password, $dbname);


$json = file_get_contents('php://input');
$data = json_decode($json);// Converts it into a PHP object





$ip = $data->ip;
$mac = $data->mac;
$inv = $data->inv;

$delSQL="DELETE FROM `Computers` WHERE `ip`='".$ip."' and `mac`='".$mac."' and `inv`='".$inv."';";

$checkResult = mysqli_query($conn, $delSQL);



