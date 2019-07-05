<div class="content-wrapper">

  <section class="content-header">
    
    <h1>
      
      Administrar productos
    
    </h1>

    <ol class="breadcrumb">
      
      <li><a href="inicio"><i class="fa fa-dashboard"></i> Inicio</a></li>
      
      <li class="active">Administrar productos</li>
    
    </ol>

  </section>

  <section class="content">

    <div class="box">

      <div class="box-header with-border">
  
        <button class="btn btn-primary" data-toggle="modal" data-target="#modalAgregarInterno">
          
          Agregar producto

        </button>

        <?php 
                       $conn = mysqli_connect('bigdeli.mx', 'atomstud_sergio', 'bigdeli123', 'atomstud_pos');
                       if (!$conn) {
                           die("Connection failed: " . mysqli_connect_error());
                       }
                       $consulta = "SELECT * FROM interno";
                       $datos = $conn->query($consulta);
                       $resultado=0;
                       while ($row=mysqli_fetch_array($datos)){
                        $inversion = $row['stock'] * $row['costo'];
                        $resultado += $inversion;
                       }
                       echo "<h2>Total Inventario: $".$resultado." </h2>"


              ?>


      </div>

      <div class="box-body">
        
       <table class="table table-bordered table-striped dt-responsive tablas">
         
        <thead>
         
         <tr>
           
           <th>#</th>
           <th>Descripción</th>
           <th>Costo</th>  
           <th>Stock</th>         
           <th>Invertido</th>

         </tr> 

        </thead>

        <tbody id="tablaInterno">
          
         
              <?php 
                       $conn = mysqli_connect('bigdeli.mx', 'atomstud_sergio', 'bigdeli123', 'atomstud_pos');
                       if (!$conn) {
                           die("Connection failed: " . mysqli_connect_error());
                       }
                       $consulta = "SELECT * FROM interno";
                       $datos = $conn->query($consulta);
                       $resultado=0;
                       while ($row=mysqli_fetch_array($datos)){
                        $inversion = $row['stock'] * $row['costo'];
                        echo " <tr>";
                       echo "<td>".$row['id']."</td>";
                       echo "<td>".$row['descripcion']."</td>";
                       echo "<td>".$row['costo']."</td>";
                       echo "<td>".$row['stock']."</td>";
                       echo "<td>".$inversion."</td>";
                       echo "<td>";
                       echo "<div class='btn-group'>";
                       echo " <button class='btn btn-warning' data-toggle='modal'  data-target='#modalAgregarProductos'><i class='fa fa-pencil'></i></button>";
                       echo "<button class='btn btn-danger borrarInterno' onClick='borrar(".$row['id'].")'><i class='fa fa-times'></i></button>";
                       echo "</div>";
                       echo "</td>";
                       }
              ?>
           



           

          </tr>

        </tbody>

       </table>

      </div>

    </div>

  </section>

</div>

<!--=====================================
MODAL AGREGAR PRODUCTO
======================================-->

<div id="modalAgregarProductos" class="modal fade" role="dialog">
  
<div class="modal-dialog">

<div class="modal-content">

  <form role="form" method="post" enctype="multipart/form-data">

    <!--=====================================
    CABEZA DEL MODAL
    ======================================-->

    <div class="modal-header" style="background:#3c8dbc; color:white">

      <button type="button" class="close" data-dismiss="modal">&times;</button>

      <h4 class="modal-title">Editar producto</h4>

    </div>

    <!--=====================================
    CUERPO DEL MODAL
    ======================================-->

    <div class="modal-body">

      <div class="box-body">

         <div class="form-group">
          
          <div class="input-group">
          
            <span class="input-group-addon"><i class="fa fa-product-hunt"></i></span> 

            <input type="text" class="form-control input-lg editDescripcion" name="nuevaDescripcion" placeholder="Ingresar descripción" >

          </div>

        </div>

         <div class="form-group">
          
          <div class="input-group">
          
            <span class="input-group-addon"><i class="fa fa-check"></i></span> 

            <input type="number" class="form-control input-lg editStock" name="nuevoStock" min="0" placeholder="Stock" >

          </div>

        </div>

         <div class="form-group row">

            <div class="col-xs-6">
            
              <div class="input-group">
              
                <span class="input-group-addon"><i class="fa fa-arrow-up"></i></span> 

                <input type="number" class="form-control input-lg editCosto" name="nuevoPrecioCompra" min="0" placeholder="Precio de compra" >
                <?php 
                       
                       $conn = mysqli_connect('bigdeli.mx', 'atomstud_sergio', 'bigdeli123', 'atomstud_pos');
                       if (!$conn) {
                           die("Connection failed: " . mysqli_connect_error());
                       }
                       $consulta = "SELECT id FROM interno";
                       $datos = $conn->query($consulta);
                       $resultado=0;
                       while ($row=mysqli_fetch_array($datos)){
                        echo "<input type='hidden' class='editId' value='".$row['id']."'>";
                        

                        }
                        ?>
              </div>
            </div>

            </div>

        </div>

    </div>

    <div class="modal-footer">

      <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Salir</button>
      <button type='submit' class='btn btn-primary editInterno' onClick='traer()'>Editar producto</button>

    </div>

  </form>

</div>

</div>

</div>

<!--=====================================
MODAL AGREGAR PRODUCTO
======================================-->

<div id="modalAgregarInterno" class="modal fade" role="dialog">
  
  <div class="modal-dialog">

    <div class="modal-content">

      <form role="form" method="post" enctype="multipart/form-data">

        <!--=====================================
        CABEZA DEL MODAL
        ======================================-->

        <div class="modal-header" style="background:#3c8dbc; color:white">

          <button type="button" class="close" data-dismiss="modal">&times;</button>

          <h4 class="modal-title">Agregar producto</h4>

        </div>

        <!--=====================================
        CUERPO DEL MODAL
        ======================================-->

        <div class="modal-body">

          <div class="box-body">

   
            <!-- ENTRADA PARA LA DESCRIPCIÓN -->

             <div class="form-group">
              
              <div class="input-group">
              
                <span class="input-group-addon"><i class="fa fa-product-hunt"></i></span> 

                <input type="text" class="form-control input-lg internoDescripcion" name="nuevaDescripcion" placeholder="Ingresar descripción" required>

              </div>

            </div>

             <!-- ENTRADA PARA STOCK -->

             <div class="form-group">
              
              <div class="input-group">
              
                <span class="input-group-addon"><i class="fa fa-check"></i></span> 

                <input type="number" class="form-control input-lg internoStock" name="nuevoStock" min="0" placeholder="Stock" required>

              </div>

            </div>

             <!-- ENTRADA PARA PRECIO COMPRA -->

             <div class="form-group row">

                <div class="col-xs-6">
                
                  <div class="input-group">
                  
                    <span class="input-group-addon"><i class="fa fa-arrow-up"></i></span> 

                    <input type="number" class="form-control input-lg precioInterno" name="nuevoPrecioCompra" min="0" placeholder="Precio de compra" required>

                  </div>

                </div>

                </div>

            </div>

        </div>

        <!--=====================================
        PIE DEL MODAL
        ======================================-->

        <div class="modal-footer">

          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Salir</button>

          <button type="submit" class="btn btn-primary enviarInterno">Guardar producto</button>

        </div>

      </form>

    </div>

  </div>

</div>


