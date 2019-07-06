<?php
   //Reseteamos variables a 0.
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
  
/*   } */
?>