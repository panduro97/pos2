<?php
$conn = mysqli_connect('bigdeli.mx', 'atomstud_sergio', 'bigdeli123', 'atomstud_pos');
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

$id = $_POST['id'];     


$consulta = "SELECT * FROM interno WHERE id = '$id'";
$datos = $conn->query($consulta);
$resultado=0;
while ($row=mysqli_fetch_array($datos)){
    echo json_encode($row);


echo "<div id='modalAgregarProducto' class='modal fade' role='dialog'>
<div class='modal-dialog'>
<div class='modal-content'>
<form role='form' method='post' enctype='multipart/form-data'>
<div class='modal-header' style='background:#3c8dbc; color:white'>
<button type='button' class='close' data-dismiss='modal'>&times;</button>
<h4 class='modal-title'>Agregar producto</h4>
</div>
<div class='modal-body'>
<div class='box-body'>
<div class='form-group'>
<div class='input-group'>
<span class='input-group-addon'><i class='fa fa-product-hunt'></i></span>
<input type='text' class='form-control input-lg internoDescripcion' name='nuevaDescripcion' placeholder='Ingresar descripción' required>
</div>
</div>
<div class='form-group'>
<div class='input-group'>
<span class='input-group-addon'><i class='fa fa-check'></i></span>
<input type='number' class='form-control input-lg internoStock' name='nuevoStock' min='0' placeholder='Stock' required>
</div>
echo </div>
<div class='form-group row'>
<div class='col-xs-6'>
<div class='input-group'>
<span class='input-group-addon'><i class='fa fa-arrow-up'></i></span>
<input type='number' class='form-control input-lg precioInterno' name='nuevoPrecioCompra' min='0' placeholder='Precio de compra' required>
</div>
</div>
</div>
</div>
</div>
<div class='modal-footer'>
<button type='button' class='btn btn-default pull-left' data-dismiss='modal'>Salir</button>
<button type='submit' class='btn btn-primary editarInterno'>Guardar Edición</button>
</div>
</form>
</div>
</div>
</div>";
}

?> 