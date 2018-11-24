<?php
    // Required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: multipart/form-data; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $error = "";
    $fname = $_FILES["file"]["name"];
    $fsize = $_FILES["file"]["size"];
    $ftmp = $_FILES["file"]["tmp_name"];
    $ftype = $_FILES["file"]["type"];
    $fext = pathinfo($fname, PATHINFO_EXTENSION);
    $extension = array("jpeg", "jpg", "png");

    if(in_array($fext, $extension) == false) 
    {
        $error = "Định dạng ảnh không đúng, chọn file JPG or PNG";
    }

    if($fsize > 2000000)
    {
        if($error != "")
            $error += ". Kích thước file phải nhỏ hơn 2MB";
        else
            $error += "Kích thước file phải nhỏ hơn 2MB";
    }

    if(empty($error) === true)
    {
        $nameChanged = GenerateRandomString() . "." . $fext;

        move_uploaded_file($ftmp, "../files/" . $nameChanged);
        
        http_response_code(200);

        echo json_encode(array(
            "Success" => true,
            "FilePath" => $nameChanged
        ));
    }
    else 
    {
        echo json_encode(array(
            "Success" => false,
            "Message" => $error
        ));
    }

    function GenerateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }

        return $randomString;
    }
?>