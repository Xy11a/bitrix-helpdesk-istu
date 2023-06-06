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


$requestGroup = $data->requestGroup;
$requestName = $data->requestName;
$owner = $data->fio.", ".$data->stuffEmail.", ".$data->stuffNumber;
$createDate = date('d.m.Y');
$endDate = date('d.m.Y', strtotime('+7 days'));
$cabinet = $_GET['cabinet'];
$status = "Открыта";

switch ($requestName) {
    case "ПО в учебных классах":
        $owner .= $data->jobTitle;
        $content = "Кафедра:". $data->departmentName." Программа: ". $data->programName;
        break;

    case "ПО для администрирования ПК":
        $content = "Кафедра:". $data->departmentName." Программа: ". $data->programName;
        break;

    case "Dr. Web":
        $content = "Кафедра:". $data->departmentName;
        break;
}

$insertSQL = "INSERT INTO `Request`(`request_group`, `name`, `owner`, `create_date`, `end_date`, `cabinet`, `status`, `content`)
        VALUES ('$requestGroup','$requestName','$owner','$createDate','$endDate','$cabinet','$status','$content')";

mysqli_query($conn, $insertSQL);

print($conn->insert_id);








