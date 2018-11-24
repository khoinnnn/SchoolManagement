<?php
class Student
{
    private $conn;
    private $table_name = "students";
 
    public $Stu_Id;
    public $Stu_Code;
    public $Stu_Image;
    public $Stu_Name;
    public $Stu_DOB;
    public $Stu_Email;
    public $Stu_Phone;
    public $Stu_ClassId;
    public $Stu_ClassName;
    public $Stu_CreatedAt;
    public $Stu_CreatedBy;

    public function __construct($db) {
        $this->conn = $db;
    }

    function GetAll() {
        // Select all query
        $query = "SELECT
                    student.Stu_Id, 
                    student.Stu_Code,
                    student.Stu_Image,
                    student.Stu_Name, 
                    student.Stu_DOB,
                    student.Stu_Email,
                    student.Stu_Phone,
                    student.Stu_ClassId,
                    class.Cla_Name as Stu_ClassName,
                    student.Stu_CreatedAt,
                    student.Stu_CreatedBy
                  FROM `students` as student
                  INNER JOIN classes as class
                  ON student.Stu_ClassId = class.Cla_Id";
    
        // Prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // Execute query
        $stmt->execute();
    
        return $stmt;
    }

    function GetById($Stu_Id) {
        $query = "SELECT student.Stu_Id, student.Stu_Code, student.Stu_Image, 
        student.Stu_Name, student.Stu_DOB, student.Stu_Email, 
        student.Stu_Phone, student.Stu_ClassId, class.Cla_Name as Stu_ClassName, 
        student.Stu_CreatedAt, student.Stu_CreatedBy 
        FROM `students` as student 
        INNER JOIN `classes` as class ON student.Stu_ClassId = class.Cla_Id 
        WHERE student.Stu_Id = $Stu_Id 
        LIMIT 0,1";
        
        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Set values to object properties
        $this->Stu_Id = $row['Stu_Id'];
        $this->Stu_Code = $row['Stu_Code'];
        $this->Stu_Image = $row['Stu_Image'];
        $this->Stu_Name = $row['Stu_Name'];
        $this->Stu_DOB = $row['Stu_DOB'];
        $this->Stu_Email = $row['Stu_Email'];
        $this->Stu_Phone = $row['Stu_Phone'];
        $this->Stu_ClassId = $row['Stu_ClassId'];
        $this->Stu_ClassName = $row['Stu_ClassName'];
        $this->Stu_CreatedAt = $row['Stu_CreatedAt'];
        $this->Stu_CreatedBy = $row['Stu_CreatedBy'];
    }

    function Insert($Stu_Code, $Stu_Image, $Stu_Name, $Stu_DOB, $Stu_Email, $Stu_Phone, $Stu_ClassId, $Stu_CreatedAt, $Stu_CreatedBy) {
        $query = "INSERT INTO `students`(`Stu_Code`, `Stu_Image`, `Stu_Name`, `Stu_DOB`, `Stu_Email`, `Stu_Phone`, `Stu_ClassId`, `Stu_CreatedAt`, `Stu_CreatedBy`) 
                    VALUES ('$Stu_Code', '$Stu_Image', '$Stu_Name', '$Stu_DOB', '$Stu_Email', '$Stu_Phone', $Stu_ClassId, '$Stu_CreatedAt', '$Stu_CreatedBy')";
    
        $stmt = $this->conn->prepare($query);
    
        // Execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function Update($Stu_Id, $Stu_Code, $Stu_Image, $Stu_Name, $Stu_DOB, $Stu_Email, $Stu_Phone, $Stu_ClassId) {
        $query = "UPDATE `students` 
        SET
        `Stu_Code`='$Stu_Code',
        `Stu_Image`='$Stu_Image',
        `Stu_Name`='$Stu_Name',
        `Stu_DOB`='$Stu_DOB',
        `Stu_Email`='$Stu_Email',
        `Stu_Phone`='$Stu_Phone',
        `Stu_ClassId`=$Stu_ClassId
        WHERE `Stu_Id`=$Stu_Id";
        
        $stmt = $this->conn->prepare($query);
    
        // Execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function Delete($Stu_Id) {
        $query = "DELETE FROM `students` WHERE `Stu_Id` = $Stu_Id";
    
        $stmt = $this->conn->prepare($query);
    
        // Execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }
}
?>