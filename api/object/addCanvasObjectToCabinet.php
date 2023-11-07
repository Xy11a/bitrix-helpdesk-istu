<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$servername = "localhost";
$username = "DB2022_xyla";
$password = "DB2022_xyla";
$dbname = "DB2022_xyla";

$conn = mysqli_connect($servername, $username, $password, $dbname);



$json = file_get_contents('php://input');
$json_data = json_decode($json);// Converts it into a PHP object

foreach ($json_data as $value) {
    $id = $value->id;
    $type = $value->type;
    $cab = $value->cabinet;
    $x = $value->shapeProps->x;
    $y = $value->shapeProps->y;
    $scaleX = $value->shapeProps->scaleX;
    $scaleY = $value->shapeProps->scaleY;
    $rot = $value->shapeProps->rotation;



    if($id != null) {
        print("Update");
        $updateSQL = "UPDATE `CanvasObjects` SET `type`='".$type."',`cabinet`='".$cab."',`x`='".$x."',`y`='".$y."',`scaleX`='".$scaleX."',`scaleY`='".$scaleY."',`rotation`='".$rot."' WHERE `id`='".$id."'";
        $result = mysqli_query($conn, $updateSQL);
    } else {
        print("Create");
        $createSQL = "INSERT INTO `CanvasObjects` (`type`,`x`, `y`, `scaleX`, `scaleY`, `rotation`, `cabinet`)
        VALUES ('".$type."','".$x."','".$y."','".$scaleX."','"."$scaleY"."','".$rot."','".$cab."')";
        print("<br>");
        mysqli_query($conn, $createSQL);
        print(mysqli_errno($conn) . ": " . mysqli_error($conn));
        print("<br>");
    }
    print("<br>");
}

$conn->close();

