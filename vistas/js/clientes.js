/*=============================================
EDITAR CLIENTE
=============================================*/
$(".tablas").on("click", ".btnEditarCliente", function(){

	var idCliente = $(this).attr("idCliente");

	var datos = new FormData();
    datos.append("idCliente", idCliente);

    $.ajax({

      url:"ajax/clientes.ajax.php",
      method: "POST",
      data: datos,
      cache: false,
      contentType: false,
      processData: false,
      dataType:"json",
      success:function(respuesta){
      
      	   $("#idCliente").val(respuesta["id"]);
	       $("#editarCliente").val(respuesta["nombre"]);
	       $("#editarDocumentoId").val(respuesta["documento"]);
	       $("#editarEmail").val(respuesta["email"]);
	       $("#editarTelefono").val(respuesta["telefono"]);
	       $("#editarDireccion").val(respuesta["direccion"]);
           $("#editarFechaNacimiento").val(respuesta["fecha_nacimiento"]);
	  }

  	})

})

function valores(){
	momentoActual = new Date() 
	hora = momentoActual.getHours() 
	minuto = momentoActual.getMinutes() 
	segundo = momentoActual.getSeconds() 
		
	var horaFinal = hora + 2

	localStorage.setItem('horaF', horaFinal);
	cocinado();
}


function cocinado() {

        

		momentoActual = new Date() 	
		var minuto = momentoActual.getHours() 
		var TiempoF = localStorage.getItem('horaF');
		if(minuto >= Number(TiempoF)  ){
			localStorage.removeItem('horaF')
			$.ajax({
				type: "POST",
				url: 'ajax/tiempo.ajax.php',
				data: {data:true},
				dataType: "json",
				success:function(){

					alert('Producto Listo para la venta!')
						  
				}
			  });
		}else{
			console.log('no es igual');
			console.log(minuto);
			setInterval(cocinado, 300000);
		}
}

$( document ).ready(function() {
	var TiempoF = localStorage.getItem('horaF');
	if(TiempoF){
		valores()
	}	
});
/*=============================================
ELIMINAR CLIENTE
=============================================*/
$(".tablas").on("click", ".btnEliminarCliente", function(){

	var idCliente = $(this).attr("idCliente");
	
	swal({
        title: '¿Está seguro de borrar el cliente?',
        text: "¡Si no lo está puede cancelar la acción!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, borrar cliente!'
      }).then(function(result){
        if (result.value) {
          
            window.location = "index.php?ruta=clientes&idCliente="+idCliente;
        }

  })

})