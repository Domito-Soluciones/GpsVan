<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/TransportistaDao.php';

header('Content-Type: application/json');
$busqueda = $_REQUEST['busqueda'];
$transportistaDao = new TransportistaDao();
$transportistas = $transportistaDao->getTransportistas($busqueda);
echo "[";
for ($i = 0 ; $i < count($transportistas); $i++)
{
    $transportista = $transportistas[$i];
    $transportistaId = $transportista->getId();
    $razon = $transportista->getRazon();
    $rut = $transportista->getRut();
    $direccion = $transportista->getDireccion();
    $nombre = $transportista->getNombreContacto();
    $telefono = $transportista->getFonoContacto();
    $mail = $transportista->getMailContacto();
    $mail2 = $transportista->getMailFacturacion();
    echo "{\"transportista_id\":\"".$transportistaId."\","
        . "\"transportista_razon\":\"".$razon."\","
        . "\"transportista_rut\":\"".$rut."\","
        . "\"transportista_direccion\":\"".$direccion."\","
        . "\"transportista_nombre_contacto\":\"".$nombre."\","
        . "\"transportista_fono_contacto\":\"".$telefono."\","
        . "\"transportista_mail_contacto\":\"".$mail."\","
        . "\"transportista_mail_facturacion\":\"".$mail2."\""
        . "}";
    if (($i+1) != count($transportistas))
    {
        echo ",";
    }
}
echo "]";