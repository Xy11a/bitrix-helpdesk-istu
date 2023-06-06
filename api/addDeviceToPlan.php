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

foreach ($data as $value) {
    $ip = $value->ip;
    $mac = $value->mac;
    $inv = $value->inv;
    $x = $value->x;
    $y = $value->y;
    $sX = $value->scaleX;
    $sY = $value->scaleY;
    $rot = $value->rotation;
    $cab = $value->cabinet;

    $checkSQL = "SELECT * FROM `Computers` WHERE `ip`='".$ip."' and `mac`='".$mac."' and `inv` = '".$inv."';";
    print("SQL:".$checkSQL. "<br>");

    $checkResult = mysqli_query($conn, $checkSQL);

    $arr = array();
    while ($row = mysqli_fetch_assoc($checkResult)) {
        $arr[] = $row;
    }

    if(count($arr) == 0) {
        print("Find empty computer. Create new one. <br>");
        $createSQL = "INSERT INTO `Computers`(`ip`, `mac`, `inv`, `x`, `y`, `sX`, `sY`, `rotation`, `cabinet`) 
        VALUES ('".$ip."','".$mac."','".$inv."','".$x."','".$y."','".$sX."','"."$sY"."','".$rot."','".$cab."')";
        $result =  mysqli_query($conn, $createSQL);
    } else {
        print("Find computer. Update one. <br>");
        $updateSQL = "UPDATE `Computers` SET `x`='".$x."',`y`='".$y."',`sX`='".$sX."',`sY`='".$sY."',`rotation`='".$rot."',`cabinet`='".$cab."' WHERE ip='".$ip."' and mac='".$mac."' and inv='".$inv."'";
        $result = mysqli_query($conn, $updateSQL);
    }
}

$conn->close();
