<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$servername = "localhost";
$username = "DB2022_xyla";
$password = "DB2022_xyla";
$dbname = "DB2022_xyla";
$conn = mysqli_connect($servername, $username, $password, $dbname);


$json = file_get_contents('php://input');
$data = json_decode($json);// Converts it into a PHP object


$id = $data->id;


$delSQL = "DELETE FROM `CanvasObjects` WHERE `id`='" . $id . "'";

$checkResult = mysqli_query($conn, $delSQL);


