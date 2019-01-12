<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include_once '../../query/UsuarioDao.php';

header('Content-Type: application/json');
$usuario = filter_input(INPUT_POST, 'usuario');
$usuarioDao = new UsuarioDao();
$usuarioDao->cambiarEstadoUsuario(1, $usuario);
echo "{\"pasajero_habilitado\":".$usuario."}";

