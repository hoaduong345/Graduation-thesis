-- CreateTable
CREATE TABLE `Product` (
    `idproduct` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `rate` INTEGER NOT NULL,
    `pricesale` INTEGER NOT NULL,
    `discount` INTEGER NOT NULL,
    `soldcount` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `images` VARCHAR(191) NOT NULL,
    `categoryId` INTEGER NULL,

    PRIMARY KEY (`idproduct`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `idcategory` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idcategory`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`idcategory`) ON DELETE SET NULL ON UPDATE CASCADE;
