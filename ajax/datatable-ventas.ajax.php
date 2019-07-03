<?php

require_once "../controladores/productos.controlador.php";
require_once "../modelos/productos.modelo.php";





class TablaProductosVentas{

 	/*=============================================
 	 MOSTRAR LA TABLA DE PRODUCTOS
  	=============================================*/ 
	  
		  
	public function mostrarTablaProductosVentas(){
		$item = null;
    	$valor = null;
    	$orden = "id";

  		$productos = ControladorProductos::ctrMostrarProductos($item, $valor, $orden);
 		
  		if(count($productos) == 0){

  			echo '{"data": []}';

		  	return;
  		}	
		
  		$datosJson = '{
		  "data": [';

		  for($i = 0; $i < count($productos); $i++){
			 /* var_dump($productos[1]); */ 
		  	/*=============================================
 	 		TRAEMOS LA IMAGEN
  			=============================================*/ 

		  	$imagen = "<button class=' agregarProducto recuperarBoton' id='".$productos[$i]["codigo"]."' idProducto='".$productos[$i]["id"]."'><img src='".$productos[$i]["imagen"]."' id='".$productos[$i]["codigo"]."' width='150px'></button>";

		  	/*=============================================
 	 		STOCK
  			=============================================*/ 

  			if($productos[$i]["stock"] <= 10){

  				$stock = "<button style='height:80px;width:90px;'  id='".$productos[$i]["codigo"]."' class='btn btn-danger'>".$productos[$i]["stock"]."</button>";

  			}else if($productos[$i]["stock"] > 11 && $productos[$i]["stock"] <= 15){

  				$stock = "<button style='height:80px;width:90px;'  id='".$productos[$i]["codigo"]."' class='btn btn-warning'>".$productos[$i]["stock"]."</button>";

  			}else{

  				$stock = "<button style='height:80px;width:90px;'  id='".$productos[$i]["codigo"]."' class='btn btn-success'>".$productos[$i]["stock"]."</button>";

  			}

		  	/*=============================================
 	 		TRAEMOS LAS ACCIONES
  			=============================================*/ 
			  $botones =  "<div id='".$productos[$i]["codigo"]."' class='btn-group'><button class='btn btn-primary agregarProdu agregarProducto recuperarBoton' idProducto='".$productos[$i]["id"]."' style='height:80px;width:90px;'>Agregar</button></div>"; 


			  
			  $datosJson .='[
			      "'.($i+1).'",
			      "'.$imagen.'",
			      "'.$productos[$i]["codigo"].'",
			      "'.$productos[$i]["descripcion"].'",
			      "'.$stock.'",
			      "'.$botones.'"
				],';
			

		  }

		  $datosJson = substr($datosJson, 0, -1);

		 $datosJson .=   '] 

		 }';

		  echo $datosJson;  


	}


}

/*=============================================
ACTIVAR TABLA DE PRODUCTOS
=============================================*/ 
$activarProductosVentas = new TablaProductosVentas();
$activarProductosVentas -> mostrarTablaProductosVentas();

