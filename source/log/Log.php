<?php

class Log {
    public static function write_log($cadena,$tipo)
    {
        $arch = fopen("log_".date("Y-m-d").".txt", "a+"); 
        $arch = fopen("/opt/bitnami/apache2/htdocs/log/log_".date("Y-m-d").".txt", "a+"); 
        $log = "[".date("Y-m-d H:i:s.u")." ".$_SERVER['REMOTE_ADDR']." USUARIO: ".$_SESSION['agente']." - $tipo ] ".$cadena."\n";
	fwrite($arch, $log);
	fclose($arch);
    }
        
    public static function write_error_log($error)
    {
        $arch = fopen("/opt/bitnami/apache2/htdocs/log/log_error_".date("Y-m-d").".txt", "a+"); 
        $log = "[".date("Y-m-d H:i:s.u")." ".$_SERVER['REMOTE_ADDR']." ERROR: ".$error."\n";
	fwrite($arch, $log);
	fclose($arch);
    }
    
    public static function write_app_log($error)
    {
        $arch = fopen("/opt/bitnami/apache2/htdocs/log/log_app_error_".date("Y-m-d").".txt", "a+"); 
        $log = "[".date("Y-m-d H:i:s.u")." ".$_SERVER['REMOTE_ADDR']." ERROR: ".$error."\n";
	fwrite($arch, $log);
	fclose($arch);
    }
}
