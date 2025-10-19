-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_workouts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "workoutPlanId" TEXT,
    "assignedBy" TEXT,
    "modality" TEXT NOT NULL,
    "type" TEXT,
    "courseType" TEXT,
    "duration" INTEGER,
    "distance" REAL,
    "pace" TEXT,
    "calories" INTEGER,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "completedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "workouts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "workouts_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "workout_plans" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "workouts_assignedBy_fkey" FOREIGN KEY ("assignedBy") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_workouts" ("calories", "completedAt", "courseType", "createdAt", "distance", "duration", "id", "modality", "notes", "pace", "type", "updatedAt", "userId", "workoutPlanId") SELECT "calories", "completedAt", "courseType", "createdAt", "distance", "duration", "id", "modality", "notes", "pace", "type", "updatedAt", "userId", "workoutPlanId" FROM "workouts";
DROP TABLE "workouts";
ALTER TABLE "new_workouts" RENAME TO "workouts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
