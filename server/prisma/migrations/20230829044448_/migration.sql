-- CreateTable
CREATE TABLE `Product` (
    `idsanpham` INTEGER NOT NULL AUTO_INCREMENT,
    `tensanpham` VARCHAR(191) NOT NULL,
    `giasanpham` INTEGER NOT NULL,
    `mota` VARCHAR(191) NOT NULL,
    `soluong` INTEGER NOT NULL,
    `trangthai` VARCHAR(191) NOT NULL,
    `ngaytao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `hinhanh` VARCHAR(191) NOT NULL,
    `categoryId` INTEGER NULL,

    PRIMARY KEY (`idsanpham`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `iddanhmuc` INTEGER NOT NULL AUTO_INCREMENT,
    `tendanhmuc` VARCHAR(191) NOT NULL,
    `ngaytao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`iddanhmuc`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`iddanhmuc`) ON DELETE SET NULL ON UPDATE CASCADE;
