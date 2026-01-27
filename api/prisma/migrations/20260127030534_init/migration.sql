-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "uname" TEXT NOT NULL,
    "uemail" TEXT NOT NULL,
    "upassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "ptitle" TEXT NOT NULL,
    "pdesc" TEXT NOT NULL,
    "pstacks" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_uemail_key" ON "users"("uemail");

-- CreateIndex
CREATE UNIQUE INDEX "projects_pdesc_key" ON "projects"("pdesc");
