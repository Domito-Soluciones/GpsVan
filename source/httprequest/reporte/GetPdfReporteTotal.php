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
    $reporteDao = new ReporteDao();
    $servicios = $reporteDao->getServicios($empresa,$cc,$conductor,$desde,$hdesde,$hasta,$hhasta);
    $serviciosFinalizados = 0;
    $serviciosEnRuta = 0;
    $serviciosPorRealizar = 0;
    $serviciosPorAsignar = 0;
    $serviciosCancelados = 0;
    for($i = 0 ; $i < count($servicios); $i++)
    {
        $aux = explode("%",$servicios[$i]);
        if($aux[0] == '1')
        {
            $serviciosPorAsignar = $aux[1];
        }
        else if($aux[0] == '3')
        {
            $serviciosPorRealizar = $aux[1];
        }
        else if($aux[0] == '4')
        {
            $serviciosEnRuta = $aux[1];
        }
        else if($aux[0] == '5')
        {
            $serviciosFinalizados = $aux[1];
        }
        else if($aux[0] == '6')
        {
            $serviciosCancelados = $aux[1];
        }
    }
    $width = 70;
    $height = 10;
    $pdf->SetFont('Arial','B',16);
    $pdf->Cell(50,10,'Reporte Servicios',0,1,'L');
    $pdf->Cell($width,$height,'Item',1);
    $pdf->Cell($width,$height,'Total',1);
    $pdf->Ln();
    $pdf->SetFont('Arial','B',10);
    $pdf->Cell($width,$height,utf8_decode('Servicio Pendiente Asignación'),1);
    $pdf->Cell($width,$height,$serviciosPorAsignar,1);
    $pdf->Ln();
    $pdf->Cell($width,$height,'Servicio Aceptado',1);
    $pdf->Cell($width,$height,$serviciosPorRealizar,1);
    $pdf->Ln();
    $pdf->Cell($width,$height,'Servicio en Ruta',1);
    $pdf->Cell($width,$height,$serviciosEnRuta,1);
    $pdf->Ln();
    $pdf->Cell($width,$height,'Servicio Finalizado',1);
    $pdf->Cell($width,$height,$serviciosFinalizados,1);
    $pdf->Ln();
    $pdf->Cell($width,$height,'Servicio Cancelado',1);
    $pdf->Cell($width,$height,$serviciosCancelados,1);
    $pdf->Ln();
    $pdf->Output();
    Log::write_log("GETPDFREPORTE", 0);
