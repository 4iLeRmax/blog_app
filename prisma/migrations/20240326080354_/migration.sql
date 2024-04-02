/*
  Warnings:

  - You are about to drop the `SocialMediaLinks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SocialMediaLinks";

-- CreateTable
CREATE TABLE "SocialMediaLink" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "contactInfoId" TEXT,

    CONSTRAINT "SocialMediaLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SocialMediaLink" ADD CONSTRAINT "SocialMediaLink_contactInfoId_fkey" FOREIGN KEY ("contactInfoId") REFERENCES "ContactInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
