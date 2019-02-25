<?php

$email = filter_input(INPUT_POST, 'email');
$asunto = filter_input(INPUT_POST, 'asunto');
$mensaje = filter_input(INPUT_POST, 'mensaje');
$extra = base64_decode (filter_input(INPUT_POST, 'extra'));
ini_set( 'display_errors', 1 );
error_reporting( E_ALL );
$from = "notificacion@domito.cl";
$to = $email;
$subject = $asunto;
$message = $mensaje." ".$extra;
$headers = "From:" . $from;
mail($to,$subject,$message, $headers);
echo "Mail enviado correctamente";