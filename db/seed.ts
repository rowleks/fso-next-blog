import { config } from "dotenv";
config({ path: ".env.local" });

import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { blogs } from "./schema";

const db = drizzle(process.env.DATABASE_URL!, { schema });

const seedData = [
  {
    author: "Robert C. Martin",
    title: "Clean Code",
    url: "https://example.com/clean-code",
    likes: 12,
  },
  {
    author: "Michael Hartl",
    title: "Learn Enough Ruby to Be Dangerous",
    url: "https://www.learnenough.com/ruby",
    likes: 5,
  },
  {
    author: "Dan Abramov",
    title: "Overreacted",
    url: "https://overreacted.io",
    likes: 20,
  },
  {
    author: "Kent C. Dodds",
    title: "How to Write Better Tests",
    url: "https://kentcdodds.com/blog/how-to-write-better-tests",
    likes: 17,
  },
  {
    author: "Josh W. Comeau",
    title: "An Interactive Guide to Flexbox",
    url: "https://www.joshwcomeau.com/css/interactive-guide-to-flexbox",
    likes: 34,
  },
  {
    author: "Tania Rascia",
    title: "Understanding This, Bind, Call, and Apply in JavaScript",
    url: "https://www.taniarascia.com/this-bind-call-apply-javascript",
    likes: 9,
  },
];

async function seed() {
  console.log("Seeding database...");

  await db.insert(blogs).values(seedData);

  console.log(`Inserted ${seedData.length} blog entries.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
