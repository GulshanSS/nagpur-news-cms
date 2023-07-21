/*
  Warnings:

  - You are about to drop the `_ArticleSectionToMedia` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[articleSectionId]` on the table `Media` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_ArticleSectionToMedia" DROP CONSTRAINT "_ArticleSectionToMedia_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleSectionToMedia" DROP CONSTRAINT "_ArticleSectionToMedia_B_fkey";

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "articleSectionId" INTEGER;

-- DropTable
DROP TABLE "_ArticleSectionToMedia";

-- CreateIndex
CREATE UNIQUE INDEX "Media_articleSectionId_key" ON "Media"("articleSectionId");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_articleSectionId_fkey" FOREIGN KEY ("articleSectionId") REFERENCES "ArticleSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
