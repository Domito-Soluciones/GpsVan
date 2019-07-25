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
    $rendiciones = $liquidacionDao->getRendiciones($conductor,$mes+1,$anio);
    $porcentajes = $liquidacionDao->getPorcentajes();
    $totalDesc = 0;
    
    $height = 10;
    $total = 20;
    $width = 60;
    $pdf->SetFont('Arial','B',16);
    $pdf->Cell(50,10,utf8_decode('Liquidación Transportistas'),0,1,'L');
    $pdf->SetFont('Arial','B',10);
    $pdf->Cell(50,10,'Periodo:'. $meses[$mes].' '.$anio,0,1,'L');
    $pdf->Cell(50,10,'Nombre:'. $nombre,0,1,'L');
    $pdf->Cell(50,10,'Rut:'. $rut,0,1,'L');
    $pdf->SetFont('Arial','B',13);
    $pdf->Cell($width,$height,utf8_decode('Producción mensual'),1);
    $pdf->Cell($width,$height,utf8_decode('Descuentos'),1);
    $pdf->Cell($width,$height,utf8_decode('Rendiciones'),1);
    $pdf->Ln();
    $totalBruto = 0;
    $pdf->SetFont('Arial','B',9);
    for($i = 0 ; $i < count($servicios);$i++)
    {
        $servicio = explode("%", $servicios[$i]);
        $totalBruto += $servicio[1];
        $pdf->MultiCell($width,$height,utf8_decode($servicio[0])."   $ ".$servicio[1]."\n", 1);
    }
    for($j = 0 ; $j < $total - count($servicios) -1;$j++){
        $pdf->MultiCell($width,$height,"\n", 1);
    }
    
    if(count($servicios) > 0)
    {
        $posicion = 60;
        $afp = $totalBruto * (trim($porcentajes[1]) / 100);
        $isapre = $totalBruto * (trim($porcentajes[2]) / 100);
        $mutual = $totalBruto * (trim($porcentajes[3]) / 100);
        $prevision = round($afp) + round($isapre) + round($mutual);
        $pdf->SetXY(70,$posicion);
        $pdf->Cell($width,$height,'Pagos Previsionales : $  '.$prevision."\n", 1);
        $pdf->SetXY(70,$posicion+10);
        $pdf->Cell($width,$height,'Seguro Obligatorio : $  '.$descuentos[0]."\n", 1);
        $pdf->SetXY(70,$posicion+20);
        $pdf->Cell($width,$height,'Seguro RC+DM : $  '.$descuentos[1]."\n", 1);
        $pdf->SetXY(70,$posicion+30);
        $pdf->Cell($width,$height,'Seguro Asientos : $  '.$descuentos[2]."\n", 1);
        $pdf->SetXY(70,$posicion+40);
        $pdf->Cell($width,$height,'Seguro RC Exceso : $  '.$descuentos[3]."\n", 1);
        $pdf->SetXY(70,$posicion+50);
        $pdf->Cell($width,$height,'GPS : $  '.$descuentos[4]."\n", 1);
        $pdf->SetXY(70,$posicion+60);
        $pdf->Cell($width,$height,'Celular : $  '.$descuentos[5]."\n", 1);
        $pdf->SetXY(70,$posicion+70);
        $pdf->Cell($width,$height,'APP : $  '.$descuentos[6]."\n", 1);
        $posicion = $posicion+80;
        $var = 8;
        for($j = 0; $j < count($rendiciones); $j++)
        {
            $data = explode("%", $rendiciones[$j]);
            if($data[2] == '1')
            {
                $var++;
                $totalDesc += $data[1];
                $pdf->SetXY(70,$posicion);
                $pdf->Cell($width,$height,$data[0]." $ ".$data[1]."\n", 1);
                $posicion = $posicion+10;
            }
        }
        for($f = 0; $f < $total - $var;$f++){
            $pdf->MultiCell($width,$height,"\n", 1);
            $pdf->SetXY(70,$posicion);
            $posicion = $posicion+10;
        }
        $totalDesc += $prevision + $descuentos[0] + $descuentos[1] + $descuentos[2] + $descuentos[3] + 
                $descuentos[4] + $descuentos[5] + $descuentos[6];
    }
    
    $rendicion = '';
    $totalRendicion = 0;
    $posicion2 = 60;
    $pdf->SetXY(130,$posicion2);
    $x = 0;
    for($j = 0; $j < count($rendiciones); $j++)
    {
        $data = explode("%", $rendiciones[$j]);
        if($data[2] == '0')
        {
            $x++;
            $totalRendicion += $data[1];
            $pdf->SetXY(130,$posicion2);
            $pdf->MultiCell($width,$height,$data[0]." $ ".$data[1]."\n",1);
            $posicion2 = $posicion2+10;
        }
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
    $pdf->MultiCell($width*1.5,$height,utf8_decode('Producción Bruta   : $ '.$totalBruto),1);
    $pdf->MultiCell($width*1.5,$height,utf8_decode('% Participación    : 80%'),1);
    $pdf->MultiCell($width*1.5,$height,utf8_decode('Producción liquida : $ '.$totalLiquido),1);
    $pdf->SetXY(100,250);
    $pdf->MultiCell($width*1.5,$height,'Total descuentos   : $ '.$totalDesc,1);
    $pdf->SetXY(100,255);
    $pdf->MultiCell($width*1.5,$height,'Total rendiciones   : $ '.$totalRendicion,1);
    $pdf->SetXY(100,260);
    $pdf->MultiCell($width*1.5,$height,'Liquido a pagar    : $ '.($totalLiquido - $totalDesc + $totalRendicion),1);
    $pdf->Output();
    Log::write_log("GETLIQUIDACIONPDF", 0);
