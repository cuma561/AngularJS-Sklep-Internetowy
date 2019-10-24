-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Czas generowania: 23 Paź 2019, 23:36
-- Wersja serwera: 5.6.20
-- Wersja PHP: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Baza danych: `angularshop`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
`id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `items` text NOT NULL,
  `total` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=20 ;

--
-- Zrzut danych tabeli `orders`
--

INSERT INTO `orders` (`id`, `userId`, `name`, `email`, `items`, `total`, `status`) VALUES
(1, 2, 'Admin', 'admin@admin.pl', '[{"id":"1","name":"Zdrowe warzywa","weight":"1.69","description":"Bardzo smaczne i zdrowe warzywa","price":"2.82","thumb":"foodiesfeed.com_bell-peppers-and-other-fresh-vegetables-in-a-store.jpg","qty":"2"},{"id":"2","name":"Ciasto czekoladowe","weight":"1.62","description":"Smaczne, ale niezdrowe :)","price":"7.96","thumb":"foodiesfeed.com_chocolate-cake-in-a-restaurant.jpg","qty":"1"}]', '13.60', 1),
(2, 2, 'Admin', 'admin@admin.pl', '[{"id":"3","name":"Kolorowe \\u017celki","weight":"0.85","description":"Bardzo smaczne \\u017celki","price":"7.98","thumb":"foodiesfeed.com_sweet-candies-store.jpg","qty":"2"},{"id":"4","name":"Zdrowe owoce","weight":"2.89","description":"Bardzo smaczne i zdrowe owoce","price":"2.50","thumb":"foodiesfeed.com_red-apples-with-other-red-fruit.jpg","qty":"1"},{"id":"5","name":"Zdrowe produkty spo\\u017cywcze","weight":"5.5","description":"Bardzo smaczne i zdrowe produkty spo\\u017cywcze\\/","price":"10","thumb":"foodiesfeed.com_healthy-fats.jpg","qty":"1"}]', '28.46', 0),
(3, 3, 'user', 'user@user.pl', '[{"id":"5","name":"Zdrowe produkty spo\\u017cywcze","weight":"5.5","description":"Bardzo smaczne i zdrowe produkty spo\\u017cywcze\\/","price":"10","thumb":"foodiesfeed.com_healthy-fats.jpg","qty":"1"},{"id":"4","name":"Zdrowe owoce","weight":"2.89","description":"Bardzo smaczne i zdrowe owoce","price":"2.50","thumb":"foodiesfeed.com_red-apples-with-other-red-fruit.jpg","qty":"1"}]', '12.50', 0),
(4, 1, 'Test', 'testowy@test.pl', '[{"id":"1","name":"Zdrowe warzywa","weight":"1.69","description":"Bardzo smaczne i zdrowe warzywa","price":"2.82","thumb":"foodiesfeed.com_bell-peppers-and-other-fresh-vegetables-in-a-store.jpg","qty":"1"},{"id":"3","name":"Kolorowe \\u017celki","weight":"0.85","description":"Bardzo smaczne \\u017celki","price":"7.98","thumb":"foodiesfeed.com_sweet-candies-store.jpg","qty":"1"}]', '10.80', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `products`
--

CREATE TABLE IF NOT EXISTS `products` (
`id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` varchar(255) NOT NULL,
  `thumb` varchar(255) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Zrzut danych tabeli `products`
--

INSERT INTO `products` (`id`, `name`, `weight`, `description`, `price`, `thumb`) VALUES
(1, 'Zdrowe warzywa', '1.69', 'Bardzo smaczne i zdrowe warzywa', '2.82', 'foodiesfeed.com_bell-peppers-and-other-fresh-vegetables-in-a-store.jpg'),
(2, 'Ciasto czekoladowe', '1.62', 'Smaczne, ale niezdrowe :)', '7.96', 'foodiesfeed.com_chocolate-cake-in-a-restaurant.jpg'),
(3, 'Kolorowe żelki', '0.85', 'Bardzo smaczne żelki', '7.98', 'foodiesfeed.com_sweet-candies-store.jpg'),
(4, 'Zdrowe owoce', '2.89', 'Bardzo smaczne i zdrowe owoce', '2.50', 'foodiesfeed.com_red-apples-with-other-red-fruit.jpg'),
(5, 'Zdrowe produkty spożywcze', '5.5', 'Bardzo smaczne i zdrowe produkty spożywcze/', '10', 'foodiesfeed.com_healthy-fats.jpg');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `password`) VALUES
(1, 'Test', 'testowy@test.pl', 'user', 'Ft5MYiyE4xAjY'),
(2, 'Admin', 'admin@admin.pl', 'admin', 'FtMaUMglKzRYk'),
(3, 'user', 'user@user.pl', 'user', 'Ftmg51dCipsgQ');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `orders`
--
ALTER TABLE `orders`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT dla tabeli `products`
--
ALTER TABLE `products`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
