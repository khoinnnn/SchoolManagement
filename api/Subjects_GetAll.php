<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

include_once 'models/Database.php';
include_once 'models/Subject.php';

// Required headers
$database = new Database();
$db = $database->GetConnection();

$subject = new Subject($db);

$stmt = $subject->GetAll();
$num = $stmt->rowCount();

$subjects_arr = array();
$subjects_arr["records"] = array();

if($num > 0) {
    // Retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // Extract row this will make $row['name'] to just $name only
        extract($row);

        $subject_item = array(
            "Sub_Id" => $Sub_Id,
            "Sub_Name" => $Sub_Name,
            "Sub_Lessons" => $Sub_Lessons,
            "Sub_CreditTheory" => $Sub_CreditTheory,
            "Sub_CreditPractice" => $Sub_CreditPractice,
            "Sub_CreditExercise" => $Sub_CreditExercise,
            "Sub_CreatedAt" => $Sub_CreatedAt,
            "Sub_CreatedBy" => $Sub_CreatedBy
        );

        array_push($subjects_arr["records"], $subject_item);
    }

    // Set response code - 200 OK
    http_response_code(200);

    echo json_encode($subjects_arr);
}
else {
    // Set response code - 404 Not found
    http_response_code(200);

    echo json_encode($subjects_arr);
}
?>