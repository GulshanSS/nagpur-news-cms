/*
  Warnings:

  - You are about to drop the column `postId` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `postSectionId` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `promotionaryPostId` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostViewCount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PromotionaryPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PromotionaryPostViewCount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_postId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_postSectionId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_promotionaryPostId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "PostSection" DROP CONSTRAINT "PostSection_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostViewCount" DROP CONSTRAINT "PostViewCount_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "PostViewCount" DROP CONSTRAINT "PostViewCount_postId_fkey";

-- DropForeignKey
ALTER TABLE "PromotionaryPostViewCount" DROP CONSTRAINT "PromotionaryPostViewCount_promotionaryPostId_fkey";

-- DropForeignKey
ALTER TABLE "_PostToTag" DROP CONSTRAINT "_PostToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostToTag" DROP CONSTRAINT "_PostToTag_B_fkey";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "postId",
DROP COLUMN "postSectionId",
DROP COLUMN "promotionaryPostId",
ADD COLUMN     "articleId" INTEGER,
ADD COLUMN     "articleSectionId" INTEGER,
ADD COLUMN     "promotionaryArticleId" INTEGER;

-- AlterTable
ALTER TABLE "Testimonial" ALTER COLUMN "quote" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "PostSection";

-- DropTable
DROP TABLE "PostViewCount";

-- DropTable
DROP TABLE "PromotionaryPost";

-- DropTable
DROP TABLE "PromotionaryPostViewCount";

-- DropTable
DROP TABLE "_PostToTag";

-- CreateTable
CREATE TABLE "ArticleSection" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,

    CONSTRAINT "ArticleSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "setAsBanner" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionaryArticle" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "priority" INTEGER NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "setAsBanner" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PromotionaryArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionaryArticleViewCount" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "promotionaryArticleId" INTEGER NOT NULL,

    CONSTRAINT "PromotionaryArticleViewCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleViewCount" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "articleId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "ArticleViewCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArticleToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PromotionaryArticleViewCount_promotionaryArticleId_key" ON "PromotionaryArticleViewCount"("promotionaryArticleId");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleViewCount_articleId_key" ON "ArticleViewCount"("articleId");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToTag_AB_unique" ON "_ArticleToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToTag_B_index" ON "_ArticleToTag"("B");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_articleSectionId_fkey" FOREIGN KEY ("articleSectionId") REFERENCES "ArticleSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_promotionaryArticleId_fkey" FOREIGN KEY ("promotionaryArticleId") REFERENCES "PromotionaryArticle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleSection" ADD CONSTRAINT "ArticleSection_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionaryArticleViewCount" ADD CONSTRAINT "PromotionaryArticleViewCount_promotionaryArticleId_fkey" FOREIGN KEY ("promotionaryArticleId") REFERENCES "PromotionaryArticle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleViewCount" ADD CONSTRAINT "ArticleViewCount_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleViewCount" ADD CONSTRAINT "ArticleViewCount_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToTag" ADD CONSTRAINT "_ArticleToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToTag" ADD CONSTRAINT "_ArticleToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
