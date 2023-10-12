/*
  Warnings:

  - You are about to drop the column `facebook` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "facebook",
DROP COLUMN "twitter";
