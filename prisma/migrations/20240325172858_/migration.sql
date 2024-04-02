/*
  Warnings:

  - You are about to drop the `socialMediaLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "socialMediaLink";

-- CreateTable
CREATE TABLE "SocialMediaLinks" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "SocialMediaLinks_pkey" PRIMARY KEY ("id")
);
