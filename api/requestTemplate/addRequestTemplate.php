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
    $name = $value["name"];
    $type = $value["type"];
    $inputDataProps = json_encode($value["inputDataProps"],JSON_UNESCAPED_UNICODE);
    $options = json_encode($value["options"],JSON_UNESCAPED_UNICODE);



    if($id != null) {
        print("Update");
        $updateSQL = "UPDATE `RequestTemplate` SET `name`='".$name."',`type`='".$type."',`inputDataProps`='".$inputDataProps."',`options`='".$options."' WHERE `id`='".$id."'";
        $result = mysqli_query($conn, $updateSQL);


    } else {
        print("Create");
        $createSQL = "INSERT INTO `RequestTemplate`(`name`, `type`, `inputDataProps`, `options`) VALUES ('$name','$type','$inputDataProps','$options')";
        print("<br>");
        mysqli_query($conn, $createSQL);
        print(mysqli_errno($conn) . ": " . mysqli_error($conn));
        print("<br>");
    }
    print("<br>");
}

$conn->close();
