<?php

class ServicioDetalle {
    private $id;
    private $lat;
    private $lon;
    
    function getId() {
        return $this->id;
    }

    function getLat() {
        return $this->lat;
    }

    function getLon() {
        return $this->lon;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setLat($lat) {
        $this->lat = $lat;
    }

    function setLon($lon) {
        $this->lon = $lon;
    }

    function toString() {
        return "ServicioDetalle{" . "id=" . $this->id . ", lat=" . $this->lat . ", lon=" . $this->lon . '}';
    }
    
}
