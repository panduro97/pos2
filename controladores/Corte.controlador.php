<?php 

$conn = mysqli_connect('bigdeli.mx', 'atomstud_sergio', 'bigdeli123', 'atomstud_pos');
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$consulta = "INSERT INTO gastos(descripcion,dinero,fecha) VALUES ('$descripcion','$dinero','$fecha' )";
if ($conn->query($consulta) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $consulta . "<br>" . $conn->error;
}


?>