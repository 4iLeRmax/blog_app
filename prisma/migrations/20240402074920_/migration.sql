-- DropForeignKey
ALTER TABLE "Reporters" DROP CONSTRAINT "Reporters_reportCommentId_fkey";

-- DropForeignKey
ALTER TABLE "SocialMediaLink" DROP CONSTRAINT "SocialMediaLink_contactInfoId_fkey";

-- AddForeignKey
ALTER TABLE "Reporters" ADD CONSTRAINT "Reporters_reportCommentId_fkey" FOREIGN KEY ("reportCommentId") REFERENCES "ReportComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialMediaLink" ADD CONSTRAINT "SocialMediaLink_contactInfoId_fkey" FOREIGN KEY ("contactInfoId") REFERENCES "ContactInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
