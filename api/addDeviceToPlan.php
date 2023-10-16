<?php
$servername = "localhost";
$username = "DB2022_xyla";
$password = "DB2022_xyla";
$dbname = "DB2022_xyla";

$conn = mysqli_connect($servername, $username, $password, $dbname);



$json = file_get_contents('php://input');
$json_data = json_decode($json, true);// Converts it into a PHP object





foreach ($json_data as $value) {
//    var_dump($value["data"]);
//    print("<br>");

    $id = $value["id"];
    $type = $value["type"];
    $x = $value["x"];
    $y = $value["y"];
    $sX = $value["sX"];
    $sY = $value["sY"];
    $rot = $value["rotation"];
    $data = json_encode($value["data"]);
    $cab = $value["cabinet"];


    if($id != null) {
        print("Update");
        print("<br>");
        print($data);
        print("<br>");

        $updateSQL = "UPDATE `Devices` SET `type`='".$type."',`cabinet`='".$cab."',`x`='".$x."',`y`='".$y."',`sX`='".$sX."',`sY`='".$sY."',`rotation`='".$rot."',`data`='".$data."' WHERE `id`='".$id."'";
        $result = mysqli_query($conn, $updateSQL);
    } else {
        print("Create");
        $createSQL = "INSERT INTO `Devices`(`type`,`x`, `y`, `sX`, `sY`, `rotation`,`data`, `cabinet`)
        VALUES ('".$type."','".$x."','".$y."','".$sX."','"."$sY"."','".$rot."','".$data."','".$cab."')";
        $result =  mysqli_query($conn, $createSQL);
    }

}

$conn->close();
