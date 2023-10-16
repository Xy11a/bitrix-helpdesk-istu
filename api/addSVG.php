<?php
$servername = "localhost";
$username = "DB2022_xyla";
$password = "DB2022_xyla";
$dbname = "DB2022_xyla";
$conn = mysqli_connect($servername, $username, $password, $dbname);

$fileTmpPath = $_FILES['uploadedFile']['tmp_name'];
$fileName = $_FILES['uploadedFile']['name'];
$fileSize = $_FILES['uploadedFile']['size'];
$fileType = $_FILES['uploadedFile']['type'];
$fileNameCmps = explode(".", $fileName);
$fileExtension = strtolower(end($fileNameCmps));

$cabinet = $_POST['cabinet'];

$letter = mb_substr($cabinet, 0, 1);
$number = mb_substr($cabinet, 1, 3);

$newFileName = $cabinet . "." . $fileExtension;
$uploadFileDir = $_SERVER['DOCUMENT_ROOT'] . '/upload/';

$dest_path = $uploadFileDir . $newFileName;


$dest_path_sql = "/upload/" . $newFileName;

if (move_uploaded_file($fileTmpPath, $dest_path)) {
    $sql = "UPDATE Cabinets SET cabinetLink='" . $dest_path_sql . "'WHERE number='" . $cabinet . "'";
    mysqli_query($conn, $sql);
    $message = 'File is successfully uploaded.';
} else {
    $message = 'There was some error moving the file to upload directory. Please make sure the upload directory is writable by web server.';
}

print($message);


$conn->close();



