CREATE TABLE `waterbill`.`monthlybill` (
  `billId` INT NOT NULL,
  `year` INT(4) NULL,
  `month` VARCHAR(12) NULL,
  `startDate` DATE NULL,
  `endDate` DATE NULL,
  `totalUnits` VARCHAR(10) NULL,
  `totalBill` VARCHAR(10) NULL,
  `ratePerUnit` VARCHAR(45) NULL,
  `billImage` VARCHAR(45) NULL,
  `updatedDate` TIMESTAMP(6) NULL,
  PRIMARY KEY (`billId`));
ALTER TABLE `waterbill`.`monthlybill` 
ADD COLUMN `isActive` TINYINT NULL AFTER `updatedDate`;
  ALTER TABLE `waterbill`.`monthlybill` 
CHANGE COLUMN `isActive` `isActive` TINYINT NULL DEFAULT 0 ;
