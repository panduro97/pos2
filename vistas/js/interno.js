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
    console.log(id)
    var parametro = {
        id : id
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

function traer(id) {
    var parametro = {
        id : id
    }
    $.ajax({

        url:"controladores/editarInterno.controlador.php",
         method: "POST",
         data: parametro,
         dataType:"json",
         success:function(respuesta){
           /* var datos = respuesta.costo;

            alert(JSON.stringify(datos)) */
            
            

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
