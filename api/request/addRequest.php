<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$servername = "localhost";
$username = "DB2022_xyla";
$password = "DB2022_xyla";
$dbname = "DB2022_xyla";

$conn = mysqli_connect($servername, $username, $password, $dbname);



$json = file_get_contents('php://input');
$json_data = json_decode($json, true);// Converts it into a PHP object


foreach ($json_data as $value) {

    $id = $value["id"];
    $template = $value["templateId"];
    $data = json_encode($value["data"],JSON_UNESCAPED_UNICODE);
    $createDate = $value["createDate"];
    $status = $value["status"];



    if($id != null) {
        print("Update");
        $updateSQL = "UPDATE `Request` SET `template`='".$template."',`data`='".$data."',`create_date`='".$createDate."',`status`='".$status."' WHERE `id`='".$id."'";
        $result = mysqli_query($conn, $updateSQL);


    } else {
        print("Create");
        $createSQL = "INSERT INTO `Request`(`template`, `data`, `create_date`, `status`) VALUES ('$template','$data','$createDate','$status')";
        print("<br>");
        mysqli_query($conn, $createSQL);
        print(mysqli_errno($conn) . ": " . mysqli_error($conn));
        print("<br>");
    }
    print("<br>");
}

$conn->close();
