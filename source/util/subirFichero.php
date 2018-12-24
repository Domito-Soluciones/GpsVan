<?php
$nombre = $_REQUEST['nombre'];
$archivo = $_REQUEST['archivo'];
$ext = explode(".", $archivo)[1];
if($ext != 'pdf')
{
    if($ext != 'png')
    {
        if($ext != 'jpg')
        {
            echo 'ERROR';
            exit;
        }
    }
}
$tipo = $_REQUEST['tipo'];
$dir_subida = 'img/'.$nombre.'_';
$archivo = 'foto';
if($tipo == 'pdf')
{
    $archivo = 'contrato';
    $dir_subida = 'pdf/'.$nombre.'_';
}

$fichero_subido = $dir_subida . basename($_FILES[$archivo]['name']);

if (move_uploaded_file($_FILES[$archivo]['tmp_name'], $fichero_subido)) {
    
} 
print ($_FILES[$archivo]['name']);
