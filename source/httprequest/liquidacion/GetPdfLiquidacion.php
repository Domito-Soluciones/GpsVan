<?php
require('../../util/fpdf.php');
include '../../query/LiquidacionDao.php';
include '../../log/Log.php';

$pdf = new FPDF();
$pdf->AddPage();

$meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    $conductor = filter_input(INPUT_GET, 'conductor');
    $mes = filter_input(INPUT_GET, 'mes') ;
    $anio = filter_input(INPUT_GET, 'anio');
    $rut = filter_input(INPUT_GET, 'rut');
    $nombre = filter_input(INPUT_GET, 'nombre');
    $liquidacionDao = new LiquidacionDao();
    $servicios = $liquidacionDao->getServiciosConvenio($conductor, $mes+1, $anio);
    $descuentos = $liquidacionDao->getDescuentosConductor($conductor);
    $porcentajes = $liquidacionDao->getPorcentajes();
    $totalDesc = 0;
    $pdf->SetFont('Arial','B',16);
    $pdf->Cell(50,10,utf8_decode('Liquidación Transportistas'),0,1,'L');
    $pdf->Cell(50,1,'',0,1);
    $pdf->SetFont('Arial','B',10);
    $pdf->Cell(50,10,'Periodo:'. $meses[$mes].' '.$anio,0,1,'L');
    $pdf->Cell(50,1,'',0,1);
    $pdf->Cell(50,10,'Nombre:'. $nombre,0,1,'L');
    $pdf->Cell(50,1,'',0,1);
    $pdf->Cell(50,10,'Rut:'. $rut,0,1,'L');
    $pdf->Cell(50,1,'',0,1);
    $pdf->SetFont('Arial','B',13);
    $pdf->Cell(100,10,utf8_decode('Producción mensual'),0,1,'L');
    $totalBruto = 0;
    $pdf->SetFont('Arial','B',9);
    for($i = 0 ; $i < count($servicios);$i++)
    {
        $servicio = explode("%", $servicios[$i]);
        $totalBruto += $servicio[1];
        $pdf->Cell(100,10,utf8_decode($servicio[0])." ".$servicio[1],0,1,'L');
        $pdf->Cell(50,1,'',0,1);
    }
    $pdf->SetFont('Arial','B',13);
    $pdf->Cell(100,10,'Descuentos',0,1,'L');
    $pdf->SetFont('Arial','B',9);
    if(count($servicios) > 0)
    {
        $afp = $totalBruto * ($porcentajes[1] / 100);
        $isapre = $totalBruto * ($porcentajes[2] / 100);
        $mutual = $totalBruto * ($porcentajes[3] / 100);
        $prevision = round($afp) + round($isapre) + round($mutual);
        $pdf->Cell(100,10,'Pagos Previsionales : $  '.$prevision,0,1,'L');
        $pdf->Cell(50,1,'',0,1);
        $pdf->Cell(100,10,'Seguro Obligatorio : $  '.$descuentos[0],0,1,'L');
        $pdf->Cell(50,1,'',0,1);
        $pdf->Cell(100,10,'Seguro RC+DM : $  '.$descuentos[1],0,1,'L');
        $pdf->Cell(50,1,'',0,1);
        $pdf->Cell(100,10,'Seguro Asientos : $  '.$descuentos[2],0,1,'L');
        $pdf->Cell(50,1,'',0,1);
        $pdf->Cell(100,10,'Seguro RC Exceso : $  '.$descuentos[3],0,1,'L');
        $pdf->Cell(50,1,'',0,1);
        $pdf->Cell(100,10,'GPS : $  '.$descuentos[4],0,1,'L');
        $pdf->Cell(50,1,'',0,1);
        $pdf->Cell(100,10,'Celular : $  '.$descuentos[5],0,1,'L');
        $pdf->Cell(50,1,'',0,1);
        $pdf->Cell(100,10,'APP : $  '.$descuentos[6],0,1,'L');
        $pdf->Cell(50,1,'',0,1);
        $totalDesc = $prevision + $descuentos[0] + $descuentos[1] + $descuentos[2] + $descuentos[3] + 
                $descuentos[4] + $descuentos[5] + $descuentos[6];
    }
    $totalLiquido = round($totalBruto * 0.8);
    $pdf->SetFont('Arial','B',13);
    $pdf->Cell(100,10,utf8_decode('Producción Bruta : $  '.$totalBruto),0,1,'L');
    $pdf->Cell(50,1,'',0,1);
    $pdf->Cell(100,10,'Total descuentos  : $  '.$totalDesc,0,1,'L');
    $pdf->Cell(50,1,'',0,1);
    $pdf->Cell(100,10,utf8_decode('% Participación :  80%'),0,1,'L');
    $pdf->Cell(50,1,'',0,1);
    $pdf->Cell(100,10,utf8_decode('Producción liquida : $  '.$totalLiquido),0,1,'L');
    $pdf->Cell(50,1,'',0,1);
    $pdf->SetFont('Arial','B',20);
    $pdf->Cell(100,10,utf8_decode('Liquido a pagar : $  '.($totalLiquido - $totalDesc)),0,1,'L');
    
    $pdf->Output();
    Log::write_log("GETLIQUIDACIONPDF", 0);
