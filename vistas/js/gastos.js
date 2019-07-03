$("#modalAgregarProducto").on("click", "button.enviar", function(){

	var variable1 = $(".descripcion");
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

     })

})

function borrar(id) {
    console.log(id)
    var parametro = {
        id : id
    }

    $.ajax({

        url:"controladores/borrarGastos.controlador.php",
         method: "POST",
         data: parametro,
         dataType:"json",
         success:function(respuesta){
           
            alert(respuesta)

         }

     })

     location.reload();

}
/* $(".tablas").on("click", "button.borrar", function(){

    var variable = $('.id').attr('value')
    
    console.log(variable)



}) */