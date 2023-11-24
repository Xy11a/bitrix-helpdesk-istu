<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$servername = "localhost";
$username = "DB2022_xyla";
$password = "DB2022_xyla";
$dbname = "DB2022_xyla";

$conn = mysqli_connect($servername, $username, $password, $dbname);


$sql = "SELECT * FROM Request";
$result = mysqli_query($conn, $sql);

$arr = array();


while ($row = mysqli_fetch_assoc($result)) {
    $arr[] = $row;
}


echo json_encode($arr);
mysqli_close($conn);