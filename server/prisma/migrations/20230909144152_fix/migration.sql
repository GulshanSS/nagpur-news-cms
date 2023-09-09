/*
  Warnings:

  - Made the column `title` on table `PromotionaryArticle` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PromotionaryArticle" ALTER COLUMN "title" SET NOT NULL;
