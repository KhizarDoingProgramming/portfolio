<?php
/**
 * CV Upload Handler for Mustafa Khizar's Portfolio
 */

header('Content-Type: application/json');

// In a real application, you should have authentication here
// to prevent unauthorized users from uploading files.

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Check if file was uploaded without errors
    if (isset($_FILES["cv"]) && $_FILES["cv"]["error"] == 0) {
        $allowed = ["pdf" => "application/pdf", "doc" => "application/msword", "docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        $filename = $_FILES["cv"]["name"];
        $filetype = $_FILES["cv"]["type"];
        $filesize = $_FILES["cv"]["size"];

        // Verify file extension
        $ext = pathinfo($filename, PATHINFO_EXTENSION);
        if (!array_key_exists($ext, $allowed)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Please select a valid file format (PDF, DOC, DOCX)."]);
            exit;
        }

        // Verify file size - 5MB maximum
        $maxsize = 5 * 1024 * 1024;
        if ($filesize > $maxsize) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "File size is larger than the 5MB limit."]);
            exit;
        }

        // Verify MYME type of the file
        if (in_array($filetype, $allowed)) {
            // Check whether file exists before uploading it
            if (file_exists("../assets/pdf/" . "Mustafa_Khizar_CV." . $ext)) {
                // You might want to rename or overwrite
                // unlink("../assets/pdf/" . "Mustafa_Khizar_CV." . $ext);
            }
            
            // Move the file
            if (move_uploaded_file($_FILES["cv"]["tmp_name"], "../assets/pdf/" . "Mustafa_Khizar_CV." . $ext)) {
                http_response_code(200);
                echo json_encode(["status" => "success", "message" => "Your CV was uploaded successfully!"]);
            } else {
                http_response_code(500);
                echo json_encode(["status" => "error", "message" => "File could not be uploaded. Please try again."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Error: There was a problem uploading your file. Please try again."]); 
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Error: " . $_FILES["cv"]["error"]]);
    }

} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Forbidden."]);
}
?>
