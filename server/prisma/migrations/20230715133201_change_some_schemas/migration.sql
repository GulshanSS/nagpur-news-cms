/*
  Warnings:

  - You are about to drop the column `articleId` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `articleSectionId` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `promotionaryArticleId` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `testimonialId` on the `Media` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mediaId]` on the table `PromotionaryArticle` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mediaId]` on the table `Testimonial` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaId` to the `PromotionaryArticle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaId` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_articleId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_articleSectionId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_promotionaryArticleId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_testimonialId_fkey";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "articleId",
DROP COLUMN "articleSectionId",
DROP COLUMN "path",
DROP COLUMN "promotionaryArticleId",
DROP COLUMN "testimonialId",
ADD COLUMN     "key" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "PromotionaryArticle" ADD COLUMN     "mediaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN     "designation" TEXT,
ADD COLUMN     "mediaId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_ArticleSectionToMedia" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ArticleToMedia" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleSectionToMedia_AB_unique" ON "_ArticleSectionToMedia"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleSectionToMedia_B_index" ON "_ArticleSectionToMedia"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToMedia_AB_unique" ON "_ArticleToMedia"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToMedia_B_index" ON "_ArticleToMedia"("B");

-- CreateIndex
CREATE UNIQUE INDEX "PromotionaryArticle_mediaId_key" ON "PromotionaryArticle"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "Testimonial_mediaId_key" ON "Testimonial"("mediaId");

-- AddForeignKey
ALTER TABLE "PromotionaryArticle" ADD CONSTRAINT "PromotionaryArticle_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleSectionToMedia" ADD CONSTRAINT "_ArticleSectionToMedia_A_fkey" FOREIGN KEY ("A") REFERENCES "ArticleSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleSectionToMedia" ADD CONSTRAINT "_ArticleSectionToMedia_B_fkey" FOREIGN KEY ("B") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToMedia" ADD CONSTRAINT "_ArticleToMedia_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToMedia" ADD CONSTRAINT "_ArticleToMedia_B_fkey" FOREIGN KEY ("B") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
