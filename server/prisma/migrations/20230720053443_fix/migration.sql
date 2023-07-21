/*
  Warnings:

  - You are about to drop the `_ArticleToMedia` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[articleId]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ArticleToMedia" DROP CONSTRAINT "_ArticleToMedia_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleToMedia" DROP CONSTRAINT "_ArticleToMedia_B_fkey";

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "pusblishState" TEXT NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "youtubeVideoUrl" TEXT;

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "articleId" INTEGER;

-- DropTable
DROP TABLE "_ArticleToMedia";

-- CreateIndex
CREATE UNIQUE INDEX "Media_articleId_key" ON "Media"("articleId");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
