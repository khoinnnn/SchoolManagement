<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include_once 'models/Database.php';
include_once 'models/Classe.php';

$username = "khoin";

// Required headers
$database = new Database();
$db = $database->GetConnection();

// Get posted data
$file_content = file_get_contents("php://input");
$data = json_decode($file_content);

// Set class property values
$classe = new Classe($db);

if($classe->Insert($data->Cla_Name, $data->Cla_SchoolYear, date('Y-m-d H:i:s'), "khoin")){
    http_response_code(200);
    echo json_encode(array(
        "Success" => true
    ));
}
else {
    // Set response code - 503 service unavailable
    http_response_code(503);

    // Tell the user
    echo json_encode(array(
        "Success" => false
    ));
}
?>