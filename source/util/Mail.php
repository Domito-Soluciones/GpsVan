<?php

include 'phpmailer/PHPMailer.php';

class Mail {
    
    public static function enviarCorreo($mails,$asunto,$mensaje){
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
        for($i = 0 ; $i < count($mails); $i++){
            $mail->addAddress($mails[$i], '');
        }
        $mail->Subject = $asunto;
        $mail->msgHTML($mensaje);
        if (!$mail->send()) {
        return "{error:" . "$mail->ErrorInfo}\"";
        } else {
            return "{ok:ok}";
        }
    }
    
}
