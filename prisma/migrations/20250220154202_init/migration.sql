-- CreateTable
CREATE TABLE "heroes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "element" TEXT NOT NULL,

    CONSTRAINT "heroes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "className" TEXT NOT NULL,

    CONSTRAINT "filters_pkey" PRIMARY KEY ("id")
);
