<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

include_once 'models/Database.php';
include_once 'models/Student.php';

// Required headers
$database = new Database();
$db = $database->GetConnection();

$student = new Student($db);

$stmt = $student->GetAll();
$num = $stmt->rowCount();

$students_arr = array();
$students_arr["records"] = array();

if($num > 0) {
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $student_item = array(
            "Stu_Id" => $Stu_Id,
            "Stu_Code" => $Stu_Code,
            "Stu_Image" => $Stu_Image,
            "Stu_Name" => $Stu_Name,
            "Stu_DOB" => $Stu_DOB,
            "Stu_Email" => $Stu_Email,
            "Stu_Phone" => $Stu_Phone,
            "Stu_ClassId" => $Stu_ClassId,
            "Stu_ClassName" => $Stu_ClassName,
            "Stu_CreatedAt" => $Stu_CreatedAt,
            "Stu_CreatedBy" => $Stu_CreatedBy
        );

        array_push($students_arr["records"], $student_item);
    }

    // Set response code - 200 OK
    http_response_code(200);

    echo json_encode($students_arr);
}
else {
    // Set response code - 404 Not found
    http_response_code(200);

    echo json_encode($students_arr);
}
?>