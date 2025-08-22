-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-08-2025 a las 22:28:47
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `wave_sound1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `albumes`
--

CREATE TABLE `albumes` (
  `id_album` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `portada` varchar(255) DEFAULT NULL,
  `fecha_lanzamiento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `albumes`
--

INSERT INTO `albumes` (`id_album`, `id_usuario`, `titulo`, `descripcion`, `portada`, `fecha_lanzamiento`) VALUES
(1, 1, 'Sueños de Pop', 'Primer álbum de Yeral.', 'portada1.jpg', '2022-05-15'),
(2, 3, 'Vallenato Puro', 'Éxitos de Los Vallenatos.', 'portada2.jpg', '2021-08-20'),
(3, 5, 'Trap Callejero', 'Debut de Juanito.', 'portada3.jpg', '2023-01-10'),
(4, 7, 'Rock Alternativo', 'Sonido de Banda Norte.', 'portada4.jpg', '2020-11-05'),
(5, 9, 'Fusión Latina', 'Mezcla de géneros.', 'portada5.jpg', '2022-06-22'),
(6, 11, 'Cumbia Total', 'Lo mejor de la cumbia.', 'portada6.jpg', '2021-03-12'),
(7, 13, 'Pop Autoral', 'Primer álbum de Andrea.', 'portada7.jpg', '2023-09-01'),
(8, 15, 'Metal Oscuro', 'Sonido potente.', 'portada8.jpg', '2019-07-14'),
(9, 17, 'Flow Callejero', 'Trap de Santi.', 'portada9.jpg', '2022-12-03'),
(10, 19, 'Rock & Roll', 'Rock clásico.', 'portada10.jpg', '2020-04-18'),
(11, 21, 'Urbano con Flow', 'Lo mejor de PabloQ.', 'portada11.jpg', '2021-11-09'),
(12, 23, 'Vallenato del Sur', 'Sello propio.', 'portada12.jpg', '2023-02-17'),
(13, 25, 'Pop Juvenil', 'Primer álbum de Camila.', 'portada13.jpg', '2022-10-25'),
(14, 1, 'Más Pop', 'Segundo álbum de Yeral.', 'portada14.jpg', '2024-03-08'),
(15, 5, 'Trap 2.0', 'Nuevo EP de Juanito.', 'portada15.jpg', '2023-05-19'),
(16, 9, 'Ritmo Caribeño', 'Mezclas tropicales.', 'portada16.jpg', '2021-08-29'),
(17, 13, 'Canciones de Andrea', 'Más baladas pop.', 'portada17.jpg', '2022-01-22'),
(18, 17, 'Santi Flow Vol 2', 'Nuevo trap.', 'portada18.jpg', '2023-07-30'),
(19, 21, 'Urbano Deluxe', 'Versión especial.', 'portada19.jpg', '2022-11-14'),
(20, 25, 'Pop Dreams', 'Lo nuevo de Camila.', 'portada20.jpg', '2024-02-03'),
(21, 3, 'Vallenato Gold', 'Grandes éxitos.', 'portada21.jpg', '2023-04-09'),
(22, 7, 'Rock Extremo', 'Lo más pesado.', 'portada22.jpg', '2020-06-25'),
(23, 11, 'Cumbia Deluxe', 'Cumbia con estilo.', 'portada23.jpg', '2021-10-16'),
(24, 15, 'Metal Hardcore', 'Metal al límite.', 'portada24.jpg', '2019-09-12'),
(25, 19, 'Rock Total', 'Lo mejor del rock.', 'portada25.jpg', '2020-12-20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `canciones`
--

CREATE TABLE `canciones` (
  `id_cancion` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `titulo` varchar(50) DEFAULT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `id_genero` int(11) DEFAULT NULL,
  `id_album` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `canciones`
--

INSERT INTO `canciones` (`id_cancion`, `id_usuario`, `titulo`, `descripcion`, `id_genero`, `id_album`) VALUES
(1, 1, 'Sueño Pop', 'Canción debut de Yeral.', 1, 1),
(2, 3, 'Vallenato de Corazón', 'Clásico vallenato.', 9, 2),
(3, 5, 'Trap en la Calle', 'Flow urbano.', 7, 3),
(4, 7, 'Rock Alternativo', 'Sonido Banda Norte.', 2, 4),
(5, 9, 'Fusión Latina', 'Mezcla de géneros tropicales.', 4, 5),
(6, 11, 'Cumbia en Vivo', 'Ritmo bailable.', 8, 6),
(7, 13, 'Pop Autoral', 'Canción romántica.', 1, 7),
(8, 15, 'Metal al Máximo', 'Potencia musical.', 10, 8),
(9, 17, 'Flow Pesado', 'Trap directo.', 7, 9),
(10, 19, 'Rock & Roll', 'Clásico inmortal.', 2, 10),
(11, 21, 'Urbano Intenso', 'Reggaetón con estilo.', 3, 11),
(12, 23, 'Vallenato Romántico', 'Sello del sur.', 9, 12),
(13, 25, 'Pop Juvenil', 'Canción juvenil fresca.', 1, 13),
(14, 1, 'Pop en Vivo', 'Show en directo.', 1, 14),
(15, 5, 'Trap del Barrio', 'Estilo callejero.', 7, 15),
(16, 9, 'Caribe Mix', 'Ritmos caribeños.', 4, 16),
(17, 13, 'Pop Balada', 'Balada pop.', 1, 17),
(18, 17, 'Santi Flow', 'Nuevo trap.', 7, 18),
(19, 21, 'Reggaetón Deluxe', 'Reggaetón elegante.', 3, 19),
(20, 25, 'Pop Dreams', 'Pop soñado.', 1, 20),
(21, 3, 'Vallenato Dorado', 'Éxito vallenato.', 9, 21),
(22, 7, 'Rock Extremo', 'Rock fuerte.', 2, 22),
(23, 11, 'Cumbia Deluxe', 'Cumbia moderna.', 8, 23),
(24, 15, 'Metal Hardcore', 'Metal agresivo.', 10, 24),
(25, 19, 'Rock Total', 'Rock sin límites.', 2, 25),
(26, 1, 'Grunge Rebelde', 'Estilo Seattle', 26, NULL),
(27, 1, 'Balada Britpop', 'Sonido UK', 27, NULL),
(28, 1, 'Country de Mi Tierra', 'Estilo sureño', 28, NULL),
(29, 1, 'Dubstep Profundo', 'Beats electrónicos', 29, NULL),
(30, 1, 'Soul Sentimental', 'Estilo clásico', 30, NULL),
(31, 2, 'Trova Moderna', 'Estilo trovador', 31, NULL),
(32, 2, 'Zamba de Verano', 'Ritmo tradicional', 32, NULL),
(33, 2, 'Tango Callejero', 'Pasión argentina', 33, NULL),
(34, 2, 'Flamenco Fusión', 'Ritmo gitano', 34, NULL),
(35, 2, 'Trova Poética', 'Canción de autor', 35, NULL),
(36, 3, 'Huayno del Corazón', 'Folklore andino', 36, NULL),
(37, 3, 'Cueca del Alma', 'Tradición chilena', 37, NULL),
(38, 3, 'Andina Mística', 'Sonidos de los Andes', 38, NULL),
(39, 3, 'Samba Festiva', 'Ritmo brasileño', 39, NULL),
(40, 3, 'Bolero Romántico', 'Clásico latino', 40, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `derechos_autor`
--

CREATE TABLE `derechos_autor` (
  `id_registro` int(11) NOT NULL,
  `id_cancion` int(11) DEFAULT NULL,
  `nombre_autor` varchar(40) DEFAULT NULL,
  `porcentaje_royalties` decimal(5,2) DEFAULT NULL,
  `fecha_acuerdo` date DEFAULT NULL,
  `documento_legal` varchar(1000) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT NULL,
  `id_usuario_autor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documento_autor`
--

CREATE TABLE `documento_autor` (
  `id_documento` int(11) NOT NULL,
  `id_registro` int(11) DEFAULT NULL,
  `tipo_documento` varchar(50) DEFAULT NULL,
  `archivo_url` varchar(255) DEFAULT NULL,
  `fecha_subida` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genero_musical`
--

CREATE TABLE `genero_musical` (
  `id_genero` int(11) NOT NULL,
  `tipo_genero` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listas`
--

CREATE TABLE `listas` (
  `id_lista` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `nombre_lista` varchar(50) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `imagen_lista` varchar(100) DEFAULT NULL,
  `visibilidad` tinyint(1) DEFAULT 1,
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista_canciones`
--

CREATE TABLE `lista_canciones` (
  `id_lista` int(11) NOT NULL,
  `id_cancion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfiles`
--

CREATE TABLE `perfiles` (
  `id_perfil` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `nombre_artista` varchar(50) DEFAULT NULL,
  `biografia` varchar(100) DEFAULT NULL,
  `foto_perfil` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil_genero`
--

CREATE TABLE `perfil_genero` (
  `id_perfil` int(11) NOT NULL,
  `id_genero` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos_reproduccion`
--

CREATE TABLE `permisos_reproduccion` (
  `id_permiso` int(11) NOT NULL,
  `id_cancion` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `permiso` enum('permitido','bloqueado','pendiente') NOT NULL,
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reproducciones`
--

CREATE TABLE `reproducciones` (
  `id_reproduccion` int(11) NOT NULL,
  `id_cancion` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha_reproduccion` datetime DEFAULT NULL,
  `duracion` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `id_rol` int(11) DEFAULT NULL,
  `sobre_nombre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `albumes`
--
ALTER TABLE `albumes`
  ADD PRIMARY KEY (`id_album`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `canciones`
--
ALTER TABLE `canciones`
  ADD PRIMARY KEY (`id_cancion`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_genero` (`id_genero`),
  ADD KEY `id_album` (`id_album`);

--
-- Indices de la tabla `derechos_autor`
--
ALTER TABLE `derechos_autor`
  ADD PRIMARY KEY (`id_registro`),
  ADD KEY `id_usuario_autor` (`id_usuario_autor`),
  ADD KEY `id_cancion` (`id_cancion`);

--
-- Indices de la tabla `documento_autor`
--
ALTER TABLE `documento_autor`
  ADD PRIMARY KEY (`id_documento`),
  ADD KEY `id_registro` (`id_registro`);

--
-- Indices de la tabla `genero_musical`
--
ALTER TABLE `genero_musical`
  ADD PRIMARY KEY (`id_genero`);

--
-- Indices de la tabla `listas`
--
ALTER TABLE `listas`
  ADD PRIMARY KEY (`id_lista`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `lista_canciones`
--
ALTER TABLE `lista_canciones`
  ADD PRIMARY KEY (`id_lista`,`id_cancion`),
  ADD KEY `id_cancion` (`id_cancion`);

--
-- Indices de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  ADD PRIMARY KEY (`id_perfil`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `perfil_genero`
--
ALTER TABLE `perfil_genero`
  ADD PRIMARY KEY (`id_perfil`,`id_genero`),
  ADD KEY `id_genero` (`id_genero`);

--
-- Indices de la tabla `permisos_reproduccion`
--
ALTER TABLE `permisos_reproduccion`
  ADD PRIMARY KEY (`id_permiso`),
  ADD KEY `id_cancion` (`id_cancion`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `reproducciones`
--
ALTER TABLE `reproducciones`
  ADD PRIMARY KEY (`id_reproduccion`),
  ADD KEY `id_cancion` (`id_cancion`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`),
  ADD UNIQUE KEY `nombre_rol` (`nombre_rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `albumes`
--
ALTER TABLE `albumes`
  MODIFY `id_album` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `canciones`
--
ALTER TABLE `canciones`
  MODIFY `id_cancion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `derechos_autor`
--
ALTER TABLE `derechos_autor`
  MODIFY `id_registro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `documento_autor`
--
ALTER TABLE `documento_autor`
  MODIFY `id_documento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `genero_musical`
--
ALTER TABLE `genero_musical`
  MODIFY `id_genero` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `listas`
--
ALTER TABLE `listas`
  MODIFY `id_lista` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  MODIFY `id_perfil` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `permisos_reproduccion`
--
ALTER TABLE `permisos_reproduccion`
  MODIFY `id_permiso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reproducciones`
--
ALTER TABLE `reproducciones`
  MODIFY `id_reproduccion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `albumes`
--
ALTER TABLE `albumes`
  ADD CONSTRAINT `albumes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `canciones`
--
ALTER TABLE `canciones`
  ADD CONSTRAINT `canciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `canciones_ibfk_2` FOREIGN KEY (`id_genero`) REFERENCES `genero_musical` (`id_genero`),
  ADD CONSTRAINT `canciones_ibfk_3` FOREIGN KEY (`id_album`) REFERENCES `albumes` (`id_album`);

--
-- Filtros para la tabla `derechos_autor`
--
ALTER TABLE `derechos_autor`
  ADD CONSTRAINT `derechos_autor_ibfk_1` FOREIGN KEY (`id_usuario_autor`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `derechos_autor_ibfk_2` FOREIGN KEY (`id_cancion`) REFERENCES `canciones` (`id_cancion`);

--
-- Filtros para la tabla `documento_autor`
--
ALTER TABLE `documento_autor`
  ADD CONSTRAINT `documento_autor_ibfk_1` FOREIGN KEY (`id_registro`) REFERENCES `derechos_autor` (`id_registro`);

--
-- Filtros para la tabla `listas`
--
ALTER TABLE `listas`
  ADD CONSTRAINT `listas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `lista_canciones`
--
ALTER TABLE `lista_canciones`
  ADD CONSTRAINT `lista_canciones_ibfk_1` FOREIGN KEY (`id_lista`) REFERENCES `listas` (`id_lista`),
  ADD CONSTRAINT `lista_canciones_ibfk_2` FOREIGN KEY (`id_cancion`) REFERENCES `canciones` (`id_cancion`);

--
-- Filtros para la tabla `perfiles`
--
ALTER TABLE `perfiles`
  ADD CONSTRAINT `perfiles_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `perfil_genero`
--
ALTER TABLE `perfil_genero`
  ADD CONSTRAINT `perfil_genero_ibfk_1` FOREIGN KEY (`id_perfil`) REFERENCES `perfiles` (`id_perfil`),
  ADD CONSTRAINT `perfil_genero_ibfk_2` FOREIGN KEY (`id_genero`) REFERENCES `genero_musical` (`id_genero`);

--
-- Filtros para la tabla `permisos_reproduccion`
--
ALTER TABLE `permisos_reproduccion`
  ADD CONSTRAINT `permisos_reproduccion_ibfk_1` FOREIGN KEY (`id_cancion`) REFERENCES `canciones` (`id_cancion`),
  ADD CONSTRAINT `permisos_reproduccion_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `reproducciones`
--
ALTER TABLE `reproducciones`
  ADD CONSTRAINT `reproducciones_ibfk_1` FOREIGN KEY (`id_cancion`) REFERENCES `canciones` (`id_cancion`),
  ADD CONSTRAINT `reproducciones_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
