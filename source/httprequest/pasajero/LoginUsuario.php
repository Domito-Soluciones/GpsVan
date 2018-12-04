<?php
//include '../../util/validarPeticion.php';

include '../../query/UsuarioDao.php';
header('Content-Type: application/json');
$respuesta = 0;
$nombre = $_REQUEST['usuario'];
$password = $_REQUEST['password'];
$usuarioDao = new UsuarioDao();
$id = $usuarioDao->getUsuario($nombre, $password);
echo "{\"id\":".$id."}";