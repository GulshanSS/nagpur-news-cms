/*
  Warnings:

  - You are about to drop the column `publishState` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "publishState",
ADD COLUMN     "state" TEXT NOT NULL DEFAULT 'DRAFT';
