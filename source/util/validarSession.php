<?php
session_start();
$app = 0;
if(filter_input(INPUT_POST, 'app') != '')
{
    $app = 1;   
}
if(!isset($_SESSION['agente']) && $app == 0)
{
    print('return');
    exit();    
}
