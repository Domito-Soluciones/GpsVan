<?php
include '../../util/validarPeticion.php';

include '../../query/UsuarioDao.php';
header('Content-Type: application/json');
$respuesta = 0;
$nick = $_REQUEST['nick'];
$usuarioDao = new UsuarioDao();
$usuario = $usuarioDao->getUsuarioDatos($nick);
echo "{\"nombre\":\"".$usuario->getNombre()."\","
        ."\"cliente\":\"".$usuario->getCliente()."\""
        . "}";