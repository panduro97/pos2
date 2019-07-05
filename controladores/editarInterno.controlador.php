<?php
$conn = mysqli_connect('bigdeli.mx', 'atomstud_sergio', 'bigdeli123', 'atomstud_pos');
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

$id = $_POST['id'];  
$descripcion = $_POST['descripcion'];     
$stock = $_POST['stock'];     
$costo = $_POST['costo'];




if($descripcion != null && $stock != null && $costo != null){
    $consulta = "UPDATE `interno` SET `descripcion` = '$descripcion', `stock` = $stock, `costo` = $costo   WHERE `id`= $id";
    if ($conn->query($consulta) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $consulta . "<br>" . $conn->error;
    }
}else if($descripcion != null && $stock != null){
    $consulta = "UPDATE `interno` SET `descripcion` = '$descripcion', `stock` = $stock WHERE `id`= $id";
    if ($conn->query($consulta) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $consulta . "<br>" . $conn->error;
    }
}else if($descripcion != null && $costo != null){
    $consulta = "UPDATE `interno` SET `descripcion` = '$descripcion', `costo` = $costo WHERE `id`= $id";
    if ($conn->query($consulta) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $consulta . "<br>" . $conn->error;
    }
}else if($stock != null && $costo != null){
    $consulta = "UPDATE `interno` SET `stock` = $stock, `costo` = $costo   WHERE `id`= $id";
    if ($conn->query($consulta) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $consulta . "<br>" . $conn->error;
    }
}else if($stock != null){
    $consulta = "UPDATE `interno` SET `stock` = $stock WHERE `id`= $id";
    if ($conn->query($consulta) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $consulta . "<br>" . $conn->error;
    }
}else if($descripcion != null){
    $consulta = "UPDATE `interno` SET `descripcion` = $descripcion WHERE `id`= $id";
    if ($conn->query($consulta) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $consulta . "<br>" . $conn->error;
    }
}else if($costo != null){
    $consulta = "UPDATE `interno` SET `costo` = $costo WHERE `id`= $id";
    if ($conn->query($consulta) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $consulta . "<br>" . $conn->error;
    }
}


?> 