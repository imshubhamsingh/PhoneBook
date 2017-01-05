<?php

// database credentials

$host = "localhost";
$dbName = "projectsdb";
$username = "projects";
$password = "projects12345";
try
  {
  $conn = new PDO("sqlite:". "contactList.db");

  // set the PDO error mode to exception

  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   // echo 'Inside create table and db';
  // use exec() because no results are returned
  $createTable = "CREATE TABLE IF NOT EXISTS `phonebook` (
	`ID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`NAME`	varchar(100),
	`PHONE`	varchar(100) UNIQUE,
	`ADDRESS`	varchar(255),
	`EMAIL`	varchar(50),
	`WEBSITE`	varchar(50),
	`NOTES`	varchar(255),
	`FAVORITE`	boolean NOT NULL DEFAULT 0,
	`SECURE`	boolean NOT NULL DEFAULT 0,
	`PASSCODE`	varchar(4) NOT NULL DEFAULT '1234'
);";
  $conn->exec($createTable);
  }

catch(PDOException $exception)
  {
  echo 'Connection Error:' . $exception->getMessage();
  }
