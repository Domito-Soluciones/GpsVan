<?php
require './phpmailer/PHPMailer.php';
include '../cripto/Cripto.php';
include '../conexion/Conexion.php';
$mailEncrypt = filter_input(INPUT_POST, 'mailencrypt');
$email = '';
if($mailEncrypt == 'true'){
    $aux = base64_encode(filter_input(INPUT_POST, 'email'));
    $email = Cripto::desencriptar($aux);   
}
else{
    $email = filter_input(INPUT_POST, 'email');
}
if($email == ''){
    $mails = array();
    $conn = new Conexion();
    try {
        $query = "SELECT agente_mail FROM tbl_agente WHERE agente_perfil IN (0,2)"; 
        $conn->conectar();
        $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
        while($row = mysqli_fetch_array($result)) {
            array_push($mails,$row["agente_mail"]);
        }
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
        Log::write_error_log($exc->getTraceAsString());
    }
}
$asunto = filter_input(INPUT_POST, 'asunto');
$mensaje = filter_input(INPUT_POST, 'mensaje');
$encrypt = filter_input(INPUT_POST, 'encrypt');
$extra = filter_input(INPUT_POST, 'extra');
if($encrypt == 'true'){
    $extra = base64_decode (filter_input(INPUT_POST, 'extra'));
}
header("Content-Type: text/html; charset=UTF-8");

$message = $mensaje." ".$extra;

date_default_timezone_set('Etc/UTC');

$mail = new PHPMailer;
$mail->isSMTP();
$mail->CharSet = 'UTF-8';
$mail->Host = 'smtp.gmail.com';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
$mail->SMTPAuth = true;
$mail->Username = 'notificaciones@gotransfer.cl';
$mail->Password = 'notificacionesgo';
$mail->setFrom('notificaciones@gotransfer.cl', 'Notificación Go Transfer');
if($email != ''){
    $mail->addAddress($email, '');
}
else{
    for($i = 0 ; $i < count($mails); $i++){
        //$mail->addAddress($mails[$i], '');
        $mail->addAddress("jose.sanchez.6397@gmail.com","");
    }
}
$mail->Subject = $asunto;
$mail->msgHTML($mensaje." ".$extra);
if (!$mail->send()) {
    echo 'Error: ' . $mail->ErrorInfo;
} else {
    echo "";
}