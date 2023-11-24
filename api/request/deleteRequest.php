<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$servername = "localhost";
$username = "DB2022_xyla";
$password = "DB2022_xyla";
$dbname = "DB2022_xyla";

$conn = mysqli_connect($servername, $username, $password, $dbname);
$postData = file_get_contents('php://input');

$data = json_decode($postData, true);


$sql = "DELETE FROM `Request` WHERE id = '".$data["id"]."'";

if ($conn->query($sql) === TRUE) {
    echo "Delete successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}


$conn->close();