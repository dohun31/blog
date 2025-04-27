"use server";

import { unstable_noStore as noStore } from "next/cache";

import { sql } from "./sql";

export const incrementView = async (slug: string) => {
  "use server";

  await sql`INSERT INTO views (slug, count)
    VALUES (${slug}, 1)
    ON CONFLICT (slug) DO UPDATE SET count = views.count + 1
  `;
};

export const getViewsCount = async (): Promise<
  { slug: string; count: number }[]
> => {
  "use server";

  if (!process.env.POSTGRES_URL) {
    return [];
  }

  noStore();
  const rows = await sql`SELECT slug, count FROM views`;

  return rows.map((row) => ({
    slug: row.slug,
    count: row.count,
  }));
};
