<?php 

    // $input = file_get_contents("php://input");
    // $data = json_decode($input);

    header("Content-Type: application/json");

    echo json_encode([
        'status' => '200',
        'body' => $_POST
    ]);

?>