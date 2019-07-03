<div class="content-wrapper">

  <section class="content-header">
    
    <h1>
      
      Administrar Gastos
    
    </h1>

    <ol class="breadcrumb">
      
      <li><a href="inicio"><i class="fa fa-dashboard"></i> Inicio</a></li>
      
      <li class="active">Administrar Gastos</li>
    
    </ol>

  </section>

  <section class="content">

    <div class="box">

      <div class="box-header with-border">
  
        <button class="btn btn-primary" data-toggle="modal" data-target="#modalAgregarProducto">
          
          Agregar gasto

        </button>

      </div>

      <div class="box-body">
        
       <table class="table table-bordered table-striped dt-responsive tablas">
         
        <thead>
         
         <tr>
           
           <th style="width:10px">#</th>
           <th>Código</th>
           <th>Descripción</th>
           <th>Inversión</th>
           <th>Fecha</th>

         </tr> 

        </thead>

        <tbody>
   
       <?php
          $conn = mysqli_connect('bigdeli.mx', 'atomstud_sergio', 'bigdeli123', 'atomstud_pos');
          if (!$conn) {
              die("Connection failed: " . mysqli_connect_error());
          }
          $consulta = "SELECT * FROM gastos";
          $datos = $conn->query($consulta);
          $var=0;
          while ($row=mysqli_fetch_array($datos)){
            echo " <tr>";
            echo "<td>".$row['id']."</td>"; 
            echo "<input type='hidden' class='id' cont='".$var."' value=".$row['id'].">";
            echo "<td>000".$row['id']."</td>";
            echo "<td>".$row['descripcion']."</td>";
            echo "<td>".$row['dinero']."</td>";
            echo "<td>".$row['fecha']."</td>";
            echo "<td>";
            echo "<div class='btn-group'>";
            echo "<button class='btn btn-danger ' onClick='borrar(".$row['id'].")'><i class='fa fa-times borrar'></i></button>";
            echo "</div>";
            echo "</td>";
            echo "</tr>";
            $var++;
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

          <button type="submit" class="btn btn-primary enviar">Guardar Gasto</button>

        </div>

      </form>

    </div>

  </div>

</div>


