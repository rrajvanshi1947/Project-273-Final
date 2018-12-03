USE linkedin;

DROP TABLE IF EXISTS users;

CREATE TABLE `users` (
  `s.no.` mediumint(10) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `emailID` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `company` varchar(100) DEFAULT NULL,
  `phonenum` bigint DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `zipcode` varchar(50) DEFAULT NULL,
  `expdesc` varchar(2000) DEFAULT NULL,
  `imageURL` varchar(100) DEFAULT NULL,
  `dateofbirth` date DEFAULT NULL ,
  `gender` varchar(10) DEFAULT NULL,
  `edudesc` varchar(2000) DEFAULT NULL,
  `skill1` varchar(2000) DEFAULT NULL,
  `summary` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`s.no.`));