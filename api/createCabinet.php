<?php
$properties = file("application.properties");
if (preg_match('/"([^"]+)"/', $properties[0], $m)) $servername = $m[1];
if (preg_match('/"([^"]+)"/', $properties[1], $m)) $username = $m[1];
if (preg_match('/"([^"]+)"/', $properties[2], $m)) $password = $m[1];
if (preg_match('/"([^"]+)"/', $properties[3], $m)) $dbname = $m[1];
if (preg_match('/"([^"]+)"/', $properties[4], $m)) $bitrixDB = $m[1];

$corpus = $_POST['building'];
$number = $_POST['cabinet'];

$conn = mysqli_connect($servername, $username, $password, $dbname);


$sql = "INSERT INTO Cabinets (number,cabinetLink) VALUES ('".($corpus.$number)."','/weblabs/kursach/files/blankCabinet.svg')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();