-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 20-12-2018 a las 02:19:36
-- Versión del servidor: 5.5.24-log
-- Versión de PHP: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `gpsvan`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_agente`
--

CREATE TABLE IF NOT EXISTS `tbl_agente` (
  `agente_id` int(11) NOT NULL AUTO_INCREMENT,
  `agente_nombre` varchar(20) NOT NULL,
  `agente_papellido` varchar(20) NOT NULL,
  `agente_mapellido` varchar(20) NOT NULL,
  `agente_rut` varchar(10) NOT NULL,
  `agente_nick` varchar(20) NOT NULL,
  `agente_clave` varchar(20) NOT NULL,
  `agente_telefono` varchar(15) NOT NULL,
  `agente_celular` varchar(15) NOT NULL,
  `agente_direccion` varchar(60) NOT NULL,
  `agente_mail` varchar(50) NOT NULL,
  `agente_cargo` varchar(20) NOT NULL,
  `agente_perfil` varchar(20) NOT NULL,
  PRIMARY KEY (`agente_id`),
  UNIQUE KEY `agente_rut` (`agente_rut`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=36 ;

--
-- Volcado de datos para la tabla `tbl_agente`
--

INSERT INTO `tbl_agente` (`agente_id`, `agente_nombre`, `agente_papellido`, `agente_mapellido`, `agente_rut`, `agente_nick`, `agente_clave`, `agente_telefono`, `agente_celular`, `agente_direccion`, `agente_mail`, `agente_cargo`, `agente_perfil`) VALUES
(1, 'Usuario', 'Prueba', 'Prueba', '12911893-8', 'admin', 'admin', '1111111', '11111111', 'av las torres 123', 'prueba@prueba.cl', 'administrador', 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_cliente`
--

CREATE TABLE IF NOT EXISTS `tbl_cliente` (
  `cliente_id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente_razon_social` varchar(20) NOT NULL,
  `cliente_tipo` varchar(20) NOT NULL,
  `cliente_rut` varchar(20) NOT NULL,
  `cliente_direccion` varchar(50) NOT NULL,
  `cliente_nombre_contacto` varchar(30) NOT NULL,
  `cliente_fono_contacto` varchar(20) NOT NULL,
  `cliente_mail_contacto` varchar(30) NOT NULL,
  `cliente_mail_facturacion` varchar(30) NOT NULL,
  `cliente_centro_costo` varchar(20) NOT NULL,
  PRIMARY KEY (`cliente_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_conductor`
--

CREATE TABLE IF NOT EXISTS `tbl_conductor` (
  `conductor_id` int(11) NOT NULL AUTO_INCREMENT,
  `conductor_nombre` varchar(20) NOT NULL,
  `conductor_papellido` varchar(20) NOT NULL,
  `conductor_mapellido` varchar(20) NOT NULL,
  `conductor_rut` varchar(10) NOT NULL,
  `conductor_nick` varchar(20) NOT NULL,
  `conductor_clave` varchar(20) NOT NULL,
  `conductor_estado` int(11) NOT NULL DEFAULT '0',
  `conductor_telefono` varchar(10) NOT NULL,
  `conductor_celular` varchar(20) NOT NULL,
  `conductor_direccion` varchar(50) NOT NULL,
  `conductor_mail` varchar(40) NOT NULL,
  `conductor_tipo_licencia` varchar(3) NOT NULL,
  `conductor_nacimiento` date NOT NULL,
  `conductor_renta` int(11) NOT NULL,
  `conductor_tipo_contrato` varchar(20) NOT NULL,
  `conductor_prevision` varchar(20) NOT NULL,
  `conductor_isapre` varchar(20) NOT NULL,
  `conductor_mutual` varchar(20) NOT NULL,
  `conductor_seguro_inicio` date NOT NULL,
  `conductor_seguro_renovacion` date NOT NULL,
  `conductor_descuento` int(11) NOT NULL,
  `conductor_anticipo` int(11) NOT NULL,
  `conductor_imagen` varchar(50) NOT NULL,
  `conductor_contrato` varchar(50) NOT NULL,
  `conductor_movil` varchar(11) NOT NULL,
  `conductor_transportista` int(11) NOT NULL,
  PRIMARY KEY (`conductor_id`),
  UNIQUE KEY `conductor_rut` (`conductor_rut`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=29 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_movil`
--

CREATE TABLE IF NOT EXISTS `tbl_movil` (
  `movil_id` int(11) NOT NULL AUTO_INCREMENT,
  `movil_nombre` varchar(20) NOT NULL,
  `movil_patente` varchar(10) NOT NULL,
  `movil_marca` varchar(20) NOT NULL,
  `movil_modelo` varchar(20) NOT NULL,
  `movil_anio` int(11) NOT NULL,
  `movil_venc_rev_tecnica` date NOT NULL,
  `movil_seguro_obligatorio` varchar(20) NOT NULL,
  `movil_venc_seguro_obligatorio` date NOT NULL,
  `movil_seguro_adicional` varchar(20) NOT NULL,
  `movil_kilometraje` int(7) NOT NULL,
  `movil_transportista` varchar(20) NOT NULL,
  `movil_estado` int(11) NOT NULL,
  `movil_lat` float NOT NULL,
  `movil_last_lat` float NOT NULL,
  `movil_lon` float NOT NULL,
  `movil_last_lon` float NOT NULL,
  `movil_conductor` varchar(20) NOT NULL,
  `movil_ultima_asignacion` datetime NOT NULL,
  `movil_servicio` varchar(10) NOT NULL,
  PRIMARY KEY (`movil_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_pasajero`
--

CREATE TABLE IF NOT EXISTS `tbl_pasajero` (
  `pasajero_id` int(11) NOT NULL AUTO_INCREMENT,
  `pasajero_rut` varchar(10) NOT NULL,
  `pasajero_nombre` varchar(20) NOT NULL,
  `pasajero_papellido` varchar(20) NOT NULL,
  `pasajero_mapellido` varchar(20) NOT NULL,
  `pasajero_cliente` int(11) NOT NULL,
  `pasajero_direccion` varchar(50) NOT NULL,
  `pasajero_telefono` varchar(20) NOT NULL,
  `pasajero_celular` varchar(20) NOT NULL,
  `pasajero_mail` varchar(50) NOT NULL,
  `pasajero_nick` varchar(20) NOT NULL,
  `pasajero_password` varchar(20) NOT NULL,
  `pasajero_estado` int(11) NOT NULL,
  `pasajero_cargo` varchar(20) NOT NULL,
  `pasajero_nivel` varchar(20) NOT NULL,
  PRIMARY KEY (`pasajero_id`),
  UNIQUE KEY `USUARIO_INDEX` (`pasajero_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `tbl_pasajero`
--

INSERT INTO `tbl_pasajero` (`pasajero_id`, `pasajero_rut`, `pasajero_nombre`, `pasajero_papellido`, `pasajero_mapellido`, `pasajero_cliente`, `pasajero_direccion`, `pasajero_telefono`, `pasajero_celular`, `pasajero_mail`, `pasajero_nick`, `pasajero_password`, `pasajero_estado`, `pasajero_cargo`, `pasajero_nivel`) VALUES
(1, '18079717-3', '1', '1', '1', 0, '1', '1', '1', '1@1.cl', '1', '1', 0, '1', '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_servicio`
--

CREATE TABLE IF NOT EXISTS `tbl_servicio` (
  `servicio_id` int(11) NOT NULL AUTO_INCREMENT,
  `servicio_partida` varchar(100) NOT NULL,
  `servicio_partida_id` varchar(200) NOT NULL,
  `servicio_destino` varchar(100) NOT NULL,
  `servicio_destino_id` varchar(200) NOT NULL,
  `servicio_cliente` varchar(20) NOT NULL,
  `servicio_usuario` varchar(20) NOT NULL,
  `servicio_transportista` varchar(20) NOT NULL,
  `servicio_movil` varchar(20) NOT NULL,
  `servicio_tipo` varchar(20) NOT NULL,
  `servicio_tarifa` int(11) NOT NULL,
  `servicio_agente` int(11) NOT NULL,
  `servicio_fecha` datetime NOT NULL,
  `servicio_estado` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`servicio_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10086 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_servicio_detalle`
--

CREATE TABLE IF NOT EXISTS `tbl_servicio_detalle` (
  `servicio_detalle_id` int(11) NOT NULL AUTO_INCREMENT,
  `servicio_detalle_servicio` int(11) NOT NULL,
  `servicio_detalle_lat` text NOT NULL,
  `servicio_detalle_lon` text NOT NULL,
  PRIMARY KEY (`servicio_detalle_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=63 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tarifa`
--

CREATE TABLE IF NOT EXISTS `tbl_tarifa` (
  `tarifa_id` int(11) NOT NULL AUTO_INCREMENT,
  `tarifa_nombre` varchar(20) NOT NULL,
  `tarifa_origen` varchar(100) NOT NULL,
  `tarifa_destino` varchar(100) NOT NULL,
  `tarifa_valor1` int(11) NOT NULL,
  `tarifa_valor2` int(11) NOT NULL,
  PRIMARY KEY (`tarifa_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_transportista`
--

CREATE TABLE IF NOT EXISTS `tbl_transportista` (
  `transportista_id` int(11) NOT NULL AUTO_INCREMENT,
  `transportista_nombre` varchar(20) NOT NULL,
  `transportista_razon_social` varchar(20) NOT NULL,
  `transportista_rut` varchar(12) NOT NULL,
  `transportista_direccion` varchar(50) NOT NULL,
  `transportista_nombre_contacto` varchar(30) NOT NULL,
  `transportista_fono_contacto` varchar(10) NOT NULL,
  `transportista_mail_contacto` varchar(50) NOT NULL,
  `transportista_mail_facturacion` varchar(50) NOT NULL,
  PRIMARY KEY (`transportista_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
