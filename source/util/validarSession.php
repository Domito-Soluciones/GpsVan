<?php
header('Content-Type: application/json');

session_start();
$app = 0;
if(filter_input(INPUT_POST, 'app') != '')
{
    $app = 1;   
}
if(!isset($_SESSION['agente']) && $app == 0)
{
    echo "{\"estado\":\"no_autorizado\"}";
    exit();    
}
