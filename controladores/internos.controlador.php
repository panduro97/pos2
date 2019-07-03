<?php
$conn = mysqli_connect('bigdeli.mx', 'atomstud_sergio', 'bigdeli123', 'atomstud_pos');
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

    $descripcion = $_POST['descripcion'];     
    $costo = $_POST['costo'];
    $stock = $_POST['stock'];  

    $consulta = "INSERT INTO interno(descripcion,costo,stock) VALUES ('$descripcion','$costo','$stock' )";
    if ($conn->query($consulta) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $consulta . "<br>" . $conn->error;
    }



?> 