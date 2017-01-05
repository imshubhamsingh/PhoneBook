<?php

include "db.php";

try{

    $postData = file_get_contents("php://input",true);
    $formData = json_decode($postData);
    $conn = new PDO("sqlite:". "contactList.db");
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    $sql = "UPDATE phonebook SET PASSCODE = '$formData->PASSCODE';";

    // use exec() because no results are returned
    $conn->exec($sql);

    echo $sql;

}catch(PDOException $exception){
    echo "Connection Error: ".$exception->getMessage();
}

$conn = null;
