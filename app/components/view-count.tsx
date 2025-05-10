import { getViewsCount, incrementView } from "queries/db";

interface ViewCountProps {
  slug: string;
}

export const ViewCount = async ({ slug }: ViewCountProps) => {
  if (process.env.NODE_ENV === "production") {
    await incrementView(slug);
  }

  const views = await getViewsCount();
  const count = views.find((view) => view.slug === slug)?.count ?? 0;

  return (
    <p className="text-sm text-neutral-600 dark:text-neutral-400">
      {count} views
    </p>
  );
};
