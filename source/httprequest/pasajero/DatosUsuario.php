<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/UsuarioDao.php';

header('Content-Type: application/json');
$nick = filter_input(INPUT_POST, 'id');
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