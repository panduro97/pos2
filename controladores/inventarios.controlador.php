<?php
$conn = mysqli_connect('bigdeli.mx', 'atomstud_sergio', 'bigdeli123', 'atomstud_pos');
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$bandera = $_POST['true'];     

if($bandera == true){
    
    $consulta = "UPDATE stock SET stock = 0 ";
    if ($conn->query($consulta) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $consulta . "<br>" . $conn->error;
    }
    $consulta2 = "UPDATE productos SET stockInicio = 0 ";
    if ($conn->query($consulta2) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $consulta2 . "<br>" . $conn->error;
    }
    $consulta3 = "UPDATE productos SET ventas = 0 ";
    if ($conn->query($consulta3) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $consulta3 . "<br>" . $conn->error;
    }
    $fecha = date("Y-m-d");  

    $consulta4 = "DELETE FROM gastos WHERE fecha = '$fecha'  ";
    if ($conn->query($consulta4) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $consulta4 . "<br>" . $conn->error;
    }


    $nombre = $email = $subject = $mensaje = $para = $headers = $msjCorreo = NULL;

    /*   if (isset($_POST['submit'])) { */
         //Obtenemos valores input formulario
         $nombre = $_POST['nombre'];
         $email = $_POST['email'];
         $subject = $_POST['subject'];   
         $mensaje = $_POST['mensaje'];
         $para = 'panduro.sergio@outlook.es';
   
         //Creamos cabecera.
         $headers =  'MIME-Version: 1.0' . "\r\n"; 
         $headers = 'From: Sergio' . "\r\n";
         $headers .= 'Content-type: text/html;' . "\r\n"; 
   
         //Componemos cuerpo correo.
         $msjCorreo = "Nombre: " . $nombre;
         $msjCorreo .= "\r\n";
         $msjCorreo .= "Email: " . $email;
         $msjCorreo .= "\r\n";
         $msjCorreo .= "Asunto: " . $subject;
         $msjCorreo .= "\r\n";
         $msjCorreo .= "Mensaje: " . $mensaje;
         $msjCorreo .= "\r\n";
   
       mail($para, 'aver', $msjCorreo, $headers)
     

}

?>