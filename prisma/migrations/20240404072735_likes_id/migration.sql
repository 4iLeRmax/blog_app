/*
  Warnings:

  - The required column `id` was added to the `Likes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "Likes_email_key";

-- AlterTable
ALTER TABLE "Likes" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Likes_pkey" PRIMARY KEY ("id");
