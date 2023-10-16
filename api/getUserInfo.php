<?php

$servername = "localhost";
$username = "root";
$password = "g274mvcwCB";
$dbname = "sitemanager";


$conn = mysqli_connect($servername, $username, $password, $dbname);

$loginCookie = $_COOKIE["BITRIX_SM_LOGIN"];


$userSQL = "select login, NAME, LAST_NAME, EMAIL from b_user where login='$loginCookie'";


$checkResult = mysqli_query($conn, $userSQL);

$arr = array();
while ($row = mysqli_fetch_assoc($checkResult)) {
    $arr[] = $row;
}

echo json_encode($arr);
mysqli_close($conn);

