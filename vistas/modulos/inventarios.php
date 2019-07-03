<div class="content-wrapper">

  <section class="content-header">
    
    <h1>
      
Inventarios    
    </h1>

    <ol class="breadcrumb">
      
      <li><a href="inicio"><i class="fa fa-dashboard"></i> Inicio</a></li>
      
      <li class="active">Administrar Gastos</li>
    
    </ol>

  </section>

  <section class="content">

    <div class="box">

      <div class="box-header with-border borrar">
  
        <button class="btn btn-danger  send" data-toggle="modal">
          
          Corte de Caja

        </button>

      </div>


      <ul class="list-group list-group-horizontal-sm">

      <?php 
           $conn = mysqli_connect('bigdeli.mx', 'atomstud_sergio', 'bigdeli123', 'atomstud_pos');
           if (!$conn) {
               die("Connection failed: " . mysqli_connect_error());
           }
           $consulta = "SELECT * FROM productos INNER JOIN stock WHERE productos.conexion = stock.relacion ";
           $datos = $conn->query($consulta);
           $var = 0;
           while ($row=mysqli_fetch_array($datos)){
             $ventas = $row['ventas'];
             $precio = $row['precio_venta'];
             $resultado = $ventas * $precio;
             $var += $resultado;
           }

          echo "<li class='list-group-item'>";
          echo "<h4>SubTotal: $" . $var."<h4>";
          echo "</li>";

		      $fecha = date("Y-m-d");
          $consulta2 = "SELECT * FROM gastos WHERE fecha = '$fecha' ";
          $datos2 = $conn->query($consulta2);
           $contador = 0;
          while ($row2=mysqli_fetch_array($datos2)){
            $contador += $row2['dinero'];
          }

          echo "<li class='list-group-item'>";
          echo "<h4>Total gastos: $" . $contador."<h4>";
          echo "</li>";
        
          $totalTotal = $var - $contador;

          echo "<li class='list-group-item'>";
          echo "<h4>Total: $" . $totalTotal."<h4>";
          echo "</li>";
          

 
 ?>
  </ul>

      <div class="box-body">
        
       <table class="table table-bordered table-striped dt-responsive tablas">
         
        <thead>
         
         <tr>

         
           <th>id</th>
           <th>Descripción</th>
           <th>Precio</th>
           <th>Inventario Inicial</th>
           <th>Inventario Final</th>
           <th>Ventas Dia</th>
           <th>Ingresos Producto</th>


         </tr> 

        </thead>

        <tbody>
   
       <?php


          $conn = mysqli_connect('bigdeli.mx', 'atomstud_sergio', 'bigdeli123', 'atomstud_pos');
          if (!$conn) {
              die("Connection failed: " . mysqli_connect_error());
          }
          $consulta = "SELECT * FROM productos INNER JOIN stock WHERE productos.conexion = stock.relacion ";
          $datos = $conn->query($consulta);
          $var = 0;
          while ($row=mysqli_fetch_array($datos)){
            $ventas = $row['ventas'];
            $precio = $row['precio_venta'];
            $resultado = $ventas * $precio;
            $var += $resultado;
            echo " <tr>";
            echo "<td>".$row['id']."</td>"; 
            echo "<td style='width:15vw;'>".$row['descripcion']."</td>";
            echo "<td>".$row['precio_venta']."</td>";
            echo "<td>".$row['stockInicio']."</td>";
            echo "<td>".$row['stock']."</td>";
            echo "<td>".$row['ventas']."</td>";
            echo "<td>" .$resultado. "</td>";
            echo "</tr>";
          }


            ?>
           
            
            
              
                  
                <!-- <button class="btn btn-warning"><i class="fa fa-pencil"></i></button> -->

                

             

            

          

        </tbody>

       </table>

      </div>

    </div>

  </section>

</div>



<!--=====================================
MODAL AGREGAR PRODUCTO
======================================-->

<div id="modalAgregarProducto" class="modal fade" role="dialog">
  
  <div class="modal-dialog">

    <div class="modal-content">

      <form role="form" method="post"  enctype="multipart/form-data">

        <!--=====================================
        CABEZA DEL MODAL action=".."
        ======================================-->

        <div class="modal-header" style="background:#3c8dbc; color:white">

          <button type="button" class="close" data-dismiss="modal">&times;</button>

          <h4 class="modal-title">Agregar gasto</h4>

        </div>

        <!--=====================================
        CUERPO DEL MODAL
        ======================================-->

        <div class="modal-body">

          <div class="box-body">

            <!-- ENTRADA PARA EL CÓDIGO -->
            
            <div class="form-group">
              
              <div class="input-group">
              
                <span class="input-group-addon"><i class="fa fa-pencil"></i></span> 

                <input type="text" class="form-control input-lg descripcion" name="descripcion" placeholder="Ingresar descripcion gasto" required>

              </div>

            </div>

             <!-- ENTRADA PARA STOCK -->

             <div class="form-group">
              
              <div class="input-group">
              
                <span class="input-group-addon"><i class="fa fa-dollar"></i></span> 

                <input type="text" class="form-control input-lg dinero" name="dinero" placeholder="Cantidad" required>

                </div>
            </div>
        <br>
    </div>
</div>

        <!--=====================================
        PIE DEL MODAL
        ======================================-->

        <div class="modal-footer">

          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Salir</button>

          <button type="submit" class="btn btn-primary enviar">Guardar producto</button>

        </div>

      </form>

    </div>

  </div>

</div>


