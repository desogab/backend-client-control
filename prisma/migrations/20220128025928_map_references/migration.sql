/*
  Warnings:

  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClientAddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClientEmergency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClientSponsor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ConsultationInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfessionalInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfessionalUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_professionalId_fkey";

-- DropForeignKey
ALTER TABLE "ClientAddress" DROP CONSTRAINT "ClientAddress_clientId_fkey";

-- DropForeignKey
ALTER TABLE "ClientEmergency" DROP CONSTRAINT "ClientEmergency_clientId_fkey";

-- DropForeignKey
ALTER TABLE "ClientSponsor" DROP CONSTRAINT "ClientSponsor_clientId_fkey";

-- DropForeignKey
ALTER TABLE "ConsultationInfo" DROP CONSTRAINT "ConsultationInfo_clientId_fkey";

-- DropForeignKey
ALTER TABLE "ConsultationInfo" DROP CONSTRAINT "ConsultationInfo_professionalId_fkey";

-- DropForeignKey
ALTER TABLE "ProfessionalInfo" DROP CONSTRAINT "ProfessionalInfo_professionalUserId_fkey";

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "ClientAddress";

-- DropTable
DROP TABLE "ClientEmergency";

-- DropTable
DROP TABLE "ClientSponsor";

-- DropTable
DROP TABLE "ConsultationInfo";

-- DropTable
DROP TABLE "ProfessionalInfo";

-- DropTable
DROP TABLE "ProfessionalUser";

-- CreateTable
CREATE TABLE "client" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "active" BOOLEAN DEFAULT true,
    "sponsor" BOOLEAN DEFAULT false,
    "name" VARCHAR(50) NOT NULL,
    "surname" VARCHAR(100) NOT NULL,
    "birthdate" DATE NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "consultation_price" MONEY NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "professional_id" UUID NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_address" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "street" VARCHAR(100) NOT NULL,
    "district" VARCHAR(50) NOT NULL,
    "number" SMALLINT NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "complement" VARCHAR(25) NOT NULL,
    "state" CHAR(2) NOT NULL,
    "zipcode" VARCHAR(25) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "client_id" UUID NOT NULL,

    CONSTRAINT "client_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_emergency" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(50) NOT NULL,
    "surname" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "client_id" UUID NOT NULL,

    CONSTRAINT "client_emergency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_sponsor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(50) NOT NULL,
    "surname" VARCHAR(100) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "client_id" UUID,

    CONSTRAINT "client_sponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultation_info" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date_visit" DATE NOT NULL,
    "hours_visit" TIME(6) NOT NULL,
    "model" VARCHAR(15),
    "professional_id" UUID NOT NULL,
    "client_id" UUID NOT NULL,

    CONSTRAINT "consultation_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professional_info" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(50) NOT NULL,
    "surname" VARCHAR(100) NOT NULL,
    "birthdate" DATE NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "profession" VARCHAR(50) NOT NULL,
    "professional_document" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "professional_user_id" UUID NOT NULL,

    CONSTRAINT "professional_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professional_user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "professional_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_cpf_key" ON "client"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "client_email_key" ON "client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "client_phone_key" ON "client"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "client_address_client_id_key" ON "client_address"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "client_emergency_client_id_key" ON "client_emergency"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "client_sponsor_cpf_key" ON "client_sponsor"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "client_sponsor_client_id_key" ON "client_sponsor"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "consultation_info_professional_id_key" ON "consultation_info"("professional_id");

-- CreateIndex
CREATE UNIQUE INDEX "consultation_info_client_id_key" ON "consultation_info"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "professional_info_cpf_key" ON "professional_info"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "professional_info_email_key" ON "professional_info"("email");

-- CreateIndex
CREATE UNIQUE INDEX "professional_info_phone_key" ON "professional_info"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "professional_info_professional_document_key" ON "professional_info"("professional_document");

-- CreateIndex
CREATE UNIQUE INDEX "professional_info_professional_user_id_key" ON "professional_info"("professional_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "professional_user_username_key" ON "professional_user"("username");

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professional_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_address" ADD CONSTRAINT "client_address_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_emergency" ADD CONSTRAINT "client_emergency_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_sponsor" ADD CONSTRAINT "client_sponsor_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultation_info" ADD CONSTRAINT "consultation_info_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultation_info" ADD CONSTRAINT "consultation_info_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professional_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professional_info" ADD CONSTRAINT "professional_info_professional_user_id_fkey" FOREIGN KEY ("professional_user_id") REFERENCES "professional_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
