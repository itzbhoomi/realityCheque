-- DropForeignKey
ALTER TABLE "MonthlyExpenses" DROP CONSTRAINT "MonthlyExpenses_UserID_fkey";

-- AlterTable
ALTER TABLE "MonthlyExpenses" ALTER COLUMN "Date" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "MonthlyExpenses" ADD CONSTRAINT "MonthlyExpenses_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE CASCADE ON UPDATE CASCADE;
