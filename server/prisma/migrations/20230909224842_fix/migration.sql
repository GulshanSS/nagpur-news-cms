/*
  Warnings:

  - Made the column `slug` on table `Article` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `PromotionaryArticle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `Tag` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "PromotionaryArticle" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "slug" SET NOT NULL;
