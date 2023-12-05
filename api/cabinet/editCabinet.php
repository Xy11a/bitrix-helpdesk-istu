<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$servername = "localhost";
$username = "DB2022_xyla";
$password = "DB2022_xyla";
$dbname = "DB2022_xyla";
$conn = mysqli_connect($servername, $username, $password, $dbname);
$postData = file_get_contents('php://input');

print($postData);

$data = json_decode($postData, true);

$oldName = $data["oldName"];
$newName = $data["newName"];

$sql = "UPDATE `Cabinets` SET `number`='$newName' WHERE number = '$oldName'";

if($data["oldName"] !=""){
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}


$conn->close();