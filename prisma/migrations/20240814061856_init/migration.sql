-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "core";

-- CreateTable
CREATE TABLE "core"."user" (
    "id" VARCHAR(64) NOT NULL,
    "address" VARCHAR(256) NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "password" VARCHAR(256) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_address_key" ON "core"."user"("address");

-- CreateIndex
CREATE UNIQUE INDEX "user_name_key" ON "core"."user"("name");
