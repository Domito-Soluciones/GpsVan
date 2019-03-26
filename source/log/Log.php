<?php

class Log {
    public static function write_log($cadena,$tipo)
    {   
        //$arch = fopen("/home/domitocl/public_html/log/log_".date("Y-m-d").".txt", "a+"); 
        $arch = fopen("log_".date("Y-m-d").".txt", "a+"); 
        $log = "[".date("Y-m-d H:i:s.u")." ".$_SERVER['REMOTE_ADDR']." ".
//            $_SERVER['HTTP_X_FORWARDED_FOR'].
            " - $tipo ] ".$cadena."\n";
	fwrite($arch, $log);
	fclose($arch);
    }
}
