/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `authorId` on the `post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "user";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "views" INTEGER NOT NULL
);
INSERT INTO "new_post" ("id", "slug", "views") SELECT "id", "slug", "views" FROM "post";
DROP TABLE "post";
ALTER TABLE "new_post" RENAME TO "post";
CREATE UNIQUE INDEX "post_slug_key" ON "post"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
