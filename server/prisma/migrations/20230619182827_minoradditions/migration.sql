/*
  Warnings:

  - You are about to drop the column `newsPostId` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `newsPostSectionId` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the `NewsPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NewsPostSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SocialMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NewsPostToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_newsPostId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_newsPostSectionId_fkey";

-- DropForeignKey
ALTER TABLE "NewsPost" DROP CONSTRAINT "NewsPost_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "NewsPostSection" DROP CONSTRAINT "NewsPostSection_newsPostId_fkey";

-- DropForeignKey
ALTER TABLE "_NewsPostToTag" DROP CONSTRAINT "_NewsPostToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_NewsPostToTag" DROP CONSTRAINT "_NewsPostToTag_B_fkey";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "newsPostId",
DROP COLUMN "newsPostSectionId",
ADD COLUMN     "postId" INTEGER,
ADD COLUMN     "postSectionId" INTEGER;

-- AlterTable
ALTER TABLE "PromotionaryPost" ADD COLUMN     "setAsBanner" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "NewsPost";

-- DropTable
DROP TABLE "NewsPostSection";

-- DropTable
DROP TABLE "SocialMedia";

-- DropTable
DROP TABLE "_NewsPostToTag";

-- CreateTable
CREATE TABLE "PostSection" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255),
    "content" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "PostSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "setAsBanner" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionaryPostViewCount" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "promotionaryPostId" INTEGER NOT NULL,

    CONSTRAINT "PromotionaryPostViewCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostViewCount" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "postId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "PostViewCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PromotionaryPostViewCount_promotionaryPostId_key" ON "PromotionaryPostViewCount"("promotionaryPostId");

-- CreateIndex
CREATE UNIQUE INDEX "PostViewCount_postId_key" ON "PostViewCount"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTag_AB_unique" ON "_PostToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_postSectionId_fkey" FOREIGN KEY ("postSectionId") REFERENCES "PostSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostSection" ADD CONSTRAINT "PostSection_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionaryPostViewCount" ADD CONSTRAINT "PromotionaryPostViewCount_promotionaryPostId_fkey" FOREIGN KEY ("promotionaryPostId") REFERENCES "PromotionaryPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostViewCount" ADD CONSTRAINT "PostViewCount_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostViewCount" ADD CONSTRAINT "PostViewCount_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
