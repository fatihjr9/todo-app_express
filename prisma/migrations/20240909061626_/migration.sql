/*
  Warnings:

  - You are about to alter the column `title` on the `activity` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `email` on the `activity` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `activity` MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `todo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `priority` VARCHAR(191) NOT NULL DEFAULT 'Very High',
    `activity_group_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `todo` ADD CONSTRAINT `todo_activity_group_id_fkey` FOREIGN KEY (`activity_group_id`) REFERENCES `activity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
