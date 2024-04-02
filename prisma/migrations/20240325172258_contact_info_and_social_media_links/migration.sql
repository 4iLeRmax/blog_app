/*
  Warnings:

  - You are about to drop the column `conatcInfoId` on the `socialMediaLink` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "socialMediaLink" DROP CONSTRAINT "socialMediaLink_conatcInfoId_fkey";

-- AlterTable
ALTER TABLE "socialMediaLink" DROP COLUMN "conatcInfoId";
