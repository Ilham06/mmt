-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "notificationSettings" JSONB,
ADD COLUMN     "preferences" JSONB;
