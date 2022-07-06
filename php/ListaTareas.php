<?php
    include('./DataBase.php');

    $consulta = "SELECT * FROM tareas";
    $resultadoConsulta = mysqli_query($conexion, $consulta);

    if (!$resultadoConsulta) {
        die('Fallo la conexion para cargar la tabla.' . mysqli_error($conexion)); 
    }

    $json = array();
    while ( $row = mysqli_fetch_array($resultadoConsulta) ) {
        $json[] = array(
            'id' => $row['id'],
            'nombre' => $row['nombre'],
            'descripcion' => $row['descripcion'],
            'realizado' => $row['realizado']
        );
    }
    
    $jsonString = json_encode($json);
    echo $jsonString;
?>