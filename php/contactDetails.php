<?php
include ("db.php");

try
  {
  $postData = file_get_contents("php://input", true);
  $formData = json_decode($postData);
  $conn = new PDO("sqlite:". "contactList.db");

  // set the PDO error mode to exception

  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $stmt = $conn->prepare("SELECT * FROM phonebook WHERE ID = $formData->ID;");
  $stmt->execute();

  // set the resulting array to associative

  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

  // set the resulting array to associative

  $contactDetails = json_encode($result);
  print $contactDetails;
  }

catch(PDOException $exception)
  {
  echo "Connection Error:" . $exception->getMessage();
  }

$conn = null;
