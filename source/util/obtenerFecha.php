<?php

$hoy = getdate();
echo $hoy['mday'] . "/" . $hoy['mon'] . "/" . $hoy['year'] . " " . $hoy['hours'] . ":" . $hoy['minutes'];
