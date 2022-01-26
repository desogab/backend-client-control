-- CreateTable
CREATE TABLE "Client" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "active" BOOLEAN DEFAULT true,
    "sponsor" BOOLEAN,
    "name" VARCHAR(50) NOT NULL,
    "surname" VARCHAR(100) NOT NULL,
    "birthdate" DATE NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "consultationPrice" MONEY NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "professionalId" UUID NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientAddress" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "street" VARCHAR(100) NOT NULL,
    "district" VARCHAR(50) NOT NULL,
    "number" SMALLINT NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "complement" VARCHAR(25) NOT NULL,
    "state" CHAR(2) NOT NULL,
    "zipcode" VARCHAR(25) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "clientId" UUID NOT NULL,

    CONSTRAINT "ClientAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientEmergency" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(50) NOT NULL,
    "surname" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "clientId" UUID NOT NULL,

    CONSTRAINT "ClientEmergency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientSponsor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(50) NOT NULL,
    "surname" VARCHAR(100) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "clientId" UUID,

    CONSTRAINT "ClientSponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsultationInfo" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "dateVisit" DATE NOT NULL,
    "hoursVisit" TIME(6) NOT NULL,
    "model" VARCHAR(15),
    "professionalId" UUID NOT NULL,
    "clientId" UUID NOT NULL,

    CONSTRAINT "ConsultationInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalInfo" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(50) NOT NULL,
    "surname" VARCHAR(100) NOT NULL,
    "birthdate" DATE NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "profession" VARCHAR(50) NOT NULL,
    "professionalDocument" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "professionalUserId" UUID NOT NULL,

    CONSTRAINT "ProfessionalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalUser" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "ProfessionalUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_cpf_key" ON "Client"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_phone_key" ON "Client"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "ClientAddress_clientId_key" ON "ClientAddress"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "ClientEmergency_clientId_key" ON "ClientEmergency"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "ClientSponsor_cpf_key" ON "ClientSponsor"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "ClientSponsor_clientId_key" ON "ClientSponsor"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "ConsultationInfo_professionalId_key" ON "ConsultationInfo"("professionalId");

-- CreateIndex
CREATE UNIQUE INDEX "ConsultationInfo_clientId_key" ON "ConsultationInfo"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalInfo_cpf_key" ON "ProfessionalInfo"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalInfo_email_key" ON "ProfessionalInfo"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalInfo_phone_key" ON "ProfessionalInfo"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalInfo_professionalDocument_key" ON "ProfessionalInfo"("professionalDocument");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalInfo_professionalUserId_key" ON "ProfessionalInfo"("professionalUserId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalUser_username_key" ON "ProfessionalUser"("username");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "ProfessionalUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ClientAddress" ADD CONSTRAINT "ClientAddress_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientEmergency" ADD CONSTRAINT "ClientEmergency_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientSponsor" ADD CONSTRAINT "ClientSponsor_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationInfo" ADD CONSTRAINT "ConsultationInfo_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationInfo" ADD CONSTRAINT "ConsultationInfo_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "ProfessionalUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalInfo" ADD CONSTRAINT "ProfessionalInfo_professionalUserId_fkey" FOREIGN KEY ("professionalUserId") REFERENCES "ProfessionalUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
