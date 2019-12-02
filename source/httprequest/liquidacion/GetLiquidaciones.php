<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/LiquidacionDao.php';
include '../../dominio//Liquidacion.php';
include '../../log/Log.php';

set_time_limit(0);
$convenio = 0;
$descuento = 1;
$rendicion = 2;
$liquidacionDao = new LiquidacionDao();
$conductores = $liquidacionDao->getConductores();
$mes = date('m');
$anio = date('y');
//$mes = 12;
//$anio = 2019;
$porcentajes = $liquidacionDao->getPorcentajes();   
$porcentajeAfp = $porcentajes[1];
$porcentajeIsapre = $porcentajes[2];
$porcentajeMutual = $porcentajes[3];

for($i = 0 ; $i < count($conductores); $i++){
    $conductor = $conductores[$i];
    $servicios = $liquidacionDao->getServiciosConvenio($conductor->getId(), $mes, $anio);
    $descuentos = $liquidacionDao->getDescuentosConductor($conductor->getId());
    $rendiciones = $liquidacionDao->getRendiciones($conductor->getId(),$mes,$anio);

    $totalBruto = 0;
    $participacion = 80;
    $produccionLiquida = 0;
    $totalDescuentos = 0;
    $totalRendiciones = 0;
    $liquidoPagar = 0;
    
    if(count($servicios) == 0){
        echo "CONDUCTOR ".$conductor->getId()." NO TIENE SERVICIOS REALIZADOS POR LO TANTO NO HABRA LIQUIDACION<br>";
        continue;
    }
    
    for ($j = 0 ; $j < count($servicios); $j++)
    {
        $servicio = explode("%", $servicios[$j]);
        $item = $servicio[0];
        $valor = $servicio[1];
        $liquidacionDao->insertarDetalleLiquidacion($item,$valor,$convenio,$conductor->getId(),$mes,$anio);
        $totalBruto += $valor;
        
    }
    
    $produccionLiquida = round($totalBruto * ($participacion / 100));
    $afp = $totalBruto * trim($porcentajeAfp) / 100;
    $isapre = $totalBruto * trim($porcentajeIsapre) / 100;
    $mutual = $totalBruto * trim($porcentajeMutual) / 100;
    $prevision = round($afp) + round($isapre) + round($mutual);
    $liquidacionDao->insertarDetalleLiquidacion('Pagos Previsionales',$prevision , $descuento,$conductor->getId(),$mes,$anio);
    $liquidacionDao->insertarDetalleLiquidacion('Seguro Obligatorio', $descuentos[0], $descuento,$conductor->getId(),$mes,$anio);
    $liquidacionDao->insertarDetalleLiquidacion('Seguro RC+DM', $descuentos[1], $descuento,$conductor->getId(),$mes,$anio);
    $liquidacionDao->insertarDetalleLiquidacion('Seguro Asientos', $descuentos[2], $descuento,$conductor->getId(),$mes,$anio);
    $liquidacionDao->insertarDetalleLiquidacion('Seguro RC Exceso', $descuentos[3], $descuento,$conductor->getId(),$mes,$anio);
    $liquidacionDao->insertarDetalleLiquidacion('GPS', $descuentos[4], $descuento,$conductor->getId(),$mes,$anio);
    $liquidacionDao->insertarDetalleLiquidacion('Celular', $descuentos[5], $descuento,$conductor->getId(),$mes,$anio);
    $liquidacionDao->insertarDetalleLiquidacion('APP', $descuentos[6], $descuento,$conductor->getId(),$mes,$anio);
    $totalDescuentos = $prevision + $descuentos[0] + $descuentos[1] + $descuentos[2]
                            + $descuentos[3] + $descuentos[4] + $descuentos[5] + $descuentos[6];
    
    for($k = 0; $k < count($rendiciones); $k++)
    {
        $data = explode("%", $rendiciones[$k]);
        $item = $data[0];
        $valor = $data[1];
        $tipo = $data[2];
        if($tipo == '0'){
            $liquidacionDao->insertarDetalleLiquidacion($item,$valor,$rendicion,$conductor->getId(),$mes,$anio);
            $totalRendiciones += $valor;
        }
        else{
            $liquidacionDao->insertarDetalleLiquidacion($item,$valor,$descuento,$conductor->getId(),$mes,$anio);
            $totalDescuentos += $valor;
        }
    }
    
    $liquidoPagar = $produccionLiquida - $totalDescuentos + $totalRendiciones;
    
    $liquidacion = new Liquidacion();
    $liquidacion->setMes($mes);
    $liquidacion->setAnio($anio);
    $liquidacion->setIdConductor($conductor->getId());
    $liquidacion->setRutConductor($conductor->getRut());
    $liquidacion->setNombreConductor($conductor->getNombre());
    $liquidacion->setProduccionBruta($totalBruto);
    $liquidacion->setParticipacion($participacion);
    $liquidacion->setProduccionLiquida($produccionLiquida);
    $liquidacion->setTotalDescuentos($totalDescuentos);
    $liquidacion->setTotalRendiciones($totalRendiciones);
    $liquidacion->setLiquidoPagar($liquidoPagar);
    $liquidacionDao->insertarLiquidacion($liquidacion);
}


Log::write_log("GETLIQUIDACIONES", 0);