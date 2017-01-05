<?php
include ("db.php");

// database connection

try
    {
    $conn = new PDO("sqlite:". "contactList.db");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $postData = file_get_contents("php://input", true);
    $formData = json_decode($postData);

    // echo $formData;
    // set the PDO error mode to exception

    $sql = "INSERT INTO phonebook (NAME ,PHONE, ADDRESS, EMAIL, WEBSITE, NOTES, FAVORITE, SECURE) VALUES ('$formData->NAME','$formData->PHONE','$formData->ADDRESS','$formData->EMAIL','$formData->WEBSITE','$formData->NOTES','$formData->FAVORITE','$formData->SECURE');";

    // use exec() because no results are returned

    $conn->exec($sql);
    }

catch(PDOException $exception)
    {
    echo " Connection Error: " . $exception->getMessage();
    }

$conn = null;