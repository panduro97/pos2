<?php

require_once "conexion.php";

class ModeloProductos{

	/*=============================================
	MOSTRAR PRODUCTOS
	=============================================*/

	static public function mdlMostrarProductos($tabla, $item, $valor, $orden){

		if($item != null){

			$stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla JOIN stock ON $tabla.conexion=stock.relacion WHERE $item = :$item ORDER BY $tabla.id DESC");

			$stmt -> bindParam(":".$item, $valor, PDO::PARAM_STR);

			$stmt -> execute();

			return $stmt -> fetch();

		}else{

			$stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla JOIN stock ON $tabla.conexion=stock.relacion ORDER BY $tabla.id DESC");

			$stmt -> execute();

			return $stmt -> fetchAll();

		}

		$stmt -> close();

		$stmt = null; 

	}

	/*=============================================
	REGISTRO DE PRODUCTO
	=============================================*/
	static public function mdlIngresarProducto($tabla, $datos){
		$tabla2 = "stock";
		$stmt = Conexion::conectar()->prepare("INSERT INTO $tabla(id_categoria, codigo, descripcion, imagen, precio_compra, precio_venta) VALUES (:id_categoria, :codigo, :descripcion, :imagen, :precio_compra, :precio_venta)");

		$stmt->bindParam(":id_categoria", $datos["id_categoria"], PDO::PARAM_INT);
		$stmt->bindParam(":codigo", $datos["codigo"], PDO::PARAM_STR);
		$stmt->bindParam(":descripcion", $datos["descripcion"], PDO::PARAM_STR);
		$stmt->bindParam(":imagen", $datos["imagen"], PDO::PARAM_STR);
		/* $stmt->bindParam(":stock", $datos["stock"], PDO::PARAM_STR); */
		$stmt->bindParam(":precio_compra", $datos["precio_compra"], PDO::PARAM_STR);
		$stmt->bindParam(":precio_venta", $datos["precio_venta"], PDO::PARAM_STR);

		$stmt2 = Conexion::conectar()->prepare("INSERT INTO $tabla2(codigo, stock) VALUES (:codigo, :stock)");

		$stmt2->bindParam(":codigo", $datos["codigo"], PDO::PARAM_STR);
		$stmt2->bindParam(":stock", $datos["stock"], PDO::PARAM_STR); 

		if($stmt->execute() && $stmt2->execute()){

			return "ok";

		}else{

			return "error";
		
		}

		$stmt->close();
		$stmt2->close();

		$stmt = null;
		$stmt2 = null;
		

	}

	/*=============================================
	EDITAR PRODUCTO
	=============================================*/
	static public function mdlEditarProducto($tabla, $datos){
		$tabla2 = "stock";
		$tabla3 = "stock";

		$stmt = Conexion::conectar()->prepare("UPDATE $tabla SET id_categoria = :id_categoria, descripcion = :descripcion, imagen = :imagen, stockInicio = :stockInicio, precio_compra = :precio_compra, precio_venta = :precio_venta WHERE codigo = :codigo");

		$stmt->bindParam(":id_categoria", $datos["id_categoria"], PDO::PARAM_INT);
		$stmt->bindParam(":codigo", $datos["codigo"], PDO::PARAM_STR); 
		$stmt->bindParam(":descripcion", $datos["descripcion"], PDO::PARAM_STR);
		$stmt->bindParam(":imagen", $datos["imagen"], PDO::PARAM_STR);
		$stmt->bindParam(":stockInicio", $datos["stock"], PDO::PARAM_STR);
		$stmt->bindParam(":precio_compra", $datos["precio_compra"], PDO::PARAM_STR);
		$stmt->bindParam(":precio_venta", $datos["precio_venta"], PDO::PARAM_STR);


		$stmt2 = Conexion::conectar()->prepare("UPDATE stock inner join $tabla on stock.relacion = productos.conexion SET stock = :stock WHERE codigo = :codigo");

		$stmt2->bindParam(":codigo", $datos["codigo"], PDO::PARAM_STR);
		$stmt2->bindParam(":stock", $datos["stock"], PDO::PARAM_STR); 

		
		/* $stmt3 = Conexion::conectar()->prepare("UPDATE inventarios inner join $tabla  on inventarios.indicador = productos.conexion SET stock = :stock WHERE productos.codigo = :codigo");
		$stmt3->bindParam(":codigo", $datos["codigo"], PDO::PARAM_STR);
		$stmt3->bindParam(":stock", $datos["stock"], PDO::PARAM_STR);  */
		

		if($stmt->execute() && $stmt2->execute()/*  && $stmt3->execute() */){

			return "ok";

		}else{

			return "error";
		
		}

		$stmt->close();
		$stmt = null;

	}

	/*=============================================
	BORRAR PRODUCTO
	=============================================*/

	static public function mdlEliminarProducto($tabla, $datos){

		$stmt = Conexion::conectar()->prepare("DELETE FROM $tabla WHERE id = :id");

		$stmt -> bindParam(":id", $datos, PDO::PARAM_INT);

		if($stmt -> execute()){

			return "ok";
		
		}else{

			return "error";	

		}

		$stmt -> close();

		$stmt = null;

	}

	/*=============================================
	ACTUALIZAR PRODUCTO
	=============================================*/

	static public function mdlActualizarProducto($tabla, $item1, $valor1, $valor){
		/* if($tabla == 'ventas'){ */
			echo($tabla.'<br>');
			echo($item1.'<br>'); 
			echo $valor1.'<br>';
			echo $valor.'<br>';
			echo('esto aun es del modelo'.'<br>');
			
			if($item1 == "ventas"){
				$stmt = Conexion::conectar()->prepare("UPDATE $tabla SET $item1 = :$item1 WHERE id = :id");
				$stmt -> bindParam(":".$item1, $valor1, PDO::PARAM_STR);
				$stmt -> bindParam(":id", $valor, PDO::PARAM_STR);

				$stmt3 = Conexion::conectar()->prepare("UPDATE $tabla SET $item1 = :$item1 WHERE id = :id");
				$stmt3 -> bindParam(":".$item1, $valor1, PDO::PARAM_STR);
				$stmt3 -> bindParam(":id", $valor, PDO::PARAM_STR);
		
				if($stmt -> execute()){
		
					return "ok";
				
				}else{
		
					return "error";	
		
				}
		
				$stmt -> close();
		
				$stmt = null;
			}else{
				$stmt2 = Conexion::conectar()->prepare("UPDATE stock inner join productos  on stock.relacion = productos.conexion SET $item1 = :$item1 WHERE productos.id = :id");
				$stmt2 -> bindParam(":".$item1, $valor1, PDO::PARAM_STR);
				$stmt2 -> bindParam(":id", $valor, PDO::PARAM_STR);
		

		
				if($stmt2 -> execute()){
		
					return "ok";
				
				}else{
		
					return "error";	

				}

		
				$stmt2 -> close();

		
				$stmt2 = null;

			}

	   /* } */



/* 		if($tabla == 'productos'){
		switch ($valor) {
			case '27':
			$stmt = Conexion::conectar()->prepare("UPDATE productos SET $item1 = :$item1 WHERE id = :id");
			$stmt2 = Conexion::conectar()->prepare("UPDATE productos SET $item1 = :$item1 WHERE id = 40"); 


			$valor1 = $valor1 + 0.5; 
			$stmt -> bindParam(":".$item1, $valor1, PDO::PARAM_STR);
			$stmt -> bindParam(":id", $valor, PDO::PARAM_STR);

		 	$stmt2 -> bindParam(":".$item1, $valor1, PDO::PARAM_STR);
 
			if($stmt -> execute() && $stmt2 -> execute() ){
	
				return "ok";
			
			}else{
	
				return "error";	
	
			}
	
			$stmt -> close();
	
			$stmt = null;
				break;

				case '40':
				$stmt = Conexion::conectar()->prepare("UPDATE productos SET $item1 = :$item1 WHERE id = :id");
				$stmt2 = Conexion::conectar()->prepare("UPDATE productos SET $item1 = :$item1 WHERE id = 27"); 

			
				$valor1 = $valor1 + 0.5; 
				echo $valor1;
				echo 'esto es valor1';
				$stmt -> bindParam(":".$item1, $valor1, PDO::PARAM_STR);
				$stmt -> bindParam(":id", $valor, PDO::PARAM_STR);
	
				 $stmt2 -> bindParam(":".$item1, $valor1, PDO::PARAM_STR);
	 
				if($stmt -> execute() && $stmt2 -> execute() ){
		
					return "ok";
				
				}else{
		
					return "error";	
		
				}
		
				$stmt -> close();
		
				$stmt = null;
				break;	

			default:
				break;
		}
	} */
	


	}

	/*=============================================
	MOSTRAR SUMA VENTAS
	=============================================*/	

	static public function mdlMostrarSumaVentas($tabla){

		$stmt = Conexion::conectar()->prepare("SELECT SUM(ventas) as total FROM $tabla");

		$stmt -> execute();

		return $stmt -> fetch();

		$stmt -> close();

		$stmt = null;
	}


}