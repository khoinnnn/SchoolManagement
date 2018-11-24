<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include_once 'models/Database.php';
include_once 'models/ClassSubject.php';

$username = "khoin";

// Required headers
$database = new Database();
$db = $database->GetConnection();

// Get posted data
$file_content = file_get_contents("php://input");
$data = json_decode($file_content);

$obj = new ClassSubject($db);

if($obj->Delete($data->ClaSub_Id)){
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