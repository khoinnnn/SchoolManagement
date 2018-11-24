<?php
class Database
{
    // Specify your own database credentials
    private $host = "localhost";
    private $db_name = "schooldb";
    private $username = "root";
    private $password = "";
    public $conn;
 
    // Get the database connection
    public function GetConnection() {
 
        $this->conn = null;
 
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch (PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>