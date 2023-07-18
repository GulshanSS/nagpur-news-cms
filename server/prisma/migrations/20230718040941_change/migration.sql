/*
  Warnings:

  - You are about to drop the column `mediaId` on the `Testimonial` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[testimonialId]` on the table `Media` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_mediaId_fkey";

-- DropIndex
DROP INDEX "Testimonial_mediaId_key";

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "testimonialId" INTEGER;

-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "mediaId";

-- CreateIndex
CREATE UNIQUE INDEX "Media_testimonialId_key" ON "Media"("testimonialId");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_testimonialId_fkey" FOREIGN KEY ("testimonialId") REFERENCES "Testimonial"("id") ON DELETE CASCADE ON UPDATE CASCADE;
