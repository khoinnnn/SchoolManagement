<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include_once 'models/Database.php';
include_once 'models/Student.php';

$username = "khoin";

// Required headers
$database = new Database();
$db = $database->GetConnection();

// Get posted data
$file_content = file_get_contents("php://input");
$data = json_decode($file_content);

$student = new Student($db);

$test = $student->Update($data->Stu_Id, $data->Stu_Code, $data->Stu_Image, $data->Stu_Name, $data->Stu_DOB, $data->Stu_Email, $data->Stu_Phone, $data->Stu_ClassId);

if($student->Update($data->Stu_Id, $data->Stu_Code, $data->Stu_Image, $data->Stu_Name, $data->Stu_DOB, $data->Stu_Email, $data->Stu_Phone, $data->Stu_ClassId)) {
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