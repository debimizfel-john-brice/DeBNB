-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 21-01-2024 a las 01:15:03
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `DeBNB`
--
CREATE DATABASE IF NOT EXISTS `DeBNB` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `DeBNB`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `followings`
--

CREATE TABLE `followings` (
  `user` int(11) NOT NULL,
  `vacation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `followings`
--

INSERT INTO `followings` (`user`, `vacation`) VALUES
(2, 30),
(2, 31),
(2, 32),
(2, 33),
(2, 35),
(2, 36),
(3, 31),
(3, 32),
(3, 33),
(3, 37),
(3, 40),
(4, 30),
(4, 34),
(4, 38),
(4, 39),
(5, 31),
(5, 37),
(5, 40),
(5, 41),
(6, 30),
(6, 32),
(6, 34),
(6, 35),
(6, 36),
(6, 39),
(6, 40),
(6, 41);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(1, 'Deborah', 'Murciano', 'debimizfel@gmail.com', 'b2ab74e7e551ce5bf3bd3260c7e3b89553e95c24a924348bdb63d6a4222fde7cd793795c1a51a81096d679864da686d755460fec2f3d7a30c1f544d07f4946fb', 'admin'),
(2, 'John', 'Doe', 'john.doe@example.com', '2f257d88487a84b4f912b96d7d375562ea083f1b3111344a9498944cdda06427a36a2a826ecbf203c7dd4aa22ed7647c2650a92c6ea9a4b49b37f73073efba4d', 'user'),
(3, 'Jane', 'Smith', 'jane.smith@example.com', '2f257d88487a84b4f912b96d7d375562ea083f1b3111344a9498944cdda06427a36a2a826ecbf203c7dd4aa22ed7647c2650a92c6ea9a4b49b37f73073efba4d', 'user'),
(4, 'Bob', 'Johnson', 'bob.johnson@example.com', '2f257d88487a84b4f912b96d7d375562ea083f1b3111344a9498944cdda06427a36a2a826ecbf203c7dd4aa22ed7647c2650a92c6ea9a4b49b37f73073efba4d', 'user'),
(5, 'Alice', 'Williams', 'alice.williams@example.com', '2f257d88487a84b4f912b96d7d375562ea083f1b3111344a9498944cdda06427a36a2a826ecbf203c7dd4aa22ed7647c2650a92c6ea9a4b49b37f73073efba4d', 'user'),
(6, 'Charlie', 'Brown', 'charlie.brown@example.com', '2f257d88487a84b4f912b96d7d375562ea083f1b3111344a9498944cdda06427a36a2a826ecbf203c7dd4aa22ed7647c2650a92c6ea9a4b49b37f73073efba4d', 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `start`, `end`, `price`, `image`) VALUES
(30, 'Granada, Spain', 'Discover the enchanting allure of Granada, Spain, where the historic Alhambra Palace and the medieval charm of Albayzín await. Stroll through narrow alleys, savor local cuisine in Plaza Nueva, and immerse yourself in the vibrant atmosphere. As the sun sets, experience the magic of lantern-lit streets in Albaicín. Granada promises a captivating blend of history, culture, and scenic beauty for an unforgettable vacation.', '2024-01-21', '2024-01-28', 1234, '1705610478693.jpg'),
(31, 'Ronda, Spain', 'Experience the allure of Ronda, Spain, perched atop stunning cliffs in Andalusia. Admire the iconic Puente Nuevo spanning El Tajo gorge and explore historic sites like Plaza de Toros. Wander charming streets, savor local cuisine, and immerse yourself in Ronda\'s rich cultural tapestry. With Moorish influences and picturesque landscapes, Ronda promises a memorable getaway.', '2024-01-31', '2024-02-10', 2132, '1705610652416.jpg'),
(32, 'Sierra Nevada, Spain', 'Experience the thrill of Sierra Nevada, Spain, a haven for skiing enthusiasts. With its spectacular slopes and breathtaking mountain views, it offers an unforgettable winter adventure. Enjoy the excitement of skiing and the natural beauty of this prominent destination on the Iberian Peninsula.', '2024-02-04', '2024-02-26', 2500, '1705611014043.jpg'),
(33, 'Ronda, Spain', 'Explore Ronda, Spain, where the enchantment extends to horseback riding. Immerse yourself in the scenic beauty of the countryside as you ride through charming cobblestone streets and meandering paths. Ronda\'s allure is not just in its history but also in the unique experience of exploring the town on horseback, adding an extra layer of magic to your visit.', '2024-04-18', '2024-06-18', 2132, '1705611211543.jpg'),
(34, 'Gibraltar', 'Discover Gibraltar\'s unique charm with its iconic Rock, blending British and Mediterranean influences. Wander historic Main Street, visit apes at Upper Rock Nature Reserve, and enjoy stunning views of the Strait of Gibraltar. This enclave\'s mix of history, nature, and international flair makes it a captivating destination.', '2024-01-26', '2024-02-27', 3241, '1705611555406.jpg'),
(35, 'Malaga, Spain', 'Explore the vibrant allure of Malaga, Spain, nestled on the Costa del Sol. With its rich history reflected in the Alcazaba fortress and the Picasso Museum, Malaga offers a cultural feast. Indulge in the local cuisine at the bustling Atarazanas Market, and unwind on the pristine beaches. The city\'s lively atmosphere, historic charm, and coastal beauty make Malaga an enchanting destination for every traveler.', '2024-05-05', '2024-12-05', 1324, '1705611758827.jpg'),
(36, 'San Roque, Spain', 'Explore the beauty of San Roque\'s pine forests in Spain. Nestled within Andalusia, these lush woodlands offer serene hiking trails and scenic viewpoints. Immerse yourself in nature, surrounded by the fragrant pines, creating a tranquil haven for outdoor enthusiasts seeking a peaceful retreat in southern Spain.', '2024-06-09', '2024-06-14', 1000, '1705611928064.jpg'),
(37, 'Torre Molinos, Spain', 'Explore the enchanting Torre Molinos in Spain. Nestled amidst lush landscapes, this historic tower offers a glimpse into the region\'s past. Admire its architectural beauty and savor panoramic views of the Spanish countryside. Immerse yourself in the tranquility of Torre Molinos, where history meets natural splendor for an unforgettable experience.', '2024-04-01', '2024-04-18', 1100, '1705612092347.jpg'),
(38, 'Marocco', 'Explore the enchanting city of Chefchaouen in northern Morocco, nestled against the Rif Mountains. Known for its distinctive blue-painted buildings, this tranquil haven offers a serene escape. Wander through narrow winding streets, visit the historic Kasbah, and experience the vibrant local markets. Chefchaouen\'s unique blend of culture, color, and mountainous landscapes creates an unforgettable journey in this Moroccan gem.', '2024-03-28', '2024-04-22', 2342, '1705612276246.jpg'),
(39, 'Costa del Sol, Spain', '\r\nExperience the sun-soaked allure of Costa del Sol in Malaga, Spain. With its golden beaches, charming seaside villages, and vibrant cultural scene, it\'s a Mediterranean paradise. Explore the historic Alcazaba, indulge in fresh seafood at beachfront chiringuitos, and savor the lively atmosphere of Malaga\'s old town. ', '2024-07-14', '2024-07-25', 1232, '1705612384587.jpg'),
(40, 'Italy', 'Immerse yourself in Italy\'s charming vineyards, where lush hills showcase thriving grapevines. From Tuscany\'s sun-drenched landscapes to Piedmont\'s enchanting hills, each region yields unique wines. Explore historic estates, savor Chianti and Barolo, and relish Italian winemaking traditions. With breathtaking scenery and exceptional wines, Italy\'s vineyards offer a taste of la dolce vita.', '2024-06-18', '2025-06-30', 4325, '1705612496189.jpg'),
(41, 'La Linea, Spain', 'Explore the beauty of La Línea, Spain, a coastal town bordering Gibraltar. With its Mediterranean charm and views of the iconic Rock, La Línea offers a unique blend of Spanish and British influences. Stroll along the Playa de Levante, indulge in local tapas, and experience the vibrant atmosphere of this border town. La Línea\'s rich cultural fusion and scenic coastal allure make it a delightful destination for those seeking a taste of both worlds.', '2024-08-19', '2024-08-30', 1324, '1705612631223.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `followings`
--
ALTER TABLE `followings`
  ADD PRIMARY KEY (`user`,`vacation`),
  ADD KEY `followings_ibfk_2` (`vacation`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indices de la tabla `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `followings`
--
ALTER TABLE `followings`
  ADD CONSTRAINT `followings_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`userId`) ON DELETE CASCADE,
  ADD CONSTRAINT `followings_ibfk_2` FOREIGN KEY (`vacation`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
