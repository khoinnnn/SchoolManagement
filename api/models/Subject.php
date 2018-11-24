<?php
class Subject
{
    private $conn;
    private $table_name = "subjects";
 
    public $Sub_Id;
    public $Sub_Name;
    public $Sub_Lessons;
    public $Sub_CreditTheory;
    public $Sub_CreditPractice;
    public $Sub_CreditExercise;
    public $Sub_CreatedAt;
    public $Sub_CreatedBy;

    public function __construct($db) {
        $this->conn = $db;
    }

    function GetAll() {
        // Select all query
        $query = "SELECT
                    Sub_Id, 
                    Sub_Name,
                    Sub_Lessons,
                    Sub_CreditTheory, 
                    Sub_CreditPractice,
                    Sub_CreditExercise,
                    Sub_CreatedAt,
                    Sub_CreatedBy
                  FROM " . $this->table_name;
    
        // Prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // Execute query
        $stmt->execute();
    
        return $stmt;
    }

    function Insert($sub_Name, $sub_Lessons, 
    $sub_CreditTheory, $sub_CreditPractice, 
    $sub_CreditExercise, $sub_CreatedAt, $sub_CreatedBy) {
        $query = "INSERT INTO 
        `subjects` (`Sub_Name`, `Sub_Lessons`, 
        `Sub_CreditTheory`, `Sub_CreditPractice`,
        `Sub_CreditExercise`, `Sub_CreatedAt`, `Sub_CreatedBy`) 
                  VALUES (
                    '$sub_Name', 
                    $sub_Lessons,
                    $sub_CreditTheory,
                    $sub_CreditPractice,
                    $sub_CreditExercise,
                    '$sub_CreatedAt',
                    '$sub_CreatedBy'
                  )";
    
        $stmt = $this->conn->prepare($query);
    
        // Execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function Update($sub_Id, $sub_Name, $sub_Lessons, 
    $sub_CreditTheory, $sub_CreditPractice, $sub_CreditExercise) {
        $query = "UPDATE `subjects` 
        SET 
        `Sub_Name`= '$sub_Name', 
        `Sub_Lessons`= $sub_Lessons,
        `Sub_CreditTheory`= $sub_CreditTheory,
        `Sub_CreditPractice`= $sub_CreditPractice,
        `Sub_CreditExercise`= $sub_CreditExercise
        WHERE `Sub_Id`= $sub_Id";
    
        $stmt = $this->conn->prepare($query);
    
        // Execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function Delete($Sub_Id) {
        $query = "DELETE FROM `subjects` WHERE `Sub_Id` = $Sub_Id";
    
        $stmt = $this->conn->prepare($query);
    
        // Execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }
}
?>