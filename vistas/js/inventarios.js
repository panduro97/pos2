$(".borrar").on("click", "button.send", function(){

      swal({

		title: '¿Estas Seguro?',
		text: "Se borrara el stock y terminaran las ventas!",
		type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, Cerrar Caja.'
        }).then(function(result) {
        if (result.value) {
            var parametros = {
                "true" : true
            }
            $.ajax({

                url:"controladores/inventarios.controlador.php",
                 method: "POST",
                 data: parametros,
                 dataType:"json",
                 success:function(respuesta){
                   
                    alert(respuesta)
        
                 }
        
             }) 
             location.reload();

        }


	})
/* 	var variable1 = $(".descripcion");
	var variable2 = $(".dinero");

    var des = variable1.val()
    var din = variable2.val()
    var parametros = {
        "descripcion" : des,
        "dinero" : din
    }
    $.ajax({

        url:"controladores/gastos.controlador.php",
         method: "POST",
         data: parametros,
         dataType:"json",
         success:function(respuesta){
           
            alert(respuesta)

         }

     }) */

})

