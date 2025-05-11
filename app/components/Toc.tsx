"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const Toc = () => {
  const [highestLevel, setHighestLevel] = useState(1);
  const [headings, setHeadings] = useState<
    {
      id: string;
      title: string;
      level: number;
    }[]
  >([]);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll("article > h1, h2, h3, h4, h5, h6")
    );

    const headings = headingElements.map((element) => ({
      id: element.id,
      title: element.textContent ?? "",
      level: parseInt(element.tagName.slice(1)),
    }));

    const highestLevel = headings.reduce((max, heading) => {
      return Math.max(max, heading.level);
    }, 1);

    setHighestLevel(highestLevel);
    setHeadings(headings);
  }, []);

  return (
    <div className="fixed top-[100px] right-0 bg-white dark:bg-neutral-800 rounded-lg p-1 shadow-2xl dark:shadow-neutral-800 mr-1.5 transform translate-x-[100%] hover:translate-x-0 transition-transform duration-300 ease-in-out group">
      <div className="absolute left-0 p-2 transition-opacity -translate-x-4 -translate-y-1/2 bg-white rounded-l-lg shadow-lg dark:bg-neutral-800 dark:shadow-neutral-800 top-1/2 group-hover:opacity-0">
        <svg
          className="w-4 h-4 transition-opacity duration-300 group-hover:opacity-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
      <div className="transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        {headings.map((heading) => (
          <Link
            key={heading.id}
            href={`#${heading.id}`}
            style={{
              paddingLeft: `${(heading.level - highestLevel) * 0.25}rem`,
            }}
            className="block transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <p className="px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700">
              {heading.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
