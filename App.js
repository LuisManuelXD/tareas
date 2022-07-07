$(function () {
    let editar = false;

    obtenerTareas();

    // Insertar o agregar una nueva tarea
    $('#formularioTareas').submit(function(e) {
        let nombre = $('#txtNombre').val();
        let descripcion = $('#txtDescripcion').val();

        if ( nombre == '' || descripcion == '' ) {
            alert('Rellene los campos faltantes.');
            e.preventDefault();
        } else {
            const postDatos = {
                id: $('#tareaId').val(),
                nombre: $('#txtNombre').val(),
                descripcion: $('#txtDescripcion').val(),
                realizado: 0
            };
            
            let url = editar === false ? './php/AgregarTareas.php' : './php/ModificarTarea.php';
            console.log(url);
            
            $.post(url, postDatos, function (respuesta) {
                console.log(respuesta);
                obtenerTareas();
                $('#formularioTareas').trigger('reset');
            });

            e.preventDefault();
        }

    });

    function obtenerTareas() {
        $.ajax({
            url: './php/ListaTareas.php',
            type: 'GET',
            success: function (respuesta) {
                // console.log(respuesta);
                let tareas = JSON.parse(respuesta);
                let plantillaFaltantes = '';
                let plantillaRealizados = '';
    
                tareas.forEach(tareas => {
                    if (tareas.realizado == 0) {
                        plantillaFaltantes += `
                            <tr id="${tareas.id}">
                                <td>${tareas.id}</td>
                                <td><a class="tareaNombre text-decoration-none">${tareas.nombre}</a></td>
                                <td>${tareas.descripcion}</td>
                                <td>
                                    <button id="btnTerminado" class="btnTerminado btn btn-outline-success" title="Presiona este botón para marcar la tarea como realizada."><img src="./img/listo.png" alt="editar.png" width="26"></button>
                                </td>
                                <td>
                                    <button id="btnEditar" class="btnModificarTarea btn btn-outline-warning" title="Presiona este botón para comenzar a modificar esta tarea."><img src="./img/editar.png" alt="editar.png" width="26"></button>
                                    <button id="btnBorrar" class="eliminarTarea btn btn-outline-danger" title="Presiona este botón para eliminar esta tarea."><img src="./img/eliminar.png" alt="eliminar.png" width="26"></button>
                                </td>
                            </tr>
                        `
                    } else if (tareas.realizado == 1) {
                        plantillaRealizados += `
                            <tr id="${tareas.id}">
                                <td>${tareas.id}</td>
                                <td>${tareas.nombre}</td>
                                <td>${tareas.descripcion}</td>
                                <td>Finalizado</td>
                                <td>
                                    <button id="btnRegresar" class="btnRegresarTarea btn btn-outline-info" title="Presiona este botón para regresar la tarea a pendiente."><img src="./img/regresar.png" alt="regresar.png" width="26"></button>
                                    <button id="btnBorrar" class="eliminarTarea btn btn-outline-danger" title="Presiona este botón para eliminar esta tarea."><img src="./img/eliminar.png" alt="eliminar.png" width="26"></button>
                                </td>
                            </tr>
                        `
                    }
                });
    
                $('#tareasFaltantes').html(plantillaFaltantes);
                $('#tareasFinalizadas').html(plantillaRealizados);
            }
        });
    }

    // Eliminar
    $(document).on('click', '.eliminarTarea', function () {
        if ( confirm('¿Estas seguro de elimnar la tarea?') ) {
            let elemento = $(this)[0].parentElement.parentElement;
            let id = $(elemento).attr('id');
            // console.log(id);

            $.post('./php/EliminarTarea.php', {id}, function (respuesta) {
                obtenerTareas();
                console.log(respuesta);
            });
        }
    });

    // Modificar
    $(document).on('click', '.tareaNombre', function() {
        let elemento = $(this)[0].parentElement.parentElement;
        let id = $(elemento).attr('id');
        // console.log(id);

        $.post('./php/ConsultarTarea.php', {id}, function (respuesta) {
            // console.log(respuesta);
            const tareas = JSON.parse(respuesta);

            tareas.forEach(tareas => {
                $('#tareaId').val(tareas.id);
                $('#txtNombre').val(tareas.nombre);
                $('#txtDescripcion').val(tareas.descripcion);

                editar = true;
            });
        });
    });

    $(document).on('click', '.btnModificarTarea', function() {
        let elemento = $(this)[0].parentElement.parentElement;
        let id = $(elemento).attr('id');
        // console.log(id);

        $.post('./php/ConsultarTarea.php', {id}, function (respuesta) {
            // console.log(respuesta);
            const tareas = JSON.parse(respuesta);

            tareas.forEach(tareas => {
                $('#tareaId').val(tareas.id);
                $('#txtNombre').val(tareas.nombre);
                $('#txtDescripcion').val(tareas.descripcion);

                editar = true;
            });
        });
    });

    $(document).on('click', '.btnTerminado', function() {
        if ( confirm('¿Estás seguro de colocar por finalizado esta tarea?') ) {
            let elemento = $(this)[0].parentElement.parentElement;
            let id = $(elemento).attr('id');
            // console.log(id);
    
            $.post('./php/RealizadoTarea.php', {id}, function (respuesta) {
                obtenerTareas();
                console.log(respuesta);
            });
        }
    });

    // Regresar tarea
    $(document).on('click', '.btnRegresarTarea', function () {
        let elemento = $(this)[0].parentElement.parentElement;
        let id = $(elemento).attr('id');

        $.post('./php/RegresarTarea.php', {id}, function (respuesta) {
            obtenerTareas();
            console.log(respuesta);
        });
    });
});