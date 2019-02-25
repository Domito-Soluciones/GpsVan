<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ConfiguracionDao.php';

header('Content-Type: application/json');
$uf = filter_input(INPUT_POST, 'uf');
$afp = filter_input(INPUT_POST, 'afp');
$isapre = filter_input(INPUT_POST, 'isapre');
$mutual = filter_input(INPUT_POST, 'mutual');
$configuracionDao = new ConfiguracionDao();
$configuracionDao->modificarConfiguracion($uf,$afp,$isapre,$mutual);
echo "{\"configuracion_estado\":\"ok\"}";