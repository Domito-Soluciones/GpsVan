<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/UsuarioDao.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$usuarioDao = new UsuarioDao();
$usuarios = $usuarioDao->getUsuarios($id);
echo "[";
for ($i = 0 ; $i < count($usuarios); $i++)
{
    $usuarioId = $usuarios[$i]->getId();
    $usuarioNombre = $usuarios[$i]->getNombre();
    echo "{\"usuario_id\":\"".$usuarioId."\","
        . "\"usuario_nombre\":\"".$usuarioNombre."\""
        . "}";
    if (($i+1) != count($usuarios))
    {
        echo ",";
    }
}
echo "]";
