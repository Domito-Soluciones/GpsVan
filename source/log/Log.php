<?php

class Log {
    public static function write_log($cadena,$tipo)
    {   
        $arch = fopen(realpath( '.' )."milog_".date("Y-m-d").".txt", "a+"); 
        $log = "[".date("Y-m-d H:i:s.u")." ".$_SERVER['REMOTE_ADDR']." ".
//            $_SERVER['HTTP_X_FORWARDED_FOR'].
            " - $tipo ] ".$cadena."\n";
	fwrite($arch, $log);
	fclose($arch);
    }
}
