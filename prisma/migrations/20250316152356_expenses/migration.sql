-- CreateTable
CREATE TABLE "User" (
    "UserID" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Budget" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "MonthlyExpenses" (
    "ExpenseID" SERIAL NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Status" TEXT NOT NULL,
    "Method" TEXT NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "UserID" TEXT NOT NULL,

    CONSTRAINT "MonthlyExpenses_pkey" PRIMARY KEY ("ExpenseID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- AddForeignKey
ALTER TABLE "MonthlyExpenses" ADD CONSTRAINT "MonthlyExpenses_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;
