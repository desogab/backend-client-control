-- DropForeignKey
ALTER TABLE "client" DROP CONSTRAINT "client_professional_id_fkey";

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professional_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
