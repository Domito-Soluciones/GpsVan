<?php
include '../../util/validarPeticion.php';

include_once '../../query/UsuarioDao.php';

$usuario = $_REQUEST['usuario'];
$usuarioDao = new UsuarioDao();
$usuarioDao->cambiarEstadoUsuario(1, $usuario);

