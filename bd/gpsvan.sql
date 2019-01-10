-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 10-01-2019 a las 05:38:50
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
  `agente_fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`agente_id`),
  UNIQUE KEY `agente_rut` (`agente_rut`),
  KEY `agente_nick` (`agente_nick`),
  KEY `agente_clave` (`agente_clave`),
  KEY `agente_rut_2` (`agente_rut`),
  KEY `agente_nombre` (`agente_nombre`),
  KEY `agente_papellido` (`agente_papellido`),
  KEY `agente_mapellido` (`agente_mapellido`),
  KEY `agente_mail` (`agente_mail`),
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `tbl_agente`
--

INSERT INTO `tbl_agente` (`agente_id`, `agente_nombre`, `agente_papellido`, `agente_mapellido`, `agente_rut`, `agente_nick`, `agente_clave`, `agente_telefono`, `agente_celular`, `agente_direccion`, `agente_mail`, `agente_cargo`, `agente_perfil`, `agente_fecha_creacion`) VALUES
(1, 'Usuario', 'Prueba', 'Prueba', '12911893-8', 'admin', 'admin', '1111111', '11111111', 'av las torres 123', 'prueba@prueba.cl', 'administrador', 'Administrador', '0000-00-00 00:00:00');

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
  `cliente_fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cliente_id`),
  KEY `cliente_rut` (`cliente_rut`),
  KEY `cliente_razon_social` (`cliente_razon_social`),
  KEY `cliente_tipo` (`cliente_tipo`),
  KEY `cliente_nombre_contacto` (`cliente_nombre_contacto`),
  KEY `cliente_mail_contacto` (`cliente_mail_contacto`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Volcado de datos para la tabla `tbl_cliente`
--

INSERT INTO `tbl_cliente` (`cliente_id`, `cliente_razon_social`, `cliente_tipo`, `cliente_rut`, `cliente_direccion`, `cliente_nombre_contacto`, `cliente_fono_contacto`, `cliente_mail_contacto`, `cliente_mail_facturacion`, `cliente_centro_costo`, `cliente_fecha_creacion`) VALUES
(24, 'Falabella SA', 'Convenio', '18079717-3', 'Av los toros 123', 'Jose Sanchez', '222222222', 'jsanchez@gmail.com', 'jsanchez@gmail.com', 'Principal', '0000-00-00 00:00:00'),
(25, 'Entel SA', 'Servicio especial', '19060607-4', 'Av las lilas 24', 'Juan Perez', '2345654323', 'entel@gmail.com', 'entel@gmail.com', 'Principal', '0000-00-00 00:00:00');

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
  `conductor_nacimiento` datetime DEFAULT NULL,
  `conductor_renta` int(11) NOT NULL,
  `conductor_tipo_contrato` varchar(20) NOT NULL,
  `conductor_prevision` varchar(20) NOT NULL,
  `conductor_isapre` varchar(20) NOT NULL,
  `conductor_mutual` varchar(20) NOT NULL,
  `conductor_seguro_inicio` datetime NOT NULL,
  `conductor_seguro_renovacion` datetime NOT NULL,
  `conductor_descuento` int(11) NOT NULL,
  `conductor_anticipo` int(11) NOT NULL,
  `conductor_imagen` varchar(50) NOT NULL,
  `conductor_contrato` varchar(50) NOT NULL,
  `conductor_movil` int(11) NOT NULL DEFAULT '0',
  `conductor_transportista` int(11) NOT NULL DEFAULT '0',
  `conductor_fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`conductor_id`),
  UNIQUE KEY `conductor_rut` (`conductor_rut`),
  KEY `conductor_nombre` (`conductor_nombre`),
  KEY `conductor_papellido` (`conductor_papellido`),
  KEY `conductor_mapellido` (`conductor_mapellido`),
  KEY `conductor_mail` (`conductor_mail`),
  KEY `conductor_nick` (`conductor_nick`),
  KEY `conductor_clave` (`conductor_clave`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=38 ;

--
-- Volcado de datos para la tabla `tbl_conductor`
--

INSERT INTO `tbl_conductor` (`conductor_id`, `conductor_nombre`, `conductor_papellido`, `conductor_mapellido`, `conductor_rut`, `conductor_nick`, `conductor_clave`, `conductor_estado`, `conductor_telefono`, `conductor_celular`, `conductor_direccion`, `conductor_mail`, `conductor_tipo_licencia`, `conductor_nacimiento`, `conductor_renta`, `conductor_tipo_contrato`, `conductor_prevision`, `conductor_isapre`, `conductor_mutual`, `conductor_seguro_inicio`, `conductor_seguro_renovacion`, `conductor_descuento`, `conductor_anticipo`, `conductor_imagen`, `conductor_contrato`, `conductor_movil`, `conductor_transportista`, `conductor_fecha_creacion`) VALUES
(29, 'Benjamn', 'Gonzalez', 'MuÃ±oz', '17776140-0', 'bgonzalez', 'bgonzalez', 0, '2234343333', '895545333', 'Av las condes 123', 'bgonzales@gmail.com', 'A1', '1970-01-01 03:00:00', 500000, 'Indefinido', 'Modelo', 'BanmÃ©dica', '10', '0000-00-00 00:00:00', '2019-02-12 00:00:00', 20, 0, 'hombre.png', '', 23, 11, '2018-12-26 20:58:35'),
(30, 'Marta', 'Sanchez', 'Vergara', '5478515-1', 'msanchez', 'msanchez', 0, '222222222', '987654321', 'Av suiza 123', 'marta@gmail.com', 'A2', '1998-12-11 03:00:00', 500000, 'Plazo fijo', 'Capital', 'Colmena Golden Cross', '10', '0000-00-00 00:00:00', '2018-12-04 00:00:00', 12, 9000, 'mujer.png', '', 0, 0, '2018-12-26 20:58:35'),
(31, 'Osvaldo', 'Matinez', 'Osores', '8154148-5', 'omartinez', 'omartinez', 0, '223434322', '98554522', 'Av mirador 33', 'osv@gmail.com', 'B', '1970-01-01 03:00:00', 100000, 'Plazo fijo', 'Capital', 'BanmÃ©dica', '78', '0000-00-00 00:00:00', '2018-12-12 00:00:00', 89, 6666, 'hombre.png', '', 22, 11, '2018-12-26 20:58:35'),
(32, 'Natalia', 'Soto', 'Peralta', '10083957-1', 'nsoto', 'nsoto', 0, '', '98763454', 'Av peru 543', 'nsoto@entel.cl', 'A3', '1970-01-01 03:00:00', 80000, 'Indefinido', 'Modelo', 'BanmÃ©dica', '88', '0000-00-00 00:00:00', '2018-12-07 00:00:00', 7, 7000, 'mujer.png', '', 22, 0, '2018-12-26 20:58:35'),
(33, 'Manuel', 'Guerra', 'Martinez', '23799224-5', 'mguerra', 'mguerra', 0, '223333333', '987655555', 'Av los presidentes 123', 'mguerra@gmail.com', 'A1', '2018-12-09 03:00:00', 120000, 'Indefinido', 'Modelo', 'BanmÃ©dica', '100', '0000-00-00 00:00:00', '2018-12-12 00:00:00', 45, 5000, 'hombre.png', '', 28, 0, '2018-12-26 20:58:35'),
(34, 'Nicole', 'Matta', 'Matta', '17321421-9', 'nmatta', 'nmatta', 0, '', '987654321', 'Av fuzeta 222', 'nmatta@gmail.com', 'A3', '1970-01-01 03:00:00', 100000, 'Indefinido', 'Modelo', 'BanmÃ©dica', '22', '0000-00-00 00:00:00', '1970-01-01 00:00:00', 22, 5000, 'mujer.png', '', 26, 0, '2018-12-26 20:58:35'),
(35, 'Ricardo', 'Lopez', 'Bas', '17576554-9', 'rlopez', 'rlopez', 0, '2233343434', '98765666', 'Av las rejas 234', 'rlopez@gmail.com', 'A2', '1970-01-01 03:00:00', 40000, 'Indefinido', 'Modelo', 'BanmÃ©dica', '2', '0000-00-00 00:00:00', '1970-01-01 00:00:00', 45, 6000, 'hombre.png', '', 28, 0, '2018-12-26 20:58:35'),
(37, 'Mauel', 'Soto', 'Vegara', '13814267-1', 'msoto', 'msoto', 0, '224444444', '9875555434', 'Av los valles', 'msoto@gmail.com', 'A1', '1970-01-01 03:00:00', 1000, 'Indefinido', 'Modelo', 'Colmena Golden Cross', '3', '0000-00-00 00:00:00', '1970-01-01 00:00:00', 45, 60000, 'hombre.png', '', 0, 0, '2018-12-26 20:58:35');

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
  `movil_color` varchar(20) NOT NULL,
  `movil_cantidad` int(11) NOT NULL,
  `movil_clase` varchar(40) NOT NULL,
  `movil_per_circ` datetime NOT NULL,
  `movil_venc_rev_tecnica` datetime NOT NULL,
  `movil_venc_ext` datetime NOT NULL,
  `movil_kilometraje` int(11) NOT NULL,
  `movil_motor` int(11) NOT NULL,
  `movil_chasis` int(11) NOT NULL,
  `movil_seguro_obligatorio` varchar(20) NOT NULL,
  `movil_venc_seguro_obligatorio` datetime NOT NULL,
  `movil_pol_seguro_obligatorio` int(11) NOT NULL,
  `movil_seguro_rcdm` varchar(10) NOT NULL,
  `movil_venc_seguro_rcdm` datetime NOT NULL,
  `movil_pol_seguro_rcdm` int(11) NOT NULL,
  `movil_transportista` varchar(20) NOT NULL,
  `movil_estado` int(11) NOT NULL,
  `movil_lat` float NOT NULL,
  `movil_last_lat` float NOT NULL,
  `movil_lon` float NOT NULL,
  `movil_last_lon` float NOT NULL,
  `movil_ultima_asignacion` datetime NOT NULL,
  `movil_servicio` varchar(10) NOT NULL,
  `movil_fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`movil_id`),
  KEY `movil_patente` (`movil_patente`),
  KEY `movil_nombre` (`movil_nombre`),
  KEY `movil_marca` (`movil_marca`),
  KEY `movil_modelo` (`movil_modelo`),
  KEY `movil_anio` (`movil_anio`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=33 ;

--
-- Volcado de datos para la tabla `tbl_movil`
--

INSERT INTO `tbl_movil` (`movil_id`, `movil_nombre`, `movil_patente`, `movil_marca`, `movil_modelo`, `movil_anio`, `movil_color`, `movil_cantidad`, `movil_clase`, `movil_per_circ`, `movil_venc_rev_tecnica`, `movil_venc_ext`, `movil_kilometraje`, `movil_motor`, `movil_chasis`, `movil_seguro_obligatorio`, `movil_venc_seguro_obligatorio`, `movil_pol_seguro_obligatorio`, `movil_seguro_rcdm`, `movil_venc_seguro_rcdm`, `movil_pol_seguro_rcdm`, `movil_transportista`, `movil_estado`, `movil_lat`, `movil_last_lat`, `movil_lon`, `movil_last_lon`, `movil_ultima_asignacion`, `movil_servicio`, `movil_fecha_creacion`) VALUES
(22, 'M101', 'XXXX-00', 'Chevrolet', 'Camario', 2018, 'Morado', 0, 'ddddd', '1970-01-01 00:00:00', '1970-01-01 00:00:00', '1970-01-01 00:00:00', 0, 1, 1, 'NO', '2018-12-04 00:00:00', 1, 'NO', '1970-01-01 00:00:00', 1, '0', 1, -33.4437, 0, -70.657, 0, '2018-12-23 14:06:46', '0', '0000-00-00 00:00:00'),
(23, 'M102', 'XXXX-01', 'Audi', 'R8', 2018, 'Verde', 0, 'dddd', '1970-01-01 00:00:00', '2018-12-04 00:00:00', '1970-01-01 00:00:00', 0, 0, 0, 'NO', '1970-01-01 00:00:00', 0, 'NO', '1970-01-01 00:00:00', 0, '0', 0, 0, 0, 0, 0, '2018-12-23 14:09:27', '0', '0000-00-00 00:00:00'),
(24, 'M201', 'XXXX-02', 'Mercedes', 'Clase C', 2018, '', 0, '', '0000-00-00 00:00:00', '1970-01-01 00:00:00', '0000-00-00 00:00:00', 0, 0, 0, 'Municipal', '2018-06-12 00:00:00', 0, '', '0000-00-00 00:00:00', 0, '0', 0, 0, 0, 0, 0, '2018-12-23 14:10:07', '0', '0000-00-00 00:00:00'),
(25, 'M202', 'XXXX-03', 'Hyundai', 'Accent', 2018, '', 0, '', '0000-00-00 00:00:00', '1970-01-01 00:00:00', '0000-00-00 00:00:00', 0, 0, 0, 'Privado', '2018-11-12 00:00:00', 0, '', '0000-00-00 00:00:00', 0, '0', 0, 0, 0, 0, 0, '2018-12-23 14:10:55', '0', '0000-00-00 00:00:00'),
(26, 'M301', 'XXXX-04', 'Chevrolet', 'Sail', 2019, 'Cafe', 0, 'FF', '1970-01-01 00:00:00', '1970-01-01 00:00:00', '1970-01-01 00:00:00', 0, 0, 0, 'NO', '2018-12-11 00:00:00', 0, 'NO', '1970-01-01 00:00:00', 0, '0', 0, 0, 0, 0, 0, '2018-12-23 14:11:42', '0', '0000-00-00 00:00:00'),
(27, 'M302', 'XXXX-05', 'Ford', 'Fiesta', 2018, '', 0, '', '0000-00-00 00:00:00', '1970-01-01 00:00:00', '0000-00-00 00:00:00', 0, 0, 0, 'NO', '2018-04-12 00:00:00', 0, '', '0000-00-00 00:00:00', 0, '0', 0, 0, 0, 0, 0, '2018-12-23 14:13:01', '0', '0000-00-00 00:00:00'),
(28, 'M401', 'XXXX-06', 'Kia', 'Rio', 2018, 'Verde', 0, 'fff', '1970-01-01 00:00:00', '2018-12-03 00:00:00', '1970-01-01 00:00:00', 0, 0, 0, 'NO', '2018-12-04 00:00:00', 0, 'NO', '1970-01-01 00:00:00', 0, '0', 0, 0, 0, 0, 0, '2018-12-23 14:21:25', '0', '0000-00-00 00:00:00');

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
  `pasajero_cliente` int(11) NOT NULL DEFAULT '0',
  `pasajero_direccion` varchar(50) NOT NULL,
  `pasajero_telefono` varchar(20) NOT NULL,
  `pasajero_celular` varchar(20) NOT NULL,
  `pasajero_mail` varchar(50) NOT NULL,
  `pasajero_nick` varchar(20) NOT NULL,
  `pasajero_password` varchar(20) NOT NULL,
  `pasajero_estado` int(11) NOT NULL DEFAULT '0',
  `pasajero_cargo` varchar(20) NOT NULL,
  `pasajero_nivel` varchar(20) NOT NULL,
  `pasajero_fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pasajero_centro_costo` varchar(40) NOT NULL,
  `pasajero_empresa` varchar(40) NOT NULL,
  `pasajero_ruta` varchar(40) NOT NULL,
  PRIMARY KEY (`pasajero_id`),
  UNIQUE KEY `USUARIO_INDEX` (`pasajero_id`),
  KEY `pasajero_nick` (`pasajero_nick`),
  KEY `pasajero_password` (`pasajero_password`),
  KEY `pasajero_rut` (`pasajero_rut`),
  KEY `pasajero_nombre` (`pasajero_nombre`),
  KEY `pasajero_papellido` (`pasajero_papellido`),
  KEY `pasajero_mapellido` (`pasajero_mapellido`),
  KEY `pasajero_mail` (`pasajero_mail`),
  KEY `pasajero_cliente` (`pasajero_cliente`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Volcado de datos para la tabla `tbl_pasajero`
--

INSERT INTO `tbl_pasajero` (`pasajero_id`, `pasajero_rut`, `pasajero_nombre`, `pasajero_papellido`, `pasajero_mapellido`, `pasajero_cliente`, `pasajero_direccion`, `pasajero_telefono`, `pasajero_celular`, `pasajero_mail`, `pasajero_nick`, `pasajero_password`, `pasajero_estado`, `pasajero_cargo`, `pasajero_nivel`, `pasajero_fecha_creacion`, `pasajero_centro_costo`, `pasajero_empresa`, `pasajero_ruta`) VALUES
(1, '18079717-3', 'Jose', 'Sanchez', 'Sandoval', 24, 'Av ap 123', '', '981755792', 'jose@jose.cl', 'jsanchez', 'jsanchez', 0, 'Ayudante', '0', '0000-00-00 00:00:00', '', '', ''),
(2, '19060607-4', 'Manuel', 'Soto', 'Vergara', 24, 'Av los valles 123', '2222433333', '9545454544', 'msoto@gmail.com', 'msoto', 'msoto', 0, 'Ayudante', '0', '0000-00-00 00:00:00', '', '', ''),
(3, '5786406-0', 'Miguel', 'Soto', 'Vasquez', 25, 'Av uno 23', '', '987654321', 'msoto@gmail.com', 'msotot', 'msotot', 0, 'Ayudante', '0', '0000-00-00 00:00:00', '', '', ''),
(4, '16696991-3', 'Maria', 'Gonzalez', 'Gonzalez', 25, 'Av los mastiles 123', '', '987678765', 'mgonzalez@hotmail.com', 'mgonzalez', 'mgonzalez', 0, 'Ayudante', '0', '0000-00-00 00:00:00', '', '', ''),
(5, '24297677-0', 'Juan', 'Torres', 'Torres', 0, 'Av las torres 123', '', '9888888', 'jtorres@gmail.com', 'jtorres', 'jtorres', 0, 'Ayudante', '0', '0000-00-00 00:00:00', '', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_servicio`
--

CREATE TABLE IF NOT EXISTS `tbl_servicio` (
  `servicio_id` int(11) NOT NULL AUTO_INCREMENT,
  `servicio_partida` varchar(100) NOT NULL,
  `servicio_hora_partida` datetime NOT NULL,
  `servicio_destino` varchar(100) NOT NULL,
  `servicio_hora_destino` datetime NOT NULL,
  `servicio_cliente` varchar(20) NOT NULL,
  `servicio_usuario` varchar(20) NOT NULL,
  `servicio_transportista` varchar(20) NOT NULL,
  `servicio_movil` varchar(20) NOT NULL,
  `servicio_tipo` varchar(20) NOT NULL,
  `servicio_tarifa` int(11) NOT NULL,
  `servicio_agente` int(11) NOT NULL,
  `servicio_fecha` datetime NOT NULL,
  `servicio_estado` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`servicio_id`),
  KEY `servicio_id` (`servicio_id`),
  KEY `servicio_partida` (`servicio_partida`),
  KEY `servicio_hora_partida` (`servicio_hora_partida`),
  KEY `servicio_destino` (`servicio_destino`),
  KEY `servicio_cliente` (`servicio_cliente`),
  KEY `servicio_usuario` (`servicio_usuario`),
  KEY `servicio_transportista` (`servicio_transportista`),
  KEY `servicio_movil` (`servicio_movil`),
  KEY `servicio_fecha` (`servicio_fecha`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10107 ;

--
-- Volcado de datos para la tabla `tbl_servicio`
--

INSERT INTO `tbl_servicio` (`servicio_id`, `servicio_partida`, `servicio_hora_partida`, `servicio_destino`, `servicio_hora_destino`, `servicio_cliente`, `servicio_usuario`, `servicio_transportista`, `servicio_movil`, `servicio_tipo`, `servicio_tarifa`, `servicio_agente`, `servicio_fecha`, `servicio_estado`) VALUES
(10106, 'Doctor Sotero del RÃ­o, Santiago, Chile', '0000-00-00 00:00:00', 'TarapacÃ¡, Santiago, Chile', '0000-00-00 00:00:00', 'Falabella SA', 'Jose Sanchez', 'T100', 'Independiente', 'Recogida', 0, 1, '2019-01-06 11:03:37', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_servicio_detalle`
--

CREATE TABLE IF NOT EXISTS `tbl_servicio_detalle` (
  `servicio_detalle_id` int(11) NOT NULL AUTO_INCREMENT,
  `servicio_detalle_servicio` int(11) NOT NULL,
  `servicio_detalle_lat` text NOT NULL,
  `servicio_detalle_lon` text NOT NULL,
  PRIMARY KEY (`servicio_detalle_id`),
  KEY `servicio_detalle_servicio` (`servicio_detalle_servicio`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=79 ;

--
-- Volcado de datos para la tabla `tbl_servicio_detalle`
--

INSERT INTO `tbl_servicio_detalle` (`servicio_detalle_id`, `servicio_detalle_servicio`, `servicio_detalle_lat`, `servicio_detalle_lon`) VALUES
(75, 10103, '-33.44089,-33.44201,-33.4426,-33.44275,-33.44286,-33.44173,-33.44086,-33.44036,-33.44022,-33.43956,-33.43824,-33.43678,-33.43659,-33.43601,-33.43583,-33.43575,-33.4355,-33.43469,-33.4328,-33.43204,-33.43173,-33.43146,-33.43082,-33.43033,-33.4299,-33.42972,-33.4295,-33.4294,-33.42936,-33.4293,-33.42922,-33.42921,-33.42921,-33.42929,-33.42935,-33.42938,-33.42962,-33.42978,-33.42986,-33.43004,-33.43018,-33.43041,-33.43065,-33.43079,-33.43106,-33.43114,-33.43134,-33.43158,-33.43196,-33.43285,-33.43341,-33.43385,-33.43436,-33.4357,-33.43606,-33.43611,-33.43612,-33.43611,-33.43605,-33.43598,-33.43571,-33.4354,-33.43506,-33.43469,-33.43369,-33.43325,-33.43242,-33.43171,-33.43105,-33.4305,-33.42966,-33.42941,-33.42883,-33.42822,-33.42657,-33.42596,-33.42536,-33.42506,-33.42468,-33.42414,-33.42345,-33.42301,-33.42271,-33.4224,-33.42191,-33.42117,-33.42101,-33.42059,-33.41972,-33.41958,-33.41933,-33.41909,-33.41823,-33.41674,-33.41617,-33.41586,-33.41526,-33.41501,-33.41453,-33.41348,-33.41241,-33.41182,-33.41171,-33.41162,-33.4109,-33.40955,-33.40929,-33.40805,-33.40619,-33.4041,-33.40369,-33.40335,-33.4028,-33.40179,-33.4014,-33.40098,-33.3995,-33.39854,-33.39708,-33.39647,-33.39605,-33.39573,-33.39539,-33.39364,-33.39312,-33.39269,-33.3921,-33.39157,-33.39125,-33.39082,-33.39021,-33.3893,-33.38903,-33.38885,-33.38813,-33.38774,-33.3876,-33.38677,-33.38639,-33.38567,-33.38514,-33.38492,-33.38454,-33.38341,-33.3828,-33.38266,-33.38244,-33.38227,-33.3821,-33.38206,-33.38192,-33.38115,-33.38076,-33.38044,-33.37989,-33.37907,-33.37866,-33.37865,-33.3785,-33.37823,-33.37817,-33.3781,-33.37799,-33.37776,-33.37765,-33.37754,-33.37741,-33.37731,-33.37732,-33.37733,-33.37736,-33.37742,-33.37744,-33.37746,-33.3776,-33.37766,-33.37839,-33.37854,-33.37871,-33.37873,-33.37878,-33.37886,-33.37898,-33.37911,-33.3792,-33.37929,-33.37931,-33.37931,-33.37931,-33.37959,-33.37986,-33.38056,-33.38115,-33.38133,-33.38181,-33.38218,-33.38275,-33.38359,-33.3845,-33.38516,-33.38534,-33.38554,-33.38543,-33.38524,-33.38511,', '-70.6579,-70.65773,-70.65768,-70.65901,-70.65995,-70.65974,-70.65946,-70.65932,-70.65931,-70.65937,-70.65955,-70.65975,-70.65986,-70.65993,-70.65996,-70.65997,-70.66008,-70.66021,-70.66052,-70.66076,-70.6609,-70.66105,-70.66138,-70.6616,-70.66181,-70.66193,-70.66196,-70.66199,-70.662,-70.66199,-70.66193,-70.66189,-70.66181,-70.66156,-70.66137,-70.66107,-70.66043,-70.65976,-70.65926,-70.65844,-70.65806,-70.65754,-70.65711,-70.65688,-70.65631,-70.65613,-70.65557,-70.65453,-70.65282,-70.64909,-70.64671,-70.64475,-70.64241,-70.6368,-70.63535,-70.63513,-70.63466,-70.63424,-70.63367,-70.63337,-70.63265,-70.63194,-70.63124,-70.63049,-70.62846,-70.62784,-70.62686,-70.62612,-70.6255,-70.62507,-70.62452,-70.62435,-70.62405,-70.62378,-70.62329,-70.62301,-70.62274,-70.62257,-70.62229,-70.62182,-70.62098,-70.62028,-70.61963,-70.61883,-70.61709,-70.61457,-70.61392,-70.61302,-70.61176,-70.61157,-70.61119,-70.6109,-70.60996,-70.60853,-70.60809,-70.60792,-70.60763,-70.60753,-70.6074,-70.60721,-70.60697,-70.60681,-70.60684,-70.60682,-70.60653,-70.60592,-70.60582,-70.60537,-70.60477,-70.60408,-70.60397,-70.60392,-70.60395,-70.60412,-70.60421,-70.60427,-70.60434,-70.60436,-70.60436,-70.6043,-70.6042,-70.60407,-70.6039,-70.60288,-70.60253,-70.60228,-70.60185,-70.60137,-70.60106,-70.60052,-70.59975,-70.59861,-70.59818,-70.59792,-70.59693,-70.59645,-70.59627,-70.59521,-70.59471,-70.59381,-70.59318,-70.59287,-70.59239,-70.59099,-70.5902,-70.58997,-70.58958,-70.58916,-70.58858,-70.58841,-70.58756,-70.5821,-70.57946,-70.57803,-70.57619,-70.57411,-70.57303,-70.5729,-70.57234,-70.57148,-70.57132,-70.5712,-70.57116,-70.57113,-70.57113,-70.57111,-70.57101,-70.57087,-70.57049,-70.5703,-70.57007,-70.57,-70.56995,-70.56992,-70.56974,-70.56971,-70.56957,-70.56958,-70.56962,-70.56966,-70.56972,-70.56978,-70.56981,-70.56979,-70.56973,-70.56959,-70.56945,-70.56938,-70.56936,-70.5691,-70.56905,-70.56895,-70.56888,-70.56886,-70.56892,-70.56905,-70.5693,-70.56963,-70.57001,-70.57028,-70.57037,-70.57045,-70.5695,-70.56794,-70.56699,'),
(76, 10104, '-33.44089,-33.44145,-33.44129,-33.44014,-33.43905,-33.43899,-33.43894,-33.43888,-33.43882,', '-70.6579,-70.65782,-70.65632,-70.6565,-70.65673,-70.65626,-70.6556,-70.65511,-70.65459,'),
(77, 10105, '-33.44388,-33.444,-33.44421,-33.44447,-33.44467,-33.44479,-33.44517,-33.44576,-33.44527,-33.4447,-33.44357,-33.44242,-33.44187,-33.44129,-33.44014,-33.43905,-33.43899,-33.43894,-33.43881,-33.43863,-33.43846,-33.43843,-33.43839,', '-70.65098,-70.65158,-70.65297,-70.65425,-70.65528,-70.6556,-70.65734,-70.65727,-70.65544,-70.65563,-70.65587,-70.65609,-70.65621,-70.65632,-70.6565,-70.65673,-70.65626,-70.6556,-70.6545,-70.6525,-70.65109,-70.65089,-70.65035,'),
(78, 10106, '-33.43882,-33.43875,-33.43848,-33.43844,-33.43831,-33.43822,-33.43934,-33.44023,-33.44063,-33.44169,-33.44294,-33.44322,-33.4431,-33.44319,-33.44461,-33.44531,-33.44667,-33.44719,', '-70.65459,-70.65386,-70.65114,-70.65098,-70.64927,-70.64834,-70.64817,-70.64808,-70.648,-70.64786,-70.64768,-70.64764,-70.64714,-70.64713,-70.64709,-70.64703,-70.647,-70.64973,');

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
  `tarifa_fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tarifa_cliente` varchar(40) NOT NULL,
  `tarifa_ruta` varchar(40) NOT NULL,
  PRIMARY KEY (`tarifa_id`),
  KEY `tarifa_nombre` (`tarifa_nombre`),
  KEY `tarifa_origen` (`tarifa_origen`),
  KEY `tarifa_destino` (`tarifa_destino`),
  KEY `tarifa_valor1` (`tarifa_valor1`),
  KEY `tarifa_valor2` (`tarifa_valor2`),
  KEY `tarifa_cliente` (`tarifa_cliente`),
  KEY `tarifa_ruta` (`tarifa_ruta`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `tbl_tarifa`
--

INSERT INTO `tbl_tarifa` (`tarifa_id`, `tarifa_nombre`, `tarifa_origen`, `tarifa_destino`, `tarifa_valor1`, `tarifa_valor2`, `tarifa_fecha_creacion`, `tarifa_cliente`, `tarifa_ruta`) VALUES
(1, 'Tarifa 1', 'Av 1', 'Av 2', 1200, 3000, '0000-00-00 00:00:00', '', '');

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
  `transportista_fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transportista_id`),
  KEY `transportista_nombre` (`transportista_nombre`),
  KEY `transportista_rut` (`transportista_rut`),
  KEY `transportista_razon_social` (`transportista_razon_social`),
  KEY `transportista_nombre_contacto` (`transportista_nombre_contacto`),
  KEY `transportista_mail_contacto` (`transportista_mail_contacto`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Volcado de datos para la tabla `tbl_transportista`
--

INSERT INTO `tbl_transportista` (`transportista_id`, `transportista_nombre`, `transportista_razon_social`, `transportista_rut`, `transportista_direccion`, `transportista_nombre_contacto`, `transportista_fono_contacto`, `transportista_mail_contacto`, `transportista_mail_facturacion`, `transportista_fecha_creacion`) VALUES
(11, 'T100', 'Transportas Soto', '17776140-0', 'Av las torres 123', 'Jose Soto', '22333443', 'tsoto@gmail.com', 'tsoto@gmail.com', '0000-00-00 00:00:00'),
(12, 'T200', 'Transportes lopez', '18079717-3', 'Av santa amalia 123', 'Maria Gonzalez', '9232454555', 'mgonzalez@hotmail.cl', 'mgonzalez@hotmail.cl', '0000-00-00 00:00:00'),
(14, 'T300', 'Transportes Silva', '21808427-3', 'Av las lilas 123', 'Juan Perez', '9876767676', 'contacto@silva.cl', 'factura@silva.cl', '0000-00-00 00:00:00'),
(15, 'T400', 'Transportes Donoso', '20912998-1', 'Av jose perez 342', 'Marco Donoso', '5443432222', 'mdonoso@travel.cl', 'pdonoso@travel.cl', '0000-00-00 00:00:00');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
