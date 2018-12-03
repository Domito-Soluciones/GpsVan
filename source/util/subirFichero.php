<?php
$archivo = $_REQUEST['archivo'];
$ext = split ("\.", $$archivo)[1];
if($ext != 'pdf' || $ext != 'png' || $ext != 'jpg')
{
    echo 'ERROR';
    exit;
}
$tipo = $_REQUEST['tipo'];
$dir_subida = 'img/';
$archivo = 'foto';
if($tipo == 'pdf')
{
    $archivo = 'contrato';
    $dir_subida = 'pdf/';
}

$fichero_subido = $dir_subida . basename($_FILES[$archivo]['name']);

if (move_uploaded_file($_FILES[$archivo]['tmp_name'], $fichero_subido)) {
    
} 
print_r($_FILES);
print ($_FILES[$archivo]['name']);
