<?php

class Log {
    public static function write_log($cadena,$tipo)
    {
        $arch = fopen("/opt/bitnami/apache2/htdocs/log/log_".date("Y-m-d").".txt", "a+"); 
        //$arch = fopen("log_".date("Y-m-d").".txt", "a+"); 
        $log = "[".date("Y-m-d H:i:s.u")." ".$_SERVER['REMOTE_ADDR']." ".$_SESSION['agente'].
                " - $tipo ] ".$cadena."\n";
	fwrite($arch, $log);
	fclose($arch);
    }
}
