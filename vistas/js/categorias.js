/*=============================================
EDITAR CATEGORIA
=============================================*/
$(".tablas").on("click", ".btnEditarCategoria", function(){

	var idCategoria = $(this).attr("idCategoria");

	var datos = new FormData();
	datos.append("idCategoria", idCategoria);

	$.ajax({
		url: "ajax/categorias.ajax.php",
		method: "POST",
      	data: datos,
      	cache: false,
     	contentType: false,
     	processData: false,
     	dataType:"json",
     	success: function(respuesta){

     		$("#editarCategoria").val(respuesta["categoria"]);
     		$("#idCategoria").val(respuesta["id"]);

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
ELIMINAR CATEGORIA
=============================================*/
$(".tablas").on("click", ".btnEliminarCategoria", function(){

	 var idCategoria = $(this).attr("idCategoria");

	 swal({
	 	title: '¿Está seguro de borrar la categoría?',
	 	text: "¡Si no lo está puede cancelar la acción!",
	 	type: 'warning',
	 	showCancelButton: true,
	 	confirmButtonColor: '#3085d6',
	 	cancelButtonColor: '#d33',
	 	cancelButtonText: 'Cancelar',
	 	confirmButtonText: 'Si, borrar categoría!'
	 }).then(function(result){

	 	if(result.value){

	 		window.location = "index.php?ruta=categorias&idCategoria="+idCategoria;

	 	}

	 })

})