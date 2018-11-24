<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

include_once 'models/Database.php';
include_once 'models/Classe.php';

// Required headers
$database = new Database();
$db = $database->GetConnection();

$classe = new Classe($db);

$stmt = $classe->GetAll();
$num = $stmt->rowCount();

// Classes array
$classes_arr = array();
$classes_arr["records"] = array();

if($num > 0) {
    // Retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // Extract row this will make $row['name'] to just $name only
        extract($row);

        $classes_item = array(
            "Cla_Id" => $Cla_Id,
            "Cla_Name" => $Cla_Name,
            "Cla_SchoolYear" => $Cla_SchoolYear,
            "Cla_CreatedAt" => $Cla_CreatedAt,
            "Cla_CreatedBy" => $Cla_CreatedBy
        );

        array_push($classes_arr["records"], $classes_item);
    }

    // Set response code - 200 OK
    http_response_code(200);

    // Show classes data in json format
    echo json_encode($classes_arr);
}
else {
    // Set response code - 404 Not found
    http_response_code(200);

    // Show classes data in json format
    echo json_encode($classes_arr);
}
?>