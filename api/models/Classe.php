<?php
class Classe
{
    private $conn;
    private $table_name = "classes";
 
    public $Cla_Id;
    public $Cla_Name;
    public $Cla_SchoolYear;
    public $Cla_CreatedAt;
    public $Cla_CreatedBy;

    public function __construct($db) {
        $this->conn = $db;
    }

    function GetAll() {
        // Select all query
        $query = "SELECT
                    Cla_Id, 
                    Cla_Name,
                    Cla_SchoolYear,
                    Cla_CreatedAt, 
                    Cla_CreatedBy
                  FROM " . $this->table_name;
    
        // Prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // Execute query
        $stmt->execute();
    
        return $stmt;
    }

    function Insert($cla_Name, $cla_SchoolYear, $cla_CreatedAt, $cla_CreatedBy) {
        $query = "INSERT INTO `classes`(`Cla_Name`, `Cla_SchoolYear`, `Cla_CreatedAt`, `Cla_CreatedBy`) 
                  VALUES (
                    '$cla_Name', 
                    $cla_SchoolYear,
                    '$cla_CreatedAt',
                    '$cla_CreatedBy'
                  )";
    
        $stmt = $this->conn->prepare($query);
    
        // Execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function Update($cla_Id, $cla_Name, $cla_SchoolYear) {
        $query = "UPDATE `classes` 
        SET `Cla_Name`= '$cla_Name', `Cla_SchoolYear`= $cla_SchoolYear
        WHERE `Cla_Id`= $cla_Id";
    
        $stmt = $this->conn->prepare($query);
    
        // Execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function Delete($cla_Id) {
        $query = "DELETE FROM `classes` WHERE `Cla_Id` = $cla_Id";
    
        $stmt = $this->conn->prepare($query);
    
        // Execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }
}
?>