<?php
require('../../util/fpdf.php');
include '../../query/ReporteDao.php';
include '../../log/Log.php';

    $pdf = new FPDF();
    $pdf->AddPage();
    $empresa = filter_input(INPUT_GET, 'empresa');
    $cc = filter_input(INPUT_GET, 'cc');
    $conductor = filter_input(INPUT_GET, 'conductor');
    $desde = '';
    if(filter_input(INPUT_GET, 'desde') != '')
    {
        $desde = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_GET, 'desde'))->format('Y/m/d');
    }
    else
    {
        $desde = filter_input(INPUT_GET, 'desde');
    }
    $hdesde = filter_input(INPUT_GET, 'hdesde');
    $hasta = '23:59:59';
    if(filter_input(INPUT_GET, 'hasta') != '')
    {
        $hasta = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_GET, 'hasta'))->format('Y/m/d');
    }
    else
    {
        $hasta = filter_input(INPUT_GET, 'hasta');
    }
    $hhasta = filter_input(INPUT_GET, 'hhasta');
    $tipo = filter_input(INPUT_GET, 'tipo');
    $reporteDao = new ReporteDao();
    $servicios = $reporteDao->getServiciosDetalle($empresa,$cc,$conductor,$desde,$hdesde,$hasta,$hhasta);
    
    $width = 20;
    $widthG = 35;
    $widthB = 12;
    $height = 7;
    $pdf->SetFont('Arial','B',7);
    $pdf->Cell(50,10,'Reporte Detalle Servicios',0,1,'L');
    $pdf->Cell($width,$height,'ID',1);
    $pdf->Cell($widthG,$height,'Cliente',1);
    $pdf->Cell($width,$height,'Ruta',1);
    $pdf->Cell($width,$height,'Tipo Ruta',1);
    $pdf->Cell($width,$height,'Fecha',1);
    $pdf->Cell($width,$height,'Hora',1);
//    $pdf->Cell($width,$height,'Movil',1);
//    $pdf->Cell($width,$height,'Conductor',1);
    if($tipo == 'CLIENTE'){
        $pdf->Cell($widthB,$height,'Tarifa',1);
    }
    else{
        $pdf->Cell($widthB,$height,'Tarifa 1',1);
        $pdf->Cell($widthB,$height,'Tarifa 2',1);
    }
    //$pdf->Cell($widthB,$height,'Estado',1);
//    $pdf->Cell($width,$height,'Observacion adicional',1);
    $pdf->Ln();
    
    for ($i = 0 ; $i < count($servicios); $i++)
    {
        $servicioId = $servicios[$i]->getId();
        $servicioCliente = $servicios[$i]->getCliente();
        $servicioRuta = $servicios[$i]->getRuta();
        $servicioTipoRuta = $servicios[$i]->getTruta();
        $servicioFecha = $servicios[$i]->getFecha();
        $servicioHora = $servicios[$i]->getHora();
//        $servicioMovil = $servicios[$i]->getMovil();
//        $servicioConductor = $servicios[$i]->getConductor();
        $servicioTarifa1 = $servicios[$i]->getTarifa1();
        $servicioTarifa2 = $servicios[$i]->getTarifa2();
        $servicioEstado = $servicios[$i]->getEstado();
//        $servicioObAd = $servicios[$i]->getObservacionesAdicionales();
        $pdf->SetFont('Arial','B',7);
        $pdf->Cell($width,$height,$servicioId,1);
        $pdf->Cell($widthG,$height,$servicioCliente,1);
        $pdf->Cell($width,$height,$servicioRuta,1);
        $pdf->Cell($width,$height,$servicioTipoRuta,1);
        $pdf->Cell($width,$height,$servicioFecha,1);
        $pdf->Cell($width,$height,$servicioHora,1);
//        $pdf->Cell($width,$height,$servicioMovil,1);
//        $pdf->Cell($width,$height,$servicioConductor,1);
        $cantidad = $servicios[$i]->getCantidadPasajeros();
        $cantidadCC = $servicios[$i]->getCantidadPasajerosCC();
        $aux0 = 0;
        $aux = 0;
        if($cantidad > 0){
            $aux0 = $servicioTarifa1 / $cantidad;
            $aux = $servicioTarifa2 / $cantidad;
        }
        $servicioTarifa1 = round($aux0 * $cantidadCC);
        $servicioTarifa2 = round($aux * $cantidadCC);
        if($tipo == 'CLIENTE'){
            $pdf->Cell($widthB,$height,$servicioTarifa1,1);
        }
        else{
            $pdf->Cell($widthB,$height,$servicioTarifa1,1);
            $pdf->Cell($widthB,$height,$servicioTarifa2,1);
        }
        //$pdf->Cell($widthB,$height,$servicioEstado,1);
//        $pdf->Cell($width,$height,$servicioObAd,1);
        $pdf->Ln();
    }
    $pdf->Output();
    Log::write_log("GETPDFREPORTE", 0);
