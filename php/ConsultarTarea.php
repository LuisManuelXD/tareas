<?php
    include('./DataBase.php');

    if( isset($_POST['id']) ) {
        $valorId = $_POST['id'];

        $consultarTarea = "SELECT *FROM tareas WHERE id='$valorId'";
        $resultadoConsultaTarea = mysqli_query($conexion, $consultarTarea);

        if ( !$resultadoConsultaTarea ) {
            die('Consulta fallida');
        }

        $json = array();
        while ( $row = mysqli_fetch_array($resultadoConsultaTarea) ) {
            $json[] = array(
                'id' => $row['id'],
                'descripcion' => $row['descripcion'],
                'nombre' => $row['nombre'],
                'realizado' => $row['realizado']
            );
        }

        $jsonString = json_encode($json);
        echo $jsonString;
    }
?>