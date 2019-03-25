<?php
$upload_max_size = ini_get('upload_max_filesize');
$nombre = $_REQUEST['nombre'];
$archivo = $_REQUEST['archivo'];
$ext = substr($_REQUEST['archivo'], -3);
echo "esta es la extension: ".$ext;
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
    echo "Successfully uploaded";
}
else
{
    echo "Not uploaded because of error #".$_FILES[$archivo]["error"];
}
print ($_FILES[$archivo]['name']);
