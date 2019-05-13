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
    
    $width = 60;
    $height = 10;
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
    $convenio = '';
    for($i = 0 ; $i < count($servicios);$i++)
    {
        $servicio = explode("%", $servicios[$i]);
        $totalBruto += $servicio[1];
        $convenio .= utf8_decode($servicio[0])."   $ ".$servicio[1]."\n";
    }
    $pdf->MultiCell($width,$height,$convenio, 1);
    
    if(count($servicios) > 0)
    {
        $descuento = '';
        //$afp = $totalBruto * ($porcentajes[1] / 100);
        $afp = 0;
        $isapre = $totalBruto * ($porcentajes[2] / 100);
        $mutual = 0;
        //$mutual = $totalBruto * ($porcentajes[3] / 100);
        $prevision = round($afp) + round($isapre) + round($mutual);
        $descuento .= 'Pagos Previsionales : $  '.$prevision."\n";
        $descuento .= 'Seguro Obligatorio : $  '.$descuentos[0]."\n";
        $descuento .= 'Seguro RC+DM : $  '.$descuentos[1]."\n";
        $descuento .= 'Seguro Asientos : $  '.$descuentos[2]."\n";
        $descuento .= 'Seguro RC Exceso : $  '.$descuentos[3]."\n";
        $descuento .= 'GPS : $  '.$descuentos[4]."\n";
        $descuento .= 'Celular : $  '.$descuentos[5]."\n";
        $descuento .= 'APP : $  '.$descuentos[6]."\n";
        for($j = 0; $j < count($rendiciones); $j++)
        {
            $data = explode("%", $rendiciones[$j]);
            if($data[2] == '1')
            {
                $totalDesc += $data[1];
                $descuento .= $data[0]." $ ".$data[1]."\n";
            }
        }
        $totalDesc += $prevision + $descuentos[0] + $descuentos[1] + $descuentos[2] + $descuentos[3] + 
                $descuentos[4] + $descuentos[5] + $descuentos[6];
    }
    $pdf->SetXY(70,60);
    $pdf->MultiCell($width,$height,$descuento, 1);
    
    $rendicion = '';
    $totalRendicion = 0;
    for($j = 0; $j < count($rendiciones); $j++)
    {
        $data = explode("%", $rendiciones[$j]);
        if($data[2] == '0')
        {
            $totalRendicion += $data[1];
            $rendicion .= $data[0]." $ ".$data[1]."\n";
        }
    }
    $pdf->SetXY(130,60);
    $pdf->MultiCell($width,$height,$rendicion,1);
    
    $totales = '';
    $totalLiquido = round($totalBruto * 0.8);
    $totales .= utf8_decode('Producción Bruta : $  '.$totalBruto)."\n";
    $totales .= 'Total descuentos  : $  '.$totalDesc."\n";
    $totales .= utf8_decode('% Participación :  80%')."\n";
    $totales .= utf8_decode('Producción liquida : $  '.$totalLiquido)."\n";
    $totales .= utf8_decode('Liquido a pagar : $  '.($totalLiquido - $totalDesc))."\n";
    $pdf->SetXY(10,200);
    $pdf->MultiCell($width*3,$height,$totales,1);
    $pdf->Output();
    Log::write_log("GETLIQUIDACIONPDF", 0);
