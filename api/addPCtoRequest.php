<?php
$properties = file("application.properties");
if (preg_match('/"([^"]+)"/', $properties[0], $m)) $servername = $m[1];
if (preg_match('/"([^"]+)"/', $properties[1], $m)) $username = $m[1];
if (preg_match('/"([^"]+)"/', $properties[2], $m)) $password = $m[1];
if (preg_match('/"([^"]+)"/', $properties[3], $m)) $dbname = $m[1];
if (preg_match('/"([^"]+)"/', $properties[4], $m)) $bitrixDB = $m[1];

$conn = mysqli_connect($servername, $username, $password, $dbname);

$requestID = $_GET['request'];

$json = file_get_contents('php://input');
$data = json_decode($json);// Converts it into a PHP object


foreach ($data as $value) {
    $ip = $value->ip;
    $mac = $value->mac;
    $inv = $value->inv;

    $insertSQL = "INSERT INTO `ComputersInRequest`(`request_id`, `computer_ip`, `computer_mac`, `computer_inv`) 
    VALUES ('$requestID','$ip','$mac','$inv');";

     mysqli_query($conn, $insertSQL);
}

$conn->close();