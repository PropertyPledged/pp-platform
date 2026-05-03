<<<<<<< HEAD
import { type Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema.ts",
=======
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
>>>>>>> 7db26543cd9b1505f72515374a6fa3a45e5a9c9b
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
<<<<<<< HEAD
  tablesFilter: ["pp_*"],
} satisfies Config;
=======
});
>>>>>>> 7db26543cd9b1505f72515374a6fa3a45e5a9c9b
