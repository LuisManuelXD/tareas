<?php
    include('./DataBase.php');

    if ( isset($_POST['nombre']) ) {
        $nombre = $_POST['nombre'];
        $descripcion = $_POST['descripcion'];
        $realizado = $_POST['realizado'];

        $consultaAgregar = "INSERT INTO tareas (nombre, descripcion, realizado) VALUES ('$nombre', '$descripcion', '$realizado')";
        $guardarAgregar = mysqli_query($conexion, $consultaAgregar);

        if (!$guardarAgregar) {
            die('La consulta a fallado');
        }
        echo 'Tarea agregada con exito';
    }
?>