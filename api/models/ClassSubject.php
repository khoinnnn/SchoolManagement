<?php
class ClassSubject
{
    private $conn;
    private $table_name = "class_subjects";
 
    public $ClaSub_Id;
    public $ClaSub_ClassId;
    public $ClaSub_ClassName;
    public $ClaSub_Semester;
    public $ClaSub_SubjectIds;
    public $ClaSub_CreatedAt;
    public $ClaSub_CreatedBy;

    // Addition
    public $ClaSub_SubjectLessons;
    public $ClaSub_SubjectCreditTheory;
    public $ClaSub_SubjectCreditPractice;
    public $ClaSub_SubjectCreditExercise;

    public function __construct($db) {
        $this->conn = $db;
    }

    function GetAll() {
        // Select all query
        $query = "SELECT
                    clasub.ClaSub_Id, 
                    clasub.ClaSub_ClassId,
                    class.Cla_Name as ClaSub_ClassName,
                    clasub.ClaSub_SubjectIds,
                    clasub.ClaSub_Semester,
                    clasub.ClaSub_SubjectIds,
                    clasub.ClaSub_CreatedAt,
                    clasub.ClaSub_CreatedBy
                  FROM `class_subjects` as clasub
                  INNER JOIN classes as class
                  ON clasub.ClaSub_ClassId = class.Cla_Id";
    
        // Prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // Execute query
        $stmt->execute();
    
        return $stmt;
    }

    function GetByClassId($ClaSub_ClassId) {
        // Select all query
        $query = "SELECT
                    clasub.ClaSub_Id, 
                    clasub.ClaSub_ClassId,
                    class.Cla_Name as ClaSub_ClassName,
                    clasub.ClaSub_SubjectIds,
                    clasub.ClaSub_Semester,
                    clasub.ClaSub_SubjectIds,
                    clasub.ClaSub_CreatedAt,
                    clasub.ClaSub_CreatedBy
                  FROM `class_subjects` as clasub
                  INNER JOIN classes as class
                  ON clasub.ClaSub_ClassId = class.Cla_Id
                  WHERE clasub.ClaSub_ClassId = $ClaSub_ClassId";
    
        // Prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // Execute query
        $stmt->execute();
    
        return $stmt;
    }

    function Insert($ClaSub_ClassId, $ClaSub_Semester, $ClaSub_SubjectIds, 
    $ClaSub_CreatedAt, $ClaSub_CreatedBy) {
        $query = "INSERT INTO `class_subjects`(`ClaSub_ClassId`, `ClaSub_Semester`, `ClaSub_SubjectIds`, `ClaSub_CreatedAt`, `ClaSub_CreatedBy`) 
                  VALUES ($ClaSub_ClassId, $ClaSub_Semester, '$ClaSub_SubjectIds', 
                        '$ClaSub_CreatedAt', '$ClaSub_CreatedBy')";

        $stmt = $this->conn->prepare($query);
    
        // Execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function Update($ClaSub_Id, $ClaSub_ClassId, $ClaSub_Semester, $ClaSub_SubjectIds) {
        $query = "UPDATE `class_subjects` 
                  SET 
                  `ClaSub_ClassId`=$ClaSub_ClassId,
                  `ClaSub_Semester`=$ClaSub_Semester,
                  `ClaSub_SubjectIds`='$ClaSub_SubjectIds' 
                  WHERE `ClaSub_Id`=$ClaSub_Id";
    
        $stmt = $this->conn->prepare($query);
    
        // Execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function Delete($ClaSub_Id) {
        $query = "DELETE FROM `class_subjects` WHERE `ClaSub_Id` = $ClaSub_Id";
    
        $stmt = $this->conn->prepare($query);
    
        // Execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }
}
?>