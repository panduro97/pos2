<?php
$conn = mysqli_connect('bigdeli.mx', 'atomstud_sergio', 'bigdeli123', 'atomstud_pos');
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

$id = $_POST['id'];  
$stock = $_POST['stock'];     


$consulta = "UPDATE `interno` SET `stock` = $stock WHERE `id`= $id";
if ($conn->query($consulta) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $consulta . "<br>" . $conn->error;
}
/* $consulta = "SELECT * FROM interno WHERE id = '$id'";
$datos = $conn->query($consulta);
$resultado=0;
while ($row=mysqli_fetch_array($datos)){
    echo json_encode($row);
} */
?> 