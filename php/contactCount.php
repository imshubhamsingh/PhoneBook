<?php
include ("db.php");

try
    {
    $conn = new PDO("sqlite:". "contactList.db");

    // set the PDO error mode to exception

    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT COUNT(*) AS COUNT FROM phonebook;");
    $stmt->execute();

    // set the resulting array to associative

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // set the resulting array to associative

    $contactCount = json_encode($result);
    print $contactCount;
    }

catch(PDOException $exception)
    {
    echo "Connection Error:" . $exception->getMessage();
    }

$conn = null;