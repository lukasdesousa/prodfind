/*
  Warnings:

  - Added the required column `storeName` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Seller" ADD COLUMN     "storeName" TEXT NOT NULL;
