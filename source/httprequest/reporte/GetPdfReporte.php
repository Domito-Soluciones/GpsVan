<?php
require('../../util/fpdf.php');
include '../../query/ReporteDao.php';
include '../../log/Log.php';

    $pdf = new FPDF();
    $pdf->AddPage();
    $empresa = filter_input(INPUT_GET, 'empresa');
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
    $servicios = $reporteDao->getServicios($empresa,$conductor,$desde,$hdesde,$hasta,$hhasta);
    $serviciosFinalizados = 0;
    $serviciosEnRuta = 0;
    $serviciosPorRealizar = 0;
    $serviciosPorAsignar = 0;
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
    }
    $pdf->SetFont('Arial','B',16);
    $pdf->Cell(50,10,'Reporte Servicios',0,1,'L');
    $pdf->Cell(50,1,'',0,1);
    $pdf->SetFont('Arial','B',10);
    $pdf->Cell(50,10,utf8_decode('Servicio Pendiente Asignación : '.$serviciosPorAsignar),0,1,'L');
    $pdf->Cell(50,1,'',0,1);
    $pdf->Cell(50,10,'Servicio Aceptado : '.$serviciosPorRealizar,0,1,'L');
    $pdf->Cell(50,1,'',0,1);
    $pdf->Cell(50,10,'Servicio en Ruta : '.$serviciosEnRuta,0,1,'L');
    $pdf->Cell(50,1,'',0,1);
    $pdf->Cell(50,10,'Servicio Finalizado : '.$serviciosFinalizados,0,1,'L');
    $pdf->Cell(50,1,'',0,1);    
    $pdf->Output();
    Log::write_log("GETPDFREPORTE", 0);
