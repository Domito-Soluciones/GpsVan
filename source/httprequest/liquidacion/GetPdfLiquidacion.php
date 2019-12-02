<?php
require('../../util/fpdf.php');
include '../../query/LiquidacionDao.php';
include '../../dominio/Liquidacion.php';
include '../../log/Log.php';

$pdf = new FPDF();
$pdf->AddPage();

$meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    $conductor = filter_input(INPUT_GET, 'conductor');
    $mes = filter_input(INPUT_GET, 'mes') +1;
    $anio = filter_input(INPUT_GET, 'anio') ;
    $rut = filter_input(INPUT_GET, 'rut');
    $nombre = filter_input(INPUT_GET, 'nombre');
    $liquidacionDao = new LiquidacionDao();
    $liquidacion = $liquidacionDao->getLiquidacion($conductor,$mes,$anio);
    $liquidacionProduccion = $liquidacionDao->getLiquidacionDetalle($conductor,$mes,$anio,0);
    $liquidacionDescuentos = $liquidacionDao->getLiquidacionDetalle($conductor,$mes,$anio,1);
    $liquidacionRendiciones = $liquidacionDao->getLiquidacionDetalle($conductor,$mes,$anio,2);
    
    $height = 10;
    $total = 20;
    $width = 60;
    $pdf->SetFont('Arial','B',16);
    $pdf->Cell(50,10,utf8_decode('Liquidación Transportistas'),0,1,'L');
    $pdf->SetFont('Arial','B',10);
    $pdf->Cell(50,10,'Periodo:'. $meses[$mes-1].' '.$anio,0,1,'L');
    $pdf->Cell(50,10,'Nombre:'. $nombre,0,1,'L');
    $pdf->Cell(50,10,'Rut:'. $rut,0,1,'L');
    $pdf->SetFont('Arial','B',13);
    $pdf->Cell($width,$height,utf8_decode('Producción mensual'),1);
    $pdf->Cell($width,$height,utf8_decode('Descuentos'),1);
    $pdf->Cell($width,$height,utf8_decode('Rendiciones'),1);
    $pdf->Ln();
    $totalBruto = 0;
    $pdf->SetFont('Arial','B',9);
    for($i = 0; $i < count($liquidacionProduccion) ; $i++)
    {
        $detalle = $liquidacionProduccion[$i];
        $pdf->MultiCell($width,$height,utf8_decode($detalle->getItem())."   $ ".$detalle->getValor()."\n", 1);
    }
    for($j = 0 ; $j < $total - count($liquidacionProduccion) -1;$j++){
        $pdf->MultiCell($width,$height,"\n", 1);
    }
    
    if(count($liquidacionProduccion) > 0)
    {
        $posicion = 60;
        $pdf->SetXY(70,$posicion);
        $pdf->Cell($width,$height,'Pagos Previsionales : $  '.$liquidacionDescuentos[0]->getValor()."\n", 1);
        $pdf->SetXY(70,$posicion+10);
        $pdf->Cell($width,$height,'Seguro Obligatorio : $  '.$liquidacionDescuentos[1]->getValor()."\n", 1);
        $pdf->SetXY(70,$posicion+20);
        $pdf->Cell($width,$height,'Seguro RC+DM : $  '.$liquidacionDescuentos[2]->getValor()."\n", 1);
        $pdf->SetXY(70,$posicion+30);
        $pdf->Cell($width,$height,'Seguro Asientos : $  '.$liquidacionDescuentos[3]->getValor()."\n", 1);
        $pdf->SetXY(70,$posicion+40);
        $pdf->Cell($width,$height,'Seguro RC Exceso : $  '.$liquidacionDescuentos[4]->getValor()."\n", 1);
        $pdf->SetXY(70,$posicion+50);
        $pdf->Cell($width,$height,'GPS : $  '.$liquidacionDescuentos[5]->getValor()."\n", 1);
        $pdf->SetXY(70,$posicion+60);
        $pdf->Cell($width,$height,'Celular : $  '.$liquidacionDescuentos[6]->getValor()."\n", 1);
        $pdf->SetXY(70,$posicion+70);
        $pdf->Cell($width,$height,'APP : $  '.$liquidacionDescuentos[7]->getValor()."\n", 1);
        $posicion = $posicion+80;
        $var = 8;
        for($j = 0; $j < count($liquidacionDescuentos) ; $j++)
        {
            if($j > 7){
                $pdf->SetXY(70,$posicion);
                $detalle = $liquidacionDescuentos[$j];
                $pdf->MultiCell($width,$height,utf8_decode($detalle->getItem())."   $ ".$detalle->getValor()."\n", 1);
                $posicion = $posicion+10;
            }
        }
        for($f = 0; $f < $total - $var;$f++){
            $pdf->MultiCell($width,$height,"\n", 1);
            $pdf->SetXY(70,$posicion);
            $posicion = $posicion+10;
        }
    }
    
    $rendicion = '';
    $totalRendicion = 0;
    $posicion2 = 60;
    $pdf->SetXY(130,$posicion2);
    $x = 0;
    for($j = 0; $j < count($liquidacionRendiciones) ; $j++)
    {
        $detalle = $liquidacionRendiciones[$j];
        $pdf->MultiCell($width,$height,utf8_decode($detalle->getItem())."   $ ".$detalle->getValor()."\n", 1);
    }
    for($c = 0 ; $c < $total - $x;$c++){
        $pdf->MultiCell($width,$height,"\n", 1);
        $pdf->SetXY(130,$posicion2);
        $posicion2 = $posicion2+10;
    }
    
    $height = 5;
    $totales = '';
    $totalLiquido = round($totalBruto * 0.8);
    $pdf->SetXY(10,250);
    $pdf->MultiCell($width*1.5,$height,utf8_decode('Producción Bruta   : $ '.$liquidacion->getProduccionBruta()),1);
    $pdf->MultiCell($width*1.5,$height,utf8_decode('% Participación    : ').$liquidacion->getParticipacion(),1);
    $pdf->MultiCell($width*1.5,$height,utf8_decode('Producción liquida : $ '.$liquidacion->getProduccionLiquida()),1);
    $pdf->SetXY(100,250);
    $pdf->MultiCell($width*1.5,$height,'Total descuentos   : $ '.$liquidacion->getTotalDescuentos(),1);
    $pdf->SetXY(100,255);
    $pdf->MultiCell($width*1.5,$height,'Total rendiciones   : $ '.$liquidacion->getTotalRendiciones(),1);
    $pdf->SetXY(100,260);
    $pdf->MultiCell($width*1.5,$height,'Liquido a pagar    : $ '.$liquidacion->getLiquidoPagar(),1);
    $pdf->Output();
    Log::write_log("GETLIQUIDACIONPDF", 0);
