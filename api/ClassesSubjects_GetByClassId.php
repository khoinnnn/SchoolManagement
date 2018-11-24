<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

include_once 'models/Database.php';
include_once 'models/ClassSubject.php';

// Required headers
$database = new Database();
$db = $database->GetConnection();

$obj = new ClassSubject($db);

$objs_arr = array();
$objs_arr["records"] = array();

if(isset($_GET['classId'])) {
    $classId = intval($_GET['classId']);
    $stmt = $obj->GetByClassId($classId);
    $num = $stmt->rowCount();

    if($num > 0) {
        // Retrieve our table contents
        // fetch() is faster than fetchAll()
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            // Extract row this will make $row['name'] to just $name only
            extract($row);
    
            $obj_item = array(
                "ClaSub_Id" => $ClaSub_Id,
                "ClaSub_ClassId" => $ClaSub_ClassId,
                "ClaSub_ClassName" => $ClaSub_ClassName,
                "ClaSub_Semester" => $ClaSub_Semester,
                "ClaSub_SubjectIds" => $ClaSub_SubjectIds,
                "ClaSub_CreatedAt" => $ClaSub_CreatedAt,
                "ClaSub_CreatedBy" => $ClaSub_CreatedBy
            );
    
            array_push($objs_arr["records"], $obj_item);
        }
    
        // Set response code - 200 OK
        http_response_code(200);
        echo json_encode($objs_arr);
    }
    else {
        // Set response code - 404 Not found
        http_response_code(200);
        echo json_encode($objs_arr);
    }
}
else {
    // Set response code - 404 Not found
    http_response_code(200);
    echo json_encode($objs_arr);
}
?>