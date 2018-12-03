<?php
session_start();
if(!isset($_SESSION['agente']))
{
    print('return');
    exit();
}
