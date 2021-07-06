CREATE TABLE `waterbill`.`users` (
  `userId` VARCHAR(30) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `blockNumber` INT NULL,
  `plotNumber` VARCHAR(45) NULL,
  `isAdmin` TINYINT NULL DEFAULT 0,
  `phoneNumber` VARCHAR(45),
  `email` VARCHAR(45) ,
  `picture` LONGBLOB NULL,
  `userCreation` TIMESTAMP(6) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`userId`));