-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 10-01-2019 a las 23:56:17
-- Versión del servidor: 5.7.23
-- Versión de PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gpsvan`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_agente`
--

DROP TABLE IF EXISTS `tbl_agente`;
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
  UNIQUE KEY `agente_rut` (`agente_rut`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbl_agente`
--

INSERT INTO `tbl_agente` (`agente_id`, `agente_nombre`, `agente_papellido`, `agente_mapellido`, `agente_rut`, `agente_nick`, `agente_clave`, `agente_telefono`, `agente_celular`, `agente_direccion`, `agente_mail`, `agente_cargo`, `agente_perfil`, `agente_fecha_creacion`) VALUES
(1, 'Usuario', 'Prueba', 'Prueba', '12911893-8', 'admin', 'admin', '1111111', '11111111', 'av las torres 123', 'prueba@prueba.cl', 'administrador', '', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_cliente`
--

DROP TABLE IF EXISTS `tbl_cliente`;
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
  PRIMARY KEY (`cliente_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbl_cliente`
--

INSERT INTO `tbl_cliente` (`cliente_id`, `cliente_razon_social`, `cliente_tipo`, `cliente_rut`, `cliente_direccion`, `cliente_nombre_contacto`, `cliente_fono_contacto`, `cliente_mail_contacto`, `cliente_mail_facturacion`, `cliente_centro_costo`, `cliente_fecha_creacion`) VALUES
(25, 'Entel SA', 'Servicio especia', '19060607-4', 'Av las lilas 24', 'Juan Perez', '2345654323', 'entel@gmail.com', 'entel@gmail.com', 'Principal', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_conductor`
--

DROP TABLE IF EXISTS `tbl_conductor`;
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
  UNIQUE KEY `conductor_rut` (`conductor_rut`)
) ENGINE=MyISAM AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbl_conductor`
--

INSERT INTO `tbl_conductor` (`conductor_id`, `conductor_nombre`, `conductor_papellido`, `conductor_mapellido`, `conductor_rut`, `conductor_nick`, `conductor_clave`, `conductor_estado`, `conductor_telefono`, `conductor_celular`, `conductor_direccion`, `conductor_mail`, `conductor_tipo_licencia`, `conductor_nacimiento`, `conductor_renta`, `conductor_tipo_contrato`, `conductor_prevision`, `conductor_isapre`, `conductor_mutual`, `conductor_seguro_inicio`, `conductor_seguro_renovacion`, `conductor_descuento`, `conductor_anticipo`, `conductor_imagen`, `conductor_contrato`, `conductor_movil`, `conductor_transportista`, `conductor_fecha_creacion`) VALUES
(29, 'Benjamin', 'Gonzalez', 'MuÃ±oz', '17776140-0', 'bgonzalez', 'bgonzalez', 0, '2234343333', '895545333', 'Av las condes 123', 'bgonzales@gmail.com', 'A1', '2018-08-10 00:00:00', 500000, 'Indefinido', 'Modelox', 'BanmÃ©dica', '10', '2019-01-22 00:00:00', '2019-02-10 00:00:00', 20, 0, '', '', 22, 11, '2018-12-26 20:58:35'),
(30, 'Marta', 'Sanchez', 'Vergara', '5478515-1', 'msanchez', 'msanchez', 0, '222222222', '987654321', 'Av suiza 123', 'marta@gmail.com', 'A2', '2018-12-10 00:00:00', 500000, 'Plazo fijo', 'Capital', 'Colmena Golden Cross', '10', '2019-01-22 00:00:00', '2018-12-04 00:00:00', 12, 9000, '', '', 0, 0, '2018-12-26 20:58:35'),
(31, 'Osvaldo', 'Matinez', 'Osores', '8154148-5', 'omartinez', 'omartinez', 0, '223434322', '98554522', 'Av mirador 33', 'osv@gmail.com', 'B', '1970-01-01 00:00:00', 100000, 'Plazo fijo', 'Capital', 'BanmÃ©dica', '78', '2019-01-22 00:00:00', '2019-02-10 00:00:00', 89, 6666, '', '', 0, 11, '2018-12-26 20:58:35'),
(32, 'Natalia', 'Soto', 'Peralta', '10083957-1', 'nsoto', 'nsoto', 0, '', '98763454', 'Av peru 543', 'nsoto@entel.cl', 'A3', '1970-01-01 00:00:00', 80000, 'Indefinido', 'Modelo', 'BanmÃ©dica', '88', '2019-01-22 00:00:00', '2018-12-07 00:00:00', 7, 7000, '', '', 0, 0, '2018-12-26 20:58:35'),
(33, 'Manuel', 'Guerra', 'Martinez', '23799224-5', 'mguerra', 'mguerra', 0, '223333333', '987655555', 'Av los presidentes 123', 'mguerra@gmail.com', 'A1', '2018-12-09 00:00:00', 120000, 'Indefinido', 'Modelo', 'BanmÃ©dica', '100', '2019-01-22 00:00:00', '2018-12-12 00:00:00', 45, 5000, '', '', 23, 0, '2018-12-26 20:58:35'),
(34, 'Nicole', 'Matta', 'Matta', '17321421-9', 'nmatta', 'nmatta', 0, '', '987654321', 'Av fuzeta 222', 'nmatta@gmail.com', 'A3', '1970-01-01 00:00:00', 100000, 'Indefinido', 'Modelo', 'BanmÃ©dica', '22', '2019-01-22 00:00:00', '1970-01-01 00:00:00', 22, 5000, '', '', 0, 0, '2018-12-26 20:58:35'),
(35, 'Ricardo', 'Lopez', 'Baes', '17576554-9', 'rlopez', 'rlopez', 0, '2233343434', '98765666', 'Av las rejas 234', 'rlopez@gmail.com', 'A2', '1970-01-01 00:00:00', 40000, 'Indefinido', 'Modelo', 'BanmÃ©dica', '2', '2018-09-10 00:00:00', '1970-01-01 00:00:00', 45, 6000, '', '', 0, 0, '2018-12-26 20:58:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_movil`
--

DROP TABLE IF EXISTS `tbl_movil`;
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
  PRIMARY KEY (`movil_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbl_movil`
--

INSERT INTO `tbl_movil` (`movil_id`, `movil_nombre`, `movil_patente`, `movil_marca`, `movil_modelo`, `movil_anio`, `movil_color`, `movil_cantidad`, `movil_clase`, `movil_per_circ`, `movil_venc_rev_tecnica`, `movil_venc_ext`, `movil_kilometraje`, `movil_motor`, `movil_chasis`, `movil_seguro_obligatorio`, `movil_venc_seguro_obligatorio`, `movil_pol_seguro_obligatorio`, `movil_seguro_rcdm`, `movil_venc_seguro_rcdm`, `movil_pol_seguro_rcdm`, `movil_transportista`, `movil_estado`, `movil_lat`, `movil_last_lat`, `movil_lon`, `movil_last_lon`, `movil_ultima_asignacion`, `movil_servicio`, `movil_fecha_creacion`) VALUES
(22, 'M101', 'XXXX-00', 'Chevrolet', 'Camario', 2018, 'fff', 0, 'fff', '2027-04-15 00:00:00', '2011-01-18 00:00:00', '2026-01-28 00:00:00', 0, 0, 0, 'NO', '2018-04-12 00:00:00', 0, 'NO', '1970-01-01 00:00:00', 0, '0', 1, -33.4437, 0, -70.657, 0, '2018-12-23 14:06:46', '0', '0000-00-00 00:00:00'),
(23, 'M102', 'XXXX-01', 'Audi', 'R8', 2018, 'ggg', 0, 'ggg', '2019-01-06 00:00:00', '2018-04-12 00:00:00', '1970-01-01 00:00:00', 0, 0, 0, 'NO', '2019-01-10 00:00:00', 0, 'NO', '2019-01-10 00:00:00', 0, '0', 0, 0, 0, 0, 0, '2018-12-23 14:09:27', '0', '0000-00-00 00:00:00'),
(24, 'M201', 'XXXX-02', 'Mercedes', 'Clase C', 2018, 'Verde', 0, 'tyyy', '2009-11-02 00:00:00', '2019-01-10 00:00:00', '2019-01-10 00:00:00', 1, 0, 0, 'NO', '2018-12-06 00:00:00', 0, 'NO', '1970-01-01 00:00:00', 0, '0', 0, 0, 0, 0, 0, '2018-12-23 14:10:07', '0', '0000-00-00 00:00:00'),
(25, 'M202', 'XXXX-03', 'Hyundai', 'Accent', 2018, 'Negro', 0, 'gghghgh', '2016-01-01 00:00:00', '1970-01-01 00:00:00', '1970-01-01 00:00:00', 0, 0, 0, 'NO', '2018-11-12 00:00:00', 0, 'NO', '1970-01-01 00:00:00', 0, '0', 0, 0, 0, 0, 0, '2018-12-23 14:10:55', '0', '0000-00-00 00:00:00'),
(26, 'M301', 'XXXX-04', 'Chevrolet', 'Sail', 2019, 'Negro', 0, 'sdfgsg', '1970-01-01 00:00:00', '1970-01-01 00:00:00', '1970-01-01 00:00:00', 0, 0, 0, 'NO', '2023-12-15 00:00:00', 0, 'NO', '1970-01-01 00:00:00', 0, '0', 0, 0, 0, 0, 0, '2018-12-23 14:11:42', '0', '0000-00-00 00:00:00'),
(27, 'M302', 'XXXX-05', 'Ford', 'Fiesta', 2018, 'Dorado', 0, 'ttt', '2019-01-10 00:00:00', '2019-01-10 00:00:00', '2019-01-10 00:00:00', 0, 0, 0, 'NO', '2018-12-04 00:00:00', 0, 'NO', '1970-01-01 00:00:00', 0, '0', 0, 0, 0, 0, 0, '2018-12-23 14:13:01', '0', '0000-00-00 00:00:00'),
(28, 'M401', 'XXXX-06', 'Kia', 'Rio', 2018, 'Gris', 0, 'fgheh', '1970-01-01 00:00:00', '2018-12-03 00:00:00', '1970-01-01 00:00:00', 0, 0, 0, 'NO', '2018-12-04 00:00:00', 0, 'NO', '1970-01-01 00:00:00', 0, '0', 0, 0, 0, 0, 0, '2018-12-23 14:21:25', '0', '0000-00-00 00:00:00'),
(29, 'M402', 'XXXX-07', 'Renaultddd', 'Clio', 2018, 'Naranjo', 0, 'dfnhdn', '1970-01-01 00:00:00', '1970-01-01 00:00:00', '1970-01-01 00:00:00', 0, 0, 0, 'NO', '2018-12-12 00:00:00', 0, 'NO', '1970-01-01 00:00:00', 0, '0', 0, 0, 0, 0, 0, '2018-12-23 14:22:22', '0', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_pasajero`
--

DROP TABLE IF EXISTS `tbl_pasajero`;
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
  UNIQUE KEY `USUARIO_INDEX` (`pasajero_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbl_pasajero`
--

INSERT INTO `tbl_pasajero` (`pasajero_id`, `pasajero_rut`, `pasajero_nombre`, `pasajero_papellido`, `pasajero_mapellido`, `pasajero_cliente`, `pasajero_direccion`, `pasajero_telefono`, `pasajero_celular`, `pasajero_mail`, `pasajero_nick`, `pasajero_password`, `pasajero_estado`, `pasajero_cargo`, `pasajero_nivel`, `pasajero_fecha_creacion`, `pasajero_centro_costo`, `pasajero_empresa`, `pasajero_ruta`) VALUES
(2, '19060607-4', 'Manuel', 'Soto', 'Vergara', 25, 'Av los valles 123', '2222433333', '9545454544', 'msoto@gmail.com', 'msoto', 'msoto', 0, 'Ayudante', '0', '0000-00-00 00:00:00', '', '', ''),
(3, '5786406-0', 'Miguel', 'Soto', 'Vasquez', 25, 'Av uno 23', '', '987654321', 'msoto@gmail.com', 'msotot', 'msotot', 0, 'Ayudante', '0', '0000-00-00 00:00:00', '', '', ''),
(5, '24297677-0', 'Juan', 'Torres', 'Torres', 25, 'Av las torres 123', '', '9888888', 'jtorres@gmail.com', 'jtorres', 'jtorres', 0, 'Ayudante', '0', '0000-00-00 00:00:00', '', '', ''),
(6, '18079717-3', '1', '1', '1', 0, '1', '1', '1', '1@1.cl', '1', '1', 0, '1', '0', '2019-01-10 22:31:40', '1', '1', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_servicio`
--

DROP TABLE IF EXISTS `tbl_servicio`;
CREATE TABLE IF NOT EXISTS `tbl_servicio` (
  `servicio_id` int(11) NOT NULL AUTO_INCREMENT,
  `servicio_partida` varchar(100) NOT NULL,
  `servicio_hora_partida` datetime DEFAULT NULL,
  `servicio_destino` varchar(100) NOT NULL,
  `servicio_hora_destino` datetime DEFAULT NULL,
  `servicio_cliente` varchar(20) NOT NULL,
  `servicio_usuario` varchar(20) NOT NULL,
  `servicio_transportista` varchar(20) NOT NULL,
  `servicio_movil` varchar(20) NOT NULL,
  `servicio_tipo` varchar(20) NOT NULL,
  `servicio_tarifa` varchar(40) NOT NULL,
  `servicio_agente` int(11) NOT NULL,
  `servicio_fecha` datetime NOT NULL,
  `servicio_estado` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`servicio_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbl_servicio`
--

INSERT INTO `tbl_servicio` (`servicio_id`, `servicio_partida`, `servicio_hora_partida`, `servicio_destino`, `servicio_hora_destino`, `servicio_cliente`, `servicio_usuario`, `servicio_transportista`, `servicio_movil`, `servicio_tipo`, `servicio_tarifa`, `servicio_agente`, `servicio_fecha`, `servicio_estado`) VALUES
(4, 'Granados, Santiago, Chile', NULL, 'Universidad de Chile, Santiago, Chile', NULL, 'Entel SA', 'Manuel Soto', 'T200', 'M102', 'Recogida', 'Tarifa 1', 1, '2019-01-10 20:20:52', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_servicio_detalle`
--

DROP TABLE IF EXISTS `tbl_servicio_detalle`;
CREATE TABLE IF NOT EXISTS `tbl_servicio_detalle` (
  `servicio_detalle_id` int(11) NOT NULL AUTO_INCREMENT,
  `servicio_detalle_servicio` int(11) NOT NULL,
  `servicio_detalle_lat` text NOT NULL,
  `servicio_detalle_lon` text NOT NULL,
  PRIMARY KEY (`servicio_detalle_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbl_servicio_detalle`
--

INSERT INTO `tbl_servicio_detalle` (`servicio_detalle_id`, `servicio_detalle_servicio`, `servicio_detalle_lat`, `servicio_detalle_lon`) VALUES
(2, 4, '-33.44567,-33.44558,-33.44557,-33.44612,-33.44616,-33.44627,-33.44614,-33.44614,-33.44615,-33.44631,-33.44644,-33.44671,-33.44704,-33.44734,-33.44748,-33.44759,-33.44626,-33.44584,-33.44471,-33.44464,-33.44456,-33.44429,-33.44406,-33.44399,', '-70.64365,-70.64277,-70.64268,-70.64262,-70.643,-70.64403,-70.64447,-70.64453,-70.64464,-70.6453,-70.64588,-70.64721,-70.64885,-70.65061,-70.65144,-70.65231,-70.6526,-70.65269,-70.65284,-70.65285,-70.65248,-70.65153,-70.65093,-70.65072,');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tarifa`
--

DROP TABLE IF EXISTS `tbl_tarifa`;
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
  PRIMARY KEY (`tarifa_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbl_tarifa`
--

INSERT INTO `tbl_tarifa` (`tarifa_id`, `tarifa_nombre`, `tarifa_origen`, `tarifa_destino`, `tarifa_valor1`, `tarifa_valor2`, `tarifa_fecha_creacion`, `tarifa_cliente`, `tarifa_ruta`) VALUES
(1, 'Tarifa 1', 'Av 1', 'Av 2', 1200, 3000, '0000-00-00 00:00:00', 'Falabella', '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_transportista`
--

DROP TABLE IF EXISTS `tbl_transportista`;
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
  PRIMARY KEY (`transportista_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbl_transportista`
--

INSERT INTO `tbl_transportista` (`transportista_id`, `transportista_nombre`, `transportista_razon_social`, `transportista_rut`, `transportista_direccion`, `transportista_nombre_contacto`, `transportista_fono_contacto`, `transportista_mail_contacto`, `transportista_mail_facturacion`, `transportista_fecha_creacion`) VALUES
(11, 'T100', 'Transportas Soto', '17776140-0', 'Av las torres 123', 'Jose Soto', '22333443', 'tsoto@gmail.com', 'tsoto@gmail.com', '0000-00-00 00:00:00'),
(12, 'T200', 'Transportes lopez', '18079717-3', 'Av santa amalia 123', 'Maria Gonzalez', '9232454555', 'mgonzalez@hotmail.cl', 'mgonzalez@hotmail.cl', '0000-00-00 00:00:00'),
(14, 'T300', 'Transportes Silva', '21808427-3', 'Av las lilas 123', 'Juan Perez', '9876767676', 'contacto@silva.cl', 'factura@silva.cl', '0000-00-00 00:00:00'),
(15, 'T400', 'Transportes Donoso', '20912998-1', 'Av jose perez 342', 'Marco Donoso', '5443432222', 'mdonoso@travel.cl', 'pdonoso@travel.cl', '0000-00-00 00:00:00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
