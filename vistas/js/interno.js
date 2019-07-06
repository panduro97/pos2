$("#modalAgregarInterno").on("click", "button.enviarInterno", function(){

	var variable1 = $(".internoDescripcion");
    var variable2 = $(".internoStock");
	var variable3 = $(".precioInterno");
    

    var des = variable1.val()
    var din = variable2.val()
    var sto = variable3.val()

    var parametros = {
        "descripcion" : des,
        "costo" : din,
        "stock" : sto
    }

    $.ajax({

        url:"controladores/internos.controlador.php",
         method: "POST",
         data: parametros,
         dataType:"json",
         success:function(respuesta){
           
            alert(respuesta)

         }

     }) 

})


function borrar(id) {
    var parametro = {
        id : id
    }
    swal({

		title: '¿Estas Seguro?',
		text: "Se borrara el stock y terminaran las ventas!",
		type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, Borrar.'
        }).then(function(result) {
        if (result.value) {
            var parametros = {
                "true" : true
            }
            $.ajax({

                url:"controladores/borrarInternos.controlador.php",
                 method: "POST",
                 data: parametro,
                 dataType:"json",
                 success:function(respuesta){
                   
                    alert(respuesta)
        
                 }
        
             })
        
             location.reload();

        }


	})

}

function traer() {

    var variable1 = $(".editDescripcion");
    var variable2 = $(".editStock");
    var variable3 = $(".editCosto");
    var variable4 = $("#inputState");

    var descripcion = variable1.val()
    var stock = variable2.val()
    var costo = variable3.val()
    var id = variable4.val()
    
    var parametro = {
        id,
        descripcion,
        stock,
        costo
    }
    $.ajax({

        url:"controladores/editarInterno.controlador.php",
         method: "POST",
         data: parametro,
         dataType:"json",
         success:function(respuesta){
           var datos = respuesta.costo;

            alert(JSON.stringify(datos)) 
            
            

         }

     })
     
 /*    $.ajax({

        url:"controladores/editarInterno.controlador.php",
         dataType:"json",
         success:function(respuesta){
           
            alert(JSON.stringify( respuesta))

         }

     }) */

   
}
