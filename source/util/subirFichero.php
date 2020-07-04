<?php
ini_set('display_errors',1);
error_reporting(E_ALL);
$upload_max_size = ini_get('upload_max_filesize');
$nombre = $_REQUEST['nombre'];
$archivo = $_REQUEST['archivo'];
$ext = substr($_REQUEST['archivo'], -3);

if($ext != 'pdf')
{
    if($ext != 'png')
    {
        if($ext != 'jpg')
        {
            if($ext != 'lsx'){
                echo 'ERROR';
                exit;
            }
        }
    }
}
$tipo = $_REQUEST['tipo'];
if($tipo == 'pdf')
{
    $archivo = 'contrato';
    $dir_subida = 'pdf/'.$nombre.'_';
}
else if($tipo == 'excel')
{
    $archivo = 'excel';
    $dir_subida = 'excel/'.$nombre.'_';
}
else{
    $archivo = 'foto';
    $dir_subida = 'img/'.$nombre.'_';
}

$fichero_subido = $dir_subida . basename($_FILES[$archivo]['name']);

if (move_uploaded_file($_FILES[$archivo]['tmp_name'], $fichero_subido)) {
    echo "Successfully uploaded";
}
else
{
    echo "Not uploaded because of error #".$_FILES[$archivo]["error"];
}
