<?php
include "db.php";

try
	{
    $conn = new PDO("sqlite:". "contactList.db");

	$sql = 'INSERT OR IGNORE INTO phonebook (NAME, PHONE, ADDRESS, EMAIL, FAVORITE, SECURE) VALUES 
("Molly","1664072031299","Ap #711-2029 Fusce Ave","nibh.vulputate.mauris@blandit.co.uk","0","0"),
("Hiroko","1628062335399","P.O. Box 845, 5736 Convallis St.","Duis.gravida@metusAliquamerat.com","1","0"),
("Abel","1622031634999","1316 Rutrum Rd.","Morbi.metus.Vivamus@nisi.org","1","1"),
("Catherine","1633032234999","814-5063 At Rd.","fermentum.arcu.Vestibulum@tristique.com","0","1"),
("Jennifer","1657041042699","888-7736 Sit Rd.","enim.sit@nectempus.net","1","0"),
("Rana","1615072491099","Ap #927-7495 A Rd.","arcu.et@sedlibero.edu","0","0"),
("Reese","1621012710299","3086 Phasellus Road","non.vestibulum.nec@Phasellusfermentum.com","0","0"),
("Shea","1609101731599","9618 Mollis Rd.","Aliquam.nisl.Nulla@id.edu","0","0"),
("Elaine","1662042416699","P.O. Box 938, 524 Non, St.","est.Mauris@nullaCras.net","1","0"),
("Rebecca","1630101622099","8928 Quis St.","arcu.et.pede@Duisacarcu.net","0","0");';

	// use exec() because no results are returned

	$conn->exec($sql);
	echo 'Sample Data Added';
	}

catch(PDOException $exception)
	{
	echo " Connection Error: " . $exception->getMessage();
	}

$conn = null;