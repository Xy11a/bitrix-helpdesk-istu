<?php
$properties = file("application.properties");

if (preg_match('/"([^"]+)"/', $properties[0], $m)) $servername = $m[1];
if (preg_match('/"([^"]+)"/', $properties[1], $m)) $username = $m[1];
if (preg_match('/"([^"]+)"/', $properties[2], $m)) $password = $m[1];
if (preg_match('/"([^"]+)"/', $properties[3], $m)) $dbname = $m[1];
if (preg_match('/"([^"]+)"/', $properties[4], $m)) $bitrixDB = $m[1];


$conn = mysqli_connect($servername, $username, $password, $dbname);

$requestId = $_GET["request"];


$pcInRequest = "select * from ComputersInRequest where request_id='$requestId'";


$checkResult = mysqli_query($conn, $pcInRequest);

$arr = array();
while ($row = mysqli_fetch_assoc($checkResult)) {
    $arr[] = $row;
}

echo json_encode($arr);
mysqli_close($conn);

