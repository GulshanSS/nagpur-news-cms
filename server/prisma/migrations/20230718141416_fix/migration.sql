/*
  Warnings:

  - You are about to drop the column `mediaId` on the `PromotionaryArticle` table. All the data in the column will be lost.
  - You are about to drop the `ArticleViewCount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PromotionaryArticleViewCount` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[promotionaryAticleId]` on the table `Media` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ArticleViewCount" DROP CONSTRAINT "ArticleViewCount_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleViewCount" DROP CONSTRAINT "ArticleViewCount_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "PromotionaryArticle" DROP CONSTRAINT "PromotionaryArticle_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "PromotionaryArticleViewCount" DROP CONSTRAINT "PromotionaryArticleViewCount_promotionaryArticleId_fkey";

-- DropIndex
DROP INDEX "PromotionaryArticle_mediaId_key";

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "promotionaryAticleId" INTEGER;

-- AlterTable
ALTER TABLE "PromotionaryArticle" DROP COLUMN "mediaId",
ADD COLUMN     "contact" VARCHAR(10),
ADD COLUMN     "instagramLink" TEXT,
ADD COLUMN     "whatsAppLink" TEXT,
ALTER COLUMN "priority" SET DEFAULT 0;

-- DropTable
DROP TABLE "ArticleViewCount";

-- DropTable
DROP TABLE "PromotionaryArticleViewCount";

-- CreateIndex
CREATE UNIQUE INDEX "Media_promotionaryAticleId_key" ON "Media"("promotionaryAticleId");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_promotionaryAticleId_fkey" FOREIGN KEY ("promotionaryAticleId") REFERENCES "PromotionaryArticle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
