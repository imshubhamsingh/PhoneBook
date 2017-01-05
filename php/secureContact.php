<?php
include "db.php";

try
    {
    $postData = file_get_contents("php://input", true);
    $formData = json_decode($postData);
    $conn = new PDO("sqlite:". "contactList.db");

    // set the PDO error mode to exception

    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = ($formData->SECURE == '1') ? "UPDATE phonebook SET SECURE = '1'  WHERE ID = '$formData->ID';" : "UPDATE phonebook SET SECURE = '0'  WHERE ID = '$formData->ID';";

    // use exec() because no results are returned

    $conn->exec($sql);
    print 'in secure php and ID = ' . $formData->ID . ' sec = ' . $formData->SECURE;
    print $sql;
    }

catch(PDOException $exception)
    {
    echo "Connection Error: " . $exception->getMessage();
    }

$conn = null;