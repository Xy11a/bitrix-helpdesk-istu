<?php
$servername = "localhost";
$username = "DB2022_xyla";
$password = "DB2022_xyla";
$dbname = "DB2022_xyla";

$corpus = $_POST['building'];
$number = $_POST['cabinet'];

$conn = mysqli_connect($servername, $username, $password, $dbname);


$sql = "INSERT INTO Cabinets (number,cabinetLink) VALUES ('".($corpus.$number)."','/asu/kursach/files/blankCabinet.svg')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();