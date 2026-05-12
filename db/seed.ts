import { config } from "dotenv";
config({ path: ".env.local" });

import { drizzle } from "drizzle-orm/neon-http";
import bcrypt from "bcryptjs";
import * as schema from "./schema";
import { blogs, users } from "./schema";

const db = drizzle(process.env.DATABASE_URL!, { schema });

const usersData = [
  { username: "alice", name: "Alice Johnson", password: "alice123" },
  { username: "bob", name: "Bob Smith", password: "bob123" },
  { username: "charlie", name: "Charlie Brown", password: "charlie123" },
];

const blogsData = [
  { author: "Robert C. Martin", title: "Clean Code", url: "https://example.com/clean-code", likes: 12 },
  { author: "Michael Hartl", title: "Learn Enough Ruby to Be Dangerous", url: "https://www.learnenough.com/ruby", likes: 5 },
  { author: "Dan Abramov", title: "Overreacted", url: "https://overreacted.io", likes: 20 },
  { author: "Kent C. Dodds", title: "How to Write Better Tests", url: "https://kentcdodds.com/blog/how-to-write-better-tests", likes: 17 },
  { author: "Josh W. Comeau", title: "An Interactive Guide to Flexbox", url: "https://www.joshwcomeau.com/css/interactive-guide-to-flexbox", likes: 34 },
  { author: "Tania Rascia", title: "Understanding This, Bind, Call, and Apply in JavaScript", url: "https://www.taniarascia.com/this-bind-call-apply-javascript", likes: 9 },
];

async function seed() {
  console.log("Seeding database...");

  const usersWithHashes = await Promise.all(
    usersData.map(async ({ password, ...rest }) => ({
      ...rest,
      passwordHash: await bcrypt.hash(password, 10),
    })),
  );

  const insertedUsers = await db.insert(users).values(usersWithHashes).returning();
  console.log(`Inserted ${insertedUsers.length} users.`);

  const blogsWithUserIds = blogsData.map((blog) => ({
    ...blog,
    userId: insertedUsers[Math.floor(Math.random() * insertedUsers.length)].id,
  }));

  await db.insert(blogs).values(blogsWithUserIds);

  console.log(`Inserted ${blogsWithUserIds.length} blog entries.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
