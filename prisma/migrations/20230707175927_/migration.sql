-- CreateTable
CREATE TABLE "Curator" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "totalMovies" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Curator_alias_key" ON "Curator"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "Curator_url_key" ON "Curator"("url");
