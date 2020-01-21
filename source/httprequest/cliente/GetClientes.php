<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ClienteDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$busqueda = filter_input(INPUT_POST, 'busqueda');
$buscaCC = filter_input(INPUT_POST, 'buscaCC');
$clienteDao = new ClienteDao();
$clientes = $clienteDao->getClientes($busqueda);
echo "[";
for ($i = 0 ; $i < count($clientes); $i++)
{
    $clienteId = $clientes[$i]->getId();
    $clienteRazon = trim($clientes[$i]->getRazon());
    $clientetipo = $clientes[$i]->getTipo();
    $clienteRut = $clientes[$i]->getRut();
    $clienteDireccion = $clientes[$i]->getDireccion();
    $clienteGrupo = $clientes[$i]->getGrupo();
    $clienteColor = $clientes[$i]->getColor(); 
    $clienteNombreContacto = $clientes[$i]->getNombreContacto();
    $clienteFonoContacto = $clientes[$i]->getFonoContacto();
    $clienteMailContacto = $clientes[$i]->getMailContacto();
    $clienteMailFacturacion = $clientes[$i]->getMailFacturacion();
    $clienteContrato = $clientes[$i]->getContrato();
    
    echo "{\"cliente_id\":\"".$clienteId."\","
        . "\"cliente_razon\":\"".$clienteRazon."\","
        . "\"cliente_tipo\":\"".$clientetipo."\","
        . "\"cliente_rut\":\"".$clienteRut."\","
        . "\"cliente_direccion\":\"".$clienteDireccion."\","
        . "\"cliente_grupo\":\"".$clienteGrupo."\","
        . "\"cliente_color\":\"".$clienteColor."\","
        . "\"cliente_nombre_contacto\":\"".$clienteNombreContacto."\","
        . "\"cliente_fono_contacto\":\"".$clienteFonoContacto."\","
        . "\"cliente_mail_contacto\":\"".$clienteMailContacto."\","
        . "\"cliente_mail_facturacion\":\"".$clienteMailFacturacion."\","
        . "\"cliente_contrato\":\"".$clienteContrato."\"";
//        . "\"cliente_centro_costo\": {";
//        if($buscaCC == '1')
//        {
//            $centrosCosto = $clienteDao->getCentrosCosto($clienteRazon);
//            for($j = 0; $j < count($centrosCosto) ; $j++)
//            {
//                echo "\"centro_costo_".$j."\":\"".$centrosCosto[$j]."\"";
//                if (($j+1) != count($centrosCosto))
//                {
//                    echo ",";
//                }
//            }
//        }
            echo "}";
//        echo "}";
    if (($i+1) != count($clientes))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETCLIENTES", 0);