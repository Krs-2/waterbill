CREATE TABLE `waterbill`.`memberbilldetails` (
  `billId` INT NOT NULL,
  `userId` INT NULL,
  `memberBillId` INT NOT NULL AUTO_INCREMENT,
  `isApproved` TINYINT NULL DEFAULT 0,
  `billImage` LONGBLOB NULL,
  `consumedUnits` VARCHAR(5) NULL,
  `estimatedBill` VARCHAR(7) NULL,
  PRIMARY KEY (`memberBillId`));


insert into memberbilldetails (billId,billImage,consumedUnits,estimatedBill) values ("3465","","123","130.38");