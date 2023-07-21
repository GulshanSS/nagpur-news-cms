/*
  Warnings:

  - You are about to drop the column `pusblishState` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "pusblishState",
ADD COLUMN     "publishState" TEXT NOT NULL DEFAULT 'DRAFT';
