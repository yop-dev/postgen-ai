/*
  Warnings:

  - You are about to drop the column `caption` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Variant` table. All the data in the column will be lost.
  - Added the required column `content` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Generation" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "caption",
DROP COLUMN "imageUrl",
ADD COLUMN     "content" TEXT NOT NULL;
