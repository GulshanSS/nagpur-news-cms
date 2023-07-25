/*
  Warnings:

  - Added the required column `location` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "location" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PromotionaryArticle" ADD COLUMN     "address" TEXT,
ADD COLUMN     "websiteLink" TEXT;
