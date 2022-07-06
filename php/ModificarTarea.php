<?php
    include('./DataBase.php');

    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];

    $consultarModificar = "UPDATE tareas SET nombre='$nombre', descripcion='$descripcion' WHERE id='$id'";
    $resultadoConsultaModificar = mysqli_query($conexion, $consultarModificar);

    if ( !$resultadoConsultaModificar ) {
        die('Fallo la modificacion.');
    }

    echo 'Se actualizo correctamente';
?>