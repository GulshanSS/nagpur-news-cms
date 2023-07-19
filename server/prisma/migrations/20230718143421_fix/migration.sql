/*
  Warnings:

  - You are about to drop the column `promotionaryAticleId` on the `Media` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[promotionaryArticleId]` on the table `Media` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_promotionaryAticleId_fkey";

-- DropIndex
DROP INDEX "Media_promotionaryAticleId_key";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "promotionaryAticleId",
ADD COLUMN     "promotionaryArticleId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Media_promotionaryArticleId_key" ON "Media"("promotionaryArticleId");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_promotionaryArticleId_fkey" FOREIGN KEY ("promotionaryArticleId") REFERENCES "PromotionaryArticle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
