<?php
include '../../util/validarPeticion.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$conductor = filter_input(INPUT_POST, 'id');
$error = filter_input(INPUT_POST, 'error');
$clase = filter_input(INPUT_POST, 'clase');
$linea = filter_input(INPUT_POST, 'linea');
Log::write_app_log("ERROR_APP: ID CONDUCTOR: "+$id+", ERROR: ".$error.", CLASE: ".$clase.", LINEA: ".$linea);
echo "{}";