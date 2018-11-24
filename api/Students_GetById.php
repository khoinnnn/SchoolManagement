<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
include_once 'models/Database.php';
include_once 'models/Student.php';
 
$database = new Database();
$db = $database->GetConnection();
 
$student = new Student($db);
$students_arr;

if(isset($_GET['id'])) {
    $student->GetById(intval($_GET['id']));
    
    if($student->Stu_Name != null) {
        $students_arr = array(
            "Stu_Id" => $student->Stu_Id,
            "Stu_Code" => $student->Stu_Code,
            "Stu_Image" => $student->Stu_Image,
            "Stu_Name" => $student->Stu_Name,
            "Stu_DOB" => $student->Stu_DOB,
            "Stu_Email" => $student->Stu_Email,
            "Stu_Phone" => $student->Stu_Phone,
            "Stu_ClassId" => $student->Stu_ClassId,
            "Stu_ClassName" => $student->Stu_ClassName,
            "Stu_CreatedAt" => $student->Stu_CreatedAt,
            "Stu_CreatedBy" => $student->Stu_CreatedBy
        );
    
        http_response_code(200);
        echo json_encode($students_arr);
    }
    else {
        // Set response code - 404 Not found
        http_response_code(200);
        echo json_encode(null);
    }
}
else {
    // Set response code - 404 Not found
    http_response_code(200);
    echo json_encode(null);
}
?>