/*
  Warnings:

  - Added the required column `updatedAt` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Species" AS ENUM ('DOG', 'CAT', 'OTHER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "AnimalStatus" AS ENUM ('AVAILABLE', 'RESERVED', 'ADOPTED', 'UNAVAILABLE', 'PENDING', 'SOS');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('RECEIVED', 'OPENED', 'DELETED', 'SPAM');

-- CreateEnum
CREATE TYPE "PlacementType" AS ENUM ('STANDARD', 'SOS', 'FAD');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('FUNDRAISING', 'OPEN_HOUSE', 'RAFFLE', 'TRAINING_SESSION', 'OTHER');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('EUR', 'USD');

-- CreateEnum
CREATE TYPE "DonationStatus" AS ENUM ('PENDING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE_ANIMAL', 'UPDATE_ANIMAL', 'DELETE_ANIMAL', 'CHANGE_ANIMAL_STATUS', 'UPDATE_PLACEMENT_TYPE', 'CREATE_USER', 'UPDATE_USER', 'DELETE_USER', 'UPDATE_ROLE', 'MARK_MESSAGE_OPENED', 'MARK_MESSAGE_SPAM', 'DELETE_MESSAGE', 'MARK_DONATION_COMPLETED', 'UPDATE_DONATION_STATUS', 'CREATE_EVENT', 'UPDATE_EVENT', 'DELETE_EVENT');

-- CreateEnum
CREATE TYPE "AuditEntity" AS ENUM ('ANIMAL', 'USER', 'MESSAGE', 'DONATION', 'EVENT');

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "animals" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "icadNumber" TEXT,
    "name" TEXT NOT NULL,
    "isSterilized" BOOLEAN NOT NULL DEFAULT false,
    "species" "Species" NOT NULL,
    "breed" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "status" "AnimalStatus" NOT NULL DEFAULT 'AVAILABLE',
    "placementType" "PlacementType" NOT NULL DEFAULT 'STANDARD',
    "adoptionDate" TIMESTAMP(3),
    "photos" TEXT[],
    "internalNotes" TEXT,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "animals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incompatibilities" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "incompatibilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "userId" INTEGER NOT NULL,
    "animalId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("userId","animalId")
);

-- CreateTable
CREATE TABLE "animal_incompatibilities" (
    "animalId" INTEGER NOT NULL,
    "incompatibilityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "animal_incompatibilities_pkey" PRIMARY KEY ("animalId","incompatibilityId")
);

-- CreateTable
CREATE TABLE "donations" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'EUR',
    "donorEmail" TEXT NOT NULL,
    "donorName" TEXT,
    "message" TEXT,
    "status" "DonationStatus" NOT NULL DEFAULT 'PENDING',
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "EventType" NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "startTime" TEXT,
    "endTime" TEXT,
    "price" INTEGER,
    "address" TEXT,
    "city" TEXT,
    "zipCode" TEXT,
    "photos" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "emailSender" TEXT NOT NULL,
    "nameSender" TEXT NOT NULL,
    "status" "MessageStatus" NOT NULL DEFAULT 'RECEIVED',
    "internalNotes" TEXT,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "action" "AuditAction" NOT NULL,
    "entity" "AuditEntity" NOT NULL,
    "entityId" INTEGER NOT NULL,
    "description" TEXT,
    "performedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "performedById" INTEGER,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "animals_uid_key" ON "animals"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "animals_icadNumber_key" ON "animals"("icadNumber");

-- CreateIndex
CREATE INDEX "animals_species_idx" ON "animals"("species");

-- CreateIndex
CREATE INDEX "animals_breed_idx" ON "animals"("breed");

-- CreateIndex
CREATE INDEX "animals_gender_idx" ON "animals"("gender");

-- CreateIndex
CREATE INDEX "animals_status_idx" ON "animals"("status");

-- CreateIndex
CREATE INDEX "animals_placementType_idx" ON "animals"("placementType");

-- CreateIndex
CREATE UNIQUE INDEX "incompatibilities_uid_key" ON "incompatibilities"("uid");

-- CreateIndex
CREATE INDEX "favorites_userId_idx" ON "favorites"("userId");

-- CreateIndex
CREATE INDEX "animal_incompatibilities_incompatibilityId_idx" ON "animal_incompatibilities"("incompatibilityId");

-- CreateIndex
CREATE INDEX "animal_incompatibilities_animalId_idx" ON "animal_incompatibilities"("animalId");

-- CreateIndex
CREATE UNIQUE INDEX "donations_uid_key" ON "donations"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "events_uid_key" ON "events"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "messages_uid_key" ON "messages"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "audit_logs_uid_key" ON "audit_logs"("uid");

-- CreateIndex
CREATE INDEX "audit_logs_performedById_idx" ON "audit_logs"("performedById");

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animal_incompatibilities" ADD CONSTRAINT "animal_incompatibilities_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animal_incompatibilities" ADD CONSTRAINT "animal_incompatibilities_incompatibilityId_fkey" FOREIGN KEY ("incompatibilityId") REFERENCES "incompatibilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
