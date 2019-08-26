<?php
require './phpmailer/PHPMailer.php';
$email = filter_input(INPUT_POST, 'email');
$asunto = filter_input(INPUT_POST, 'asunto');
$mensaje = filter_input(INPUT_POST, 'mensaje');
$extra = base64_decode (filter_input(INPUT_POST, 'extra'));
header("Content-Type: text/html; charset=UTF-8");
//ini_set( 'display_errors', 1 );
//error_reporting( E_ALL );
$message = $mensaje." ".$extra;

date_default_timezone_set('Etc/UTC');

$mail = new PHPMailer;
$mail->isSMTP();
$mail->SMTPDebug = 2;
$mail->CharSet = 'UTF-8';
$mail->Host = 'mail.domito.cl';
$mail->Port = 25;
$mail->SMTPAuth = true;
$mail->Username = 'notificacion@domito.cl';
$mail->Password = 'domitocl2019';
$mail->setFrom('notificacion@domito.cl', 'Notificaci&oacute;n D&oacute;mito');
$mail->addAddress($email, '');
$mail->Subject = $asunto;
$mail->msgHTML($mensaje." ".$extra);
if (!$mail->send()) {
    echo 'Error: ' . $mail->ErrorInfo;
} else {
    echo "Mail enviado correctamente";
}