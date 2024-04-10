-- DropForeignKey
ALTER TABLE "SocialMediaLink" DROP CONSTRAINT "SocialMediaLink_contactInfoId_fkey";

-- AddForeignKey
ALTER TABLE "SocialMediaLink" ADD CONSTRAINT "SocialMediaLink_contactInfoId_fkey" FOREIGN KEY ("contactInfoId") REFERENCES "ContactInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
