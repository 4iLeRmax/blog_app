/*
  Warnings:

  - The required column `id` was added to the `Reporters` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "Reporters_email_key";

-- AlterTable
ALTER TABLE "Reporters" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Reporters_pkey" PRIMARY KEY ("id");
