/*
  Warnings:

  - You are about to alter the column `views` on the `post` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "views" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_post" ("authorId", "id", "slug", "views") SELECT "authorId", "id", "slug", "views" FROM "post";
DROP TABLE "post";
ALTER TABLE "new_post" RENAME TO "post";
CREATE UNIQUE INDEX "post_slug_key" ON "post"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
