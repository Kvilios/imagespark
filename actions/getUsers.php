<?php
    $range = explode('-', $_GET['range']);
    $from = $range[0];
    $to = $range[1];
    $file = file_get_contents('../src/assets/users.json');
    $array = json_decode($file, true)['users'];
    echo json_encode(array_slice($array, $from, $to));
?>