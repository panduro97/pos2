/*=============================================
CARGAR LA TABLA DINÁMICA DE VENTAS
=============================================*/

// $.ajax({

// 	url: "ajax/datatable-ventas.ajax.php",
// 	success:function(respuesta){
		
// 		console.log("respuesta", respuesta);

// 	}

// })// 

$('.tablaVentas').DataTable( {
    "ajax": "ajax/datatable-ventas.ajax.php",
    "deferRender": true,
	"retrieve": true,
	"processing": true,
	 "language": {

			"sProcessing":     "Procesando...",
			"sLengthMenu":     "Mostrar _MENU_ registros",
			"sZeroRecords":    "No se encontraron resultados",
			"sEmptyTable":     "Ningún dato disponible en esta tabla",
			"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
			"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
			"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
			"sInfoPostFix":    "",
			"sSearch":         "Buscar:",
			"sUrl":            "",
			"sInfoThousands":  ",",
			"sLoadingRecords": "Cargando...",
			"oPaginate": {
			"sFirst":    "Primero",
			"sLast":     "Último",
			"sNext":     "Siguiente",
			"sPrevious": "Anterior"
			},
			"oAria": {
				"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
				"sSortDescending": ": Activar para ordenar la columna de manera descendente"
			}

	}

} );
/*=============================================
Categorias botones
=============================================*/
/* $(".eltruco section").on("click", "button.categoria", function(){
	var idCategoria = $(this).attr("idCategoria");
	alert(idCategoria);
	var idCategoria = new FormData();
	idCategoria.append("idProducto", idProducto);
 	$.ajax({

		url:"modelos/ver.php",
		method: "POST",
		data: idCategoria,
		cache: false,
		contentType: false,
		processData: false,
		dataType:"json",
	})
});
 */
/*=============================================
AGREGANDO PRODUCTOS A LA VENTA DESDE LA TABLA
=============================================*/

$(".tablaVentas tbody").on("click", "button.agregarProducto", function(){

	var idProducto = $(this).attr("idProducto");

	$(this).removeClass("btn-primary agregarProducto");

	$(this).addClass("btn-default");

	var datos = new FormData();
	datos.append("idProducto", idProducto);


     $.ajax({

     	url:"ajax/productos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){
      	    var descripcion = respuesta["descripcion"];
          	var stock = respuesta["stock"];
						var precio = respuesta["precio_venta"];
						console.log(respuesta);
						console.log(descripcion);
						console.log(stock);
						console.log(precio);

          	/*=============================================
          	EVITAR AGREGAR PRODUTO CUANDO EL STOCK ESTÁ EN CERO
						=============================================*/
						var stocks = stock - 1
						var cantidad = 1
						switch (idProducto) {
								case '50':
									var prueba = stock - 0.5
									alert(prueba)
									
									if(prueba<=0 && stock > 0){
									
									}else{
										var stook = stock - 0.5
									}
									break;
								case '48':
									var stook = stock - 1
									
									break;

									case '53':
										var stook = stock - 1.5
									
										break;
								default:
									var stook = stock - 1
								
									break;
							}
          	if(stook <= 0){

      			swal({
			      title: "No hay stock disponible",
			      type: "error",
			      confirmButtonText: "¡Cerrar!"
			    });

			    $("button[idProducto='"+idProducto+"']").addClass("btn-primary agregarProducto");

			    return;

						}


						
					

          	$(".nuevoProducto").append(

          	'<div class="row" style="padding:5px 15px">'+

			  '<!-- Descripción del producto -->'+
	          
	          '<div class="col-xs-6" style="padding-right:0px">'+
	          
	            '<div class="input-group">'+
	              
	              '<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarProducto" idProducto="'+idProducto+'"><i class="fa fa-times"></i></button></span>'+

	              '<input type="text" class="form-control nuevaDescripcionProducto" idProducto="'+idProducto+'" name="agregarProducto" value="'+descripcion+'" readonly required>'+

	            '</div>'+

	          '</div>'+

	          '<!-- Cantidad del producto -->'+

	          '<div class="col-xs-3">'+
	            
	             '<input type="number" class="form-control nuevaCantidadProducto" name="nuevaCantidadProducto" min="'+cantidad+'" value="'+cantidad+'" stock="'+stock+'" nuevoStock="'+Number(stocks)+'" required>'+

	          '</div>' +

	          '<!-- Precio del producto -->'+

	          '<div class="col-xs-3 ingresoPrecio" style="padding-left:0px">'+

	            '<div class="input-group">'+

	              '<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
	                 
								'<input type="text" class="form-control nuevoPrecioProducto" precioReal="'+precio+'" name="nuevoPrecioProducto" value="'+precio+'" readonly required>'+
								
	              '<input type="hidden" class="form-control stockReal" stockReal="'+stock+'" name="stockReal" value="'+stock+'" readonly required>'+

	              '<input type="hidden" class="form-control stockReal" stockReal="'+stock+'" name="stockReal" value="'+stock+'" readonly required>'+

	            '</div>'+
	             
	          '</div>'+

					'</div>') 
					
			/* 		var nombreProductos = $('nuevoStock').val(); 
				
				console.log(nombreProductos) */

	        // SUMAR TOTAL DE PRECIOS

	        sumarTotalPrecios()

	        // AGREGAR IMPUESTO

	        agregarImpuesto()

	        // AGRUPAR PRODUCTOS EN FORMATO JSON

	        listarProductos()

	        // PONER FORMATO AL PRECIO DE LOS PRODUCTOS

	        $(".nuevoPrecioProducto").number(true, 2);


			localStorage.removeItem("quitarProducto");

      	}

     })

});























/*=============================================
CUANDO CARGUE LA TABLA CADA VEZ QUE NAVEGUE EN ELLA
=============================================*/

$(".tablaVentas").on("draw.dt", function(){

	if(localStorage.getItem("quitarProducto") != null){

		var listaIdProductos = JSON.parse(localStorage.getItem("quitarProducto"));

		for(var i = 0; i < listaIdProductos.length; i++){

			$("button.recuperarBoton[idProducto='"+listaIdProductos[i]["idProducto"]+"']").removeClass('btn-default');
			$("button.recuperarBoton[idProducto='"+listaIdProductos[i]["idProducto"]+"']").addClass('btn-primary agregarProducto');

		}


	}


})


/*=============================================
QUITAR PRODUCTOS DE LA VENTA Y RECUPERAR BOTÓN
=============================================*/

var idQuitarProducto = [];

localStorage.removeItem("quitarProducto");

$(".formularioVenta").on("click", "button.quitarProducto", function(){

	$(this).parent().parent().parent().parent().remove();

	var idProducto = $(this).attr("idProducto");

	/*=============================================
	ALMACENAR EN EL LOCALSTORAGE EL ID DEL PRODUCTO A QUITAR
	=============================================*/

	if(localStorage.getItem("quitarProducto") == null){

		idQuitarProducto = [];
	
	}else{

		idQuitarProducto.concat(localStorage.getItem("quitarProducto"))

	}

	idQuitarProducto.push({"idProducto":idProducto});

	localStorage.setItem("quitarProducto", JSON.stringify(idQuitarProducto));

	$("button.recuperarBoton[idProducto='"+idProducto+"']").removeClass('btn-default');

	$("button.recuperarBoton[idProducto='"+idProducto+"']").addClass('btn-primary agregarProducto');

	if($(".nuevoProducto").children().length == 0){

		$("#nuevoImpuestoVenta").val(0);
		$("#nuevoTotalVenta").val(0);
		$("#totalVenta").val(0);
		$("#nuevoTotalVenta").attr("total",0);

	}else{

		// SUMAR TOTAL DE PRECIOS

    	sumarTotalPrecios()

    	// AGREGAR IMPUESTO
	        
        agregarImpuesto()

        // AGRUPAR PRODUCTOS EN FORMATO JSON

        listarProductos()

	}

})

/*=============================================
AGREGANDO PRODUCTOS DESDE EL BOTÓN PARA DISPOSITIVOS
=============================================*/

var numProducto = 0;

$(".btnAgregarProducto").click(function(){

	numProducto ++;

	var datos = new FormData();
	datos.append("traerProductos", "ok");

	$.ajax({

		url:"ajax/productos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){
      	    alert(respuesta)
      	    	$(".nuevoProducto").append(

          	'<div class="row" style="padding:5px 15px">'+

			  '<!-- Descripción del producto -->'+
	          
	          '<div class="col-xs-6" style="padding-right:0px">'+
	          
	            '<div class="input-group">'+
	              
	              '<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarProducto" idProducto><i class="fa fa-times"></i></button></span>'+

	              '<select class="form-control nuevaDescripcionProducto" id="producto'+numProducto+'" idProducto name="nuevaDescripcionProducto" required>'+

	              '<option>Seleccione el producto</option>'+

	              '</select>'+  

	            '</div>'+

	          '</div>'+

	          '<!-- Cantidad del producto -->'+

	          '<div class="col-xs-3 ingresoCantidad">'+
	            
	             '<input type="number" class="form-control nuevaCantidadProducto" style="heigth:60px;" name="nuevaCantidadProducto" min="1" value="0" stock nuevoStock required>'+

	          '</div>' +

	          '<!-- Precio del producto -->'+

	          '<div class="col-xs-3 ingresoPrecio" style="padding-left:0px">'+

	            '<div class="input-group">'+

	              '<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
	                 
	              '<input type="text" class="form-control nuevoPrecioProducto" precioReal="" name="nuevoPrecioProducto" readonly required>'+
	 
	            '</div>'+
	             
	          '</div>'+

	        '</div>');


	        // AGREGAR LOS PRODUCTOS AL SELECT 

	         respuesta.forEach(funcionForEach);

	         function funcionForEach(item, index){

	         	if(item.stock != 0){

		         	$("#producto"+numProducto).append(

						'<option idProducto="'+item.id+'" value="'+item.descripcion+'">'+item.descripcion+'</option>'
		         	)

		         
		         }

		         

	         }

        	 // SUMAR TOTAL DE PRECIOS

    		sumarTotalPrecios()

    		// AGREGAR IMPUESTO
	        
	        agregarImpuesto()

	        // PONER FORMATO AL PRECIO DE LOS PRODUCTOS

	        $(".nuevoPrecioProducto").number(true, 2);


      	}

	})

})

/*=============================================
SELECCIONAR PRODUCTO
=============================================*/

$(".formularioVenta").on("change", "select.nuevaDescripcionProducto", function(){

	var nombreProducto = $(this).val();

	var nuevaDescripcionProducto = $(this).parent().parent().parent().children().children().children(".nuevaDescripcionProducto");

	var nuevoPrecioProducto = $(this).parent().parent().parent().children(".ingresoPrecio").children().children(".nuevoPrecioProducto");

	var nuevaCantidadProducto = $(this).parent().parent().parent().children(".ingresoCantidad").children(".nuevaCantidadProducto");

	var datos = new FormData();
    datos.append("nombreProducto", nombreProducto);


	  $.ajax({

     	url:"ajax/productos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){
      	    
      	     $(nuevaDescripcionProducto).attr("idProducto", respuesta["id"]);
      	    $(nuevaCantidadProducto).attr("stock", respuesta["stock"]);
      	    $(nuevaCantidadProducto).attr("nuevoStock", Number(respuesta["stock"])-1);
      	    $(nuevoPrecioProducto).val(respuesta["precio_venta"]);
      	    $(nuevoPrecioProducto).attr("precioReal", respuesta["precio_venta"]);

  	      // AGRUPAR PRODUCTOS EN FORMATO JSON

	        listarProductos()

      	}

      })
})

/*=============================================
MODIFICAR LA CANTIDAD
=============================================*/

$(".formularioVenta").on("change", "input.nuevaCantidadProducto", function(){

	var precio = $(this).parent().parent().children(".ingresoPrecio").children().children(".nuevoPrecioProducto");

	var precioFinal = $(this).val() * precio.attr("precioReal");
	
	precio.val(precioFinal);

	var nuevoStock = Number($(this).attr("stock")) - $(this).val();

	$(this).attr("nuevoStock", nuevoStock);

	if(Number($(this).val()) > Number($(this).attr("stock"))){

		/*=============================================
		SI LA CANTIDAD ES SUPERIOR AL STOCK REGRESAR VALORES INICIALES
		=============================================*/

		$(this).val(0);

		$(this).attr("nuevoStock", $(this).attr("stock"));

		var precioFinal = $(this).val() * precio.attr("precioReal");

		precio.val(precioFinal);

		sumarTotalPrecios();

		swal({
	      title: "La cantidad supera el Stock",
	      text: "¡Sólo hay "+$(this).attr("stock")+" unidades!",
	      type: "error",
	      confirmButtonText: "¡Cerrar!"
	    });

	    return;

	}

	// SUMAR TOTAL DE PRECIOS

	sumarTotalPrecios()

	// AGREGAR IMPUESTO
	        
    agregarImpuesto()

    // AGRUPAR PRODUCTOS EN FORMATO JSON

    listarProductos()

})

/*=============================================
SUMAR TODOS LOS PRECIOS
=============================================*/

function sumarTotalPrecios(){

	var precioItem = $(".nuevoPrecioProducto");
	
	var arraySumaPrecio = [];  

	for(var i = 0; i < precioItem.length; i++){

		 arraySumaPrecio.push(Number($(precioItem[i]).val()));
		
		 
	}

	function sumaArrayPrecios(total, numero){

		return total + numero;

	}

	var sumaTotalPrecio = arraySumaPrecio.reduce(sumaArrayPrecios);
	
	$("#nuevoTotalVenta").val(sumaTotalPrecio);
	$("#totalVenta").val(sumaTotalPrecio);
	$("#nuevoTotalVenta").attr("total",sumaTotalPrecio);


}

/*=============================================
FUNCIÓN AGREGAR IMPUESTO
=============================================*/

function agregarImpuesto(){

	var impuesto = $("#nuevoImpuestoVenta").val();
	var precioTotal = $("#nuevoTotalVenta").attr("total");

	var precioImpuesto = 0;

	var totalConImpuesto = Number(precioTotal);
	
	$("#nuevoTotalVenta").val(totalConImpuesto);

	$("#totalVenta").val(totalConImpuesto);

	$("#nuevoPrecioImpuesto").val(precioImpuesto);

	$("#nuevoPrecioNeto").val(precioTotal);

}	

/*=============================================
CUANDO CAMBIA EL IMPUESTO
=============================================*/

/* $("#nuevoImpuestoVenta").change(function(){

	agregarImpuesto();

}); */

/*=============================================
FORMATO AL PRECIO FINAL
=============================================*/

$("#nuevoTotalVenta").number(true, 2);

/*=============================================
SELECCIONAR MÉTODO DE PAGO
=============================================*/

$("#nuevoMetodoPago").change(function(){

	var metodo = $(this).val();

	if(metodo == "Efectivo"){

		$(this).parent().parent().removeClass("col-xs-6");

		$(this).parent().parent().addClass("col-xs-4");

		$(this).parent().parent().parent().children(".cajasMetodoPago").html(

			 '<div class="col-xs-4">'+ 

			 	'<div class="input-group">'+ 

			 		'<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+ 

			 		'<input type="text" class="form-control" id="nuevoValorEfectivo" style="height:90px;font-size:25px;" placeholder="00000" required>'+

			 	'</div>'+

			 '</div>'+

			 '<div class="col-xs-4" id="capturarCambioEfectivo"  style="padding-left:0px">'+

			 	'<div class="input-group">'+

			 		'<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+

			 		'<input type="text" class="form-control" id="nuevoCambioEfectivo" style="height:90px;font-size:25px;"  placeholder="00000" readonly required>'+

			 	'</div>'+

			 '</div>'

		 )

		// Agregar formato al precio

		$('#nuevoValorEfectivo').number( true, 2);
      	$('#nuevoCambioEfectivo').number( true, 2);
		$.ajax({
			
				url: "ajax/datatable-ventas.ajax.php",
				success:function(respuesta){
					
					console.log("respuesta", respuesta);
				}

		})

      	// Listar método en la entrada
      	listarMetodos()

	}else{

		$(this).parent().parent().removeClass('col-xs-4');

		$(this).parent().parent().addClass('col-xs-6');

		 $(this).parent().parent().parent().children('.cajasMetodoPago').html(

		 	'<div class="col-xs-6" style="padding-left:0px">'+
                        
                '<div class="input-group">'+
                     
                  '<input type="number" min="0" class="form-control" id="nuevoCodigoTransaccion" placeholder="Código transacción"  required>'+
                       
                  '<span class="input-group-addon"><i class="fa fa-lock"></i></span>'+
                  
                '</div>'+

              '</div>')

	}

	

})

/*=============================================
CAMBIO EN EFECTIVO
=============================================*/
$(".formularioVenta").on("change", "input#nuevoValorEfectivo", function(){

	var efectivo = $(this).val();

	var cambio =  Number(efectivo) - Number($('#nuevoTotalVenta').val());

	var nuevoCambioEfectivo = $(this).parent().parent().parent().children('#capturarCambioEfectivo').children().children('#nuevoCambioEfectivo');

	nuevoCambioEfectivo.val(cambio);

})

/*=============================================
CAMBIO TRANSACCIÓN
=============================================*/
$(".formularioVenta").on("change", "input#nuevoCodigoTransaccion", function(){

	// Listar método en la entrada
     listarMetodos()


})


/*=============================================
LISTAR TODOS LOS PRODUCTOS
=============================================*/

function listarProductos(){

	var listaProductos = [];

	var descripcion = $(".nuevaDescripcionProducto");

	var cantidad = $(".nuevaCantidadProducto");

	var precio = $(".nuevoPrecioProducto");

	var stockReal = $(".stockReal");



	for(var i = 0; i < descripcion.length; i++){

		listaProductos.push({ "id" : $(descripcion[i]).attr("idProducto"), 
							  "descripcion" : $(descripcion[i]).val(),
							  "cantidad" : $(cantidad[i]).val(),
							  "stock" : $(cantidad[i]).attr("nuevoStock"),
							  "precio" : $(precio[i]).attr("precioReal"),
								"total" : $(precio[i]).val()})
	}

					console.log('esta madre es la lista de productos');
					console.log(listaProductos);
					var encontre = listaProductos.find(pollo1);
					var encontre2 = listaProductos.find(pollo2);
					var encontre3 = listaProductos.find(pollo3);
					var encontre4 = listaProductos.find(pollo4);
					var encontre5 = listaProductos.find(pollo5);
					var encontre6 = listaProductos.find(pollo6);

					
					
					if(encontre5){
						var cantidadTacos = encontre5.cantidad
						var stockTacos = encontre5.stock;
						var stockATacos = stockReal.val();

						if(cantidadTacos > 1) {
							var	nuevoStockTacos = stockATacos - (8 * cantidadTacos)
							if(nuevoStockTacos <= 0){
								swal({
									title: "No hay stock Suficiente, baja la cantidad a vender!",
									type: "error",
									confirmButtonText: "¡Cerrar!"
								});
							}
							encontre5.stock = String(nuevoStockTacos)
						/* 	console.log(nuevoStockTacos); */
						}else{
							var nuevoStockTacos = stockTacos - 7
							if(nuevoStockTacos <= 0){
								swal({
									title: "No hay stock Suficiente, baja la cantidad a vender!",
									type: "error",
									confirmButtonText: "¡Cerrar!"
								});
							}
							encontre5.stock = String(nuevoStockTacos)
						/* 	console.log('entro en el else');
							console.log(nuevoStockTacos); */
						}

				/* 		console.log(cantidadTacos);
						console.log(stockTacos);
						console.log(stockATacos);
						console.log(listaProductos); */
					}

					if(encontre6){
						var cantidadPezcuezo = encontre6.cantidad
						var stockPezcuezo = encontre6.stock;
						var stockAPezcuezo = stockReal.val();

						if(cantidadPezcuezo > 1) {
							var	nuevoStockPezcuezo = stockAPezcuezo - (5 * cantidadPezcuezo)
							if(nuevoStockPezcuezo <= 0){
								swal({
									title: "No hay stock Suficiente, baja la cantidad a vender!",
									type: "error",
									confirmButtonText: "¡Cerrar!"
								});
							}
							encontre5.stock = String(nuevoStockPezcuezo)
							console.log(nuevoStockPezcuezo);
						}else{
							var nuevoStockPezcuezo = stockPezcuezo - 4
							if(nuevoStockPezcuezo <= 0){
								swal({
									title: "No hay stock Suficiente, baja la cantidad a vender!",
									type: "error",
									confirmButtonText: "¡Cerrar!"
								});
							}
							encontre6.stock = String(nuevoStockPezcuezo)
							console.log('entro en el else');
							console.log(nuevoStockPezcuezo);
						}

						console.log(cantidadTacos);
						console.log(stockTacos);
						console.log(stockATacos);
						console.log(listaProductos);
					}

		/* 			console.log('el primero');
					console.log(encontre)
					console.log(encontre2)
					console.log(encontre3)
					console.log(encontre4)
					console.log(encontre5) */



					if(encontre == undefined){
						encontre = 0;
					}
					if(encontre2 == undefined){
						encontre2 = 0;
					}
					if(encontre3 == undefined){
						encontre3 = 0;
					}
					if(encontre4 == undefined){
						encontre4 = 0;
					}

			/* 		console.log('el segundo');
					console.log(encontre4) */

					var cantPollo = Number(encontre.cantidad);
					var cantMedioP = Number(encontre2.cantidad);
					var cantPolloM = Number(encontre3.cantidad);
					var cantCuartoP = Number(encontre4.cantidad);
					
					var stockOriginal = stockReal.val()

					localStorage.setItem("stockOriginal", stockOriginal);
					var resultadoOriginal =	localStorage.getItem("stockOriginal");

					if( cantPollo > 1 || cantMedioP > 1 || cantPolloM > 1){
						var stock1 = resultadoOriginal - (1 * cantPollo);
						var stock2 = resultadoOriginal - (0.5 * cantMedioP);
						var stock3 = resultadoOriginal - (1.5 * cantPolloM);
						var stock4 = resultadoOriginal - (0.25 * cantCuartoP);
						if(stock1 <=0 || stock2<=0 || stock3<=0 || stock4<=0){
							swal({
								title: "No hay stock Suficiente, baja la cantidad a vender!",
								type: "error",
								confirmButtonText: "¡Cerrar!"
							});
						}
						storage.removeItem("stockOriginal");
					/* 	console.log('cantidades');					
						console.log(stock4)
						console.log(resultadoOriginal);
						console.log(cantPollo);
						console.log(Number(encontre.stock) + 0.5); */
					}else{
						var stock1 = Number(encontre.stock) + 0.5;
						var stock2 = Number(encontre2.stock);
						var stock3 = Number(encontre3.stock) - 0.5;
						var stock4 = Number(encontre4.stock) + 0.75;

					
					}


				/* 	console.log('el tercero');
					console.log(stock4) */


					var stockss= [];

					stockss.push({
						stock1,stock2,stock3,stock4
					}) 

				localStorage.setItem("stockPollo", JSON.stringify(stockss));
				var aver =	localStorage.getItem("stockPollo");

				var ReturnStock = (JSON.parse(aver)[0].stock1);
				var ReturnStock2 = (JSON.parse(aver)[0].stock2);
				var ReturnStock3 = (JSON.parse(aver)[0].stock3);
				var ReturnStock4 = (JSON.parse(aver)[0].stock4);


				
			/* 	console.log('el cuarto');
				console.log(ReturnStock4)
 */
		

				var stockActual = stockReal.val()

				if(ReturnStock2 != null && ReturnStock == null && ReturnStock3 == null && ReturnStock4 == null)
				{	
					var	stockFinal = ReturnStock2;
					if(stockFinal <= 0){
						swal({
							title: "No hay stock disponible o esta fue la pieza final, disminuya la cantidad.1",
							type: "error",
							confirmButtonText: "¡Cerrar!"
						});
					}
					encontre.stock = String(stockFinal)
					encontre2.stock = String(stockFinal)
					encontre3.stock = String(stockFinal)
				/* 	console.log('henlo');
					console.log(encontre2); */

				}
				else if(ReturnStock != null && ReturnStock2 == null && ReturnStock3 == null  && ReturnStock4 == null)
				{
					/* if(ReturnStock == 0 && stockActual != 0)
					{
						ReturnStock = 0.25
						var	stockFinal = ReturnStock + ReturnStock - stockActual;
						encontre.stock = String(stockFinal)
						encontre2.stock = String(stockFinal)
					} */
					var	stockFinal =  ReturnStock;
					if(stockFinal <= 0){
						swal({
							title: "No hay stock disponible o esta fue la pieza final, disminuya la cantidad.2",
							type: "error",
							confirmButtonText: "¡Cerrar!"
						});
					}
					encontre.stock = String(stockFinal)
					encontre2.stock = String(stockFinal)
					encontre3.stock = String(stockFinal)
				/* 	console.log('henlo1');
					console.log(encontre); */

				}else if(ReturnStock3 != null && ReturnStock == null && ReturnStock2 == null  && ReturnStock4 == null){

					var	stockFinal =  ReturnStock3;
					if(stockFinal <= 0){
						swal({
							title: "No hay stock disponible o esta fue la pieza final, disminuya la cantidad.3",
							type: "error",
							confirmButtonText: "¡Cerrar!"
						});
					}
					encontre.stock = String(stockFinal)
					encontre2.stock = String(stockFinal)
					encontre3.stock = String(stockFinal)

				/* 	console.log(encontre3); */
				}
				else if(ReturnStock4 != null && ReturnStock == null && ReturnStock2 == null  && ReturnStock3 == null){

					var	stockFinal =  ReturnStock4;
					if(stockFinal <= 0){
						swal({
							title: "No hay stock disponible o esta fue la pieza final, disminuya la cantidad.4",
							type: "error",
							confirmButtonText: "¡Cerrar!"
						});
					}
					encontre.stock = String(stockFinal)
					encontre2.stock = String(stockFinal)
					encontre3.stock = String(stockFinal)
					encontre4.stock = String(stockFinal)


					/* console.log(encontre4); */
				}
				else{
					var	stockFinal = ReturnStock + ReturnStock2 + ReturnStock3 + ReturnStock4 - stockActual;
				/* 	console.log('el gran final');
					console.log(ReturnStock);
					console.log(ReturnStock2);
					console.log(ReturnStock3);
					console.log(ReturnStock4);
					console.log(stockActual); */
					/* if(stockFinal <= 0 && stockActual > stockFinal){
						swal({
							title: "No hay stock disponible",
							type: "error",
							confirmButtonText: "¡Cerrar!"
						});
					} */

					encontre.stock = String(stockFinal)
					encontre2.stock = String(stockFinal)
					encontre3.stock = String(stockFinal)
					encontre4.stock = String(stockFinal)


				
				}

			/* 	console.log(listaProductos); */

	$("#listaProductos").val(JSON.stringify(listaProductos)); 

}

function pollo1(objeto) { 
		return objeto.id === '50';
}

function pollo2(objeto) {
	return objeto.id === '48';
}

function pollo3(objeto) {
	return objeto.id === '53';
}

function pollo4(objeto) {
	return objeto.id === '54';
}

function pollo5(objeto) {
	return objeto.id === '55';
}

function pollo6(objeto) {
	return objeto.id === '57';
}

/*=============================================
LISTAR MÉTODO DE PAGO
=============================================*/

function listarMetodos(){

	var listaMetodos = "";

	if($("#nuevoMetodoPago").val() == "Efectivo"){

		$("#listaMetodoPago").val("Efectivo");

	}else{
		
		$("#listaMetodoPago").val($("#nuevoMetodoPago").val()+"-"+$("#nuevoCodigoTransaccion").val());

	}

}

/*=============================================
BOTON EDITAR VENTA
=============================================*/
$(".tablas").on("click", ".btnEditarVenta", function(){

	var idVenta = $(this).attr("idVenta");

	window.location = "index.php?ruta=editar-venta&idVenta="+idVenta;


})

/*=============================================
FUNCIÓN PARA DESACTIVAR LOS BOTONES AGREGAR CUANDO EL PRODUCTO YA HABÍA SIDO SELECCIONADO EN LA CARPETA
=============================================*/

function quitarAgregarProducto(){

	//Capturamos todos los id de productos que fueron elegidos en la venta
	var idProductos = $(".quitarProducto");

	//Capturamos todos los botones de agregar que aparecen en la tabla
	var botonesTabla = $(".tablaVentas tbody button.agregarProducto");

	//Recorremos en un ciclo para obtener los diferentes idProductos que fueron agregados a la venta
	for(var i = 0; i < idProductos.length; i++){

		//Capturamos los Id de los productos agregados a la venta
		var boton = $(idProductos[i]).attr("idProducto");
		
		//Hacemos un recorrido por la tabla que aparece para desactivar los botones de agregar
		for(var j = 0; j < botonesTabla.length; j ++){

			if($(botonesTabla[j]).attr("idProducto") == boton){

				$(botonesTabla[j]).removeClass("btn-primary agregarProducto");
				$(botonesTabla[j]).addClass("btn-default");

			}
		}

	}
	
}
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
CADA VEZ QUE CARGUE LA TABLA CUANDO NAVEGAMOS EN ELLA EJECUTAR LA FUNCIÓN:
=============================================*/

$('.tablaVentas').on( 'draw.dt', function(){

	quitarAgregarProducto();

})


/*=============================================
BORRAR VENTA
=============================================*/
$(".tablas").on("click", ".btnEliminarVenta", function(){

  var idVenta = $(this).attr("idVenta");

  swal({
        title: '¿Está seguro de borrar la venta?',
        text: "¡Si no lo está puede cancelar la accíón!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, borrar venta!'
      }).then(function(result){
        if (result.value) {
          
            window.location = "index.php?ruta=ventas&idVenta="+idVenta;
        }

  })

})

/*=============================================
IMPRIMIR FACTURA
=============================================*/

$(".tablas").on("click", ".btnImprimirFactura", function(){

	var codigoVenta = $(this).attr("codigoVenta");

	window.open("extensiones/tcpdf/pdf/factura.php?codigo="+codigoVenta, "_blank");

})

/*=============================================
RANGO DE FECHAS
=============================================*/

$('#daterange-btn').daterangepicker(
  {
    ranges   : {
      'Hoy'       : [moment(), moment()],
      'Ayer'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Últimos 7 días' : [moment().subtract(6, 'days'), moment()],
      'Últimos 30 días': [moment().subtract(29, 'days'), moment()],
      'Este mes'  : [moment().startOf('month'), moment().endOf('month')],
      'Último mes'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    startDate: moment(),
    endDate  : moment()
  },
  function (start, end) {
    $('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));

    var fechaInicial = start.format('YYYY-MM-DD');

    var fechaFinal = end.format('YYYY-MM-DD');

    var capturarRango = $("#daterange-btn span").html();
   
   	localStorage.setItem("capturarRango", capturarRango);

   	window.location = "index.php?ruta=ventas&fechaInicial="+fechaInicial+"&fechaFinal="+fechaFinal;

  }

)

/*=============================================
CANCELAR RANGO DE FECHAS
=============================================*/

$(".daterangepicker.opensleft .range_inputs .cancelBtn").on("click", function(){

	localStorage.removeItem("capturarRango");
	localStorage.clear();
	window.location = "ventas";
})

/*=============================================
CAPTURAR HOY
=============================================*/

$(".daterangepicker.opensleft .ranges li").on("click", function(){

	var textoHoy = $(this).attr("data-range-key");

	if(textoHoy == "Hoy"){

		var d = new Date();
		
		var dia = d.getDate();
		var mes = d.getMonth()+1;
		var año = d.getFullYear();

		if(mes < 10){

			var fechaInicial = año+"-0"+mes+"-"+dia;
			var fechaFinal = año+"-0"+mes+"-"+dia;

		}else if(dia < 10){

			var fechaInicial = año+"-"+mes+"-0"+dia;
			var fechaFinal = año+"-"+mes+"-0"+dia;

		}else if(mes < 10 && dia < 10){

			var fechaInicial = año+"-0"+mes+"-0"+dia;
			var fechaFinal = año+"-0"+mes+"-0"+dia;

		}else{

			var fechaInicial = año+"-"+mes+"-"+dia;
	    	var fechaFinal = año+"-"+mes+"-"+dia;

		}	

    	localStorage.setItem("capturarRango", "Hoy");

    	window.location = "index.php?ruta=ventas&fechaInicial="+fechaInicial+"&fechaFinal="+fechaFinal;

	}

})




