<?php 

use Mike42\Escpos\Printer;
use Mike42\Escpos\EscposImage;
//use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;

$conn = mysqli_connect('bigdeli.mx', 'atomstud_sergio', 'bigdeli123', 'atomstud_pos');
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

/* $bandera = $_POST['data'];     


    $hoy = date("d-m-y");
    echo $hoy;

    $consulta3 = "SELECT * from ventas";
    $datos = $conn->query($consulta3);
    $row = mysqli_fetch_array($datos);
    $row2 = $row['fecha']; 
    echo $row2;


 */
$bandera = $_POST['data']; 
if($bandera == 'true')
{

    $fecha = date("Y-m-9");
    var_dump( $fecha.'<br>');
    echo 'esta es la fecha shida <br>';
    $consulta2 = "SELECT * from ventas where fechaz = '$fecha'";
    $resultado2 = $conn->query($consulta2);


        $impresora = "RPT-008";

        $conector = new WindowsPrintConnector($impresora);

        $imprimir = new  Printer($conector);

        $imprimir->setJustification(Printer::JUSTIFY_CENTER);

        $imprimir-> text("BIG DELI"."\n");
        
        $imprimir-> text("SIEMPRE GRANDE Y DELICIOSO"."\n");

        $imprimir-> feed(1);

        $imprimir-> text("Corte de Caja - VENTAS"."\n");

        $imprimir->text(date("Y-m-d h:i:s")."\n");

        $imprimir-> feed(1);

        $imprimir-> $id_vendedor;

        $imprimir-> feed(1);

        $imprimir-> text("listado:"."\n");

        $imprimir-> text("----------------------------"."\n");

        while ($fila2 = $resultado2->fetch_row()) {

            $codigo = $fila2[1].'<br>';
            $id_vendedor = $fila2[3].'<br>';
            $total = $fila2[7].'<br>';
            
            $imprimir-> $codigo;
            $imprimir-> $id_vendedor;
            $imprimir-> $total; 
        }   

       

        $imprimir-> text("----------------------------"."\n");

        $imprimir-> feed(1);	

        $imprimir->cut();

        $imprimir->close(); 
        
    
    


    $resultado2->close();
}



$conn->close();
?>