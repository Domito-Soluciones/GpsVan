<?php
include '../../util/validarPeticion.php';

include '../../query/UsuarioDao.php';
header('Content-Type: application/json');
$respuesta = 0;
$nick = $_REQUEST['id'];
$usuarioDao = new UsuarioDao();
$usuario = $usuarioDao->getUsuarioDatos($nick);
echo "{\"usuario_nombre\":\"".$usuario->getNombre()."\","
        ."\"usuario_cliente\":\"".$usuario->getCliente()."\","
        ."\"usuario_nick\":\"".$usuario->getNick()."\","
        ."\"usuario_password\":\"".$usuario->getPassword()."\","
        ."\"usuario_celular\":\"".$usuario->getCelular()."\","
        ."\"usuario_direccion\":\"".$usuario->getDireccion()."\","
        ."\"usuario_estado\":\"".$usuario->getEstado()."\""
        . "}";