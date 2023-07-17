/*
  Warnings:

  - You are about to drop the column `quoutedBy` on the `Testimonial` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "quoutedBy",
ADD COLUMN     "quotedBy" TEXT;
