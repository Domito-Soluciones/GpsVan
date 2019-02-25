<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ConductorDao.php';
include '../../cripto/Cripto.php';

header('Content-Type: application/json');
$cripto = new Cripto();
$respuesta = 0;
$nombre = filter_input(INPUT_POST, 'usuario');
$password = $cripto->encriptar(filter_input(INPUT_POST, 'password'));
$conductorDao = new ConductorDao();
$id = $conductorDao->getConductor($nombre, $password);
echo "{\"conductor_id\":".$id."}";