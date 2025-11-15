"use client";

import { useEffect, useState } from "react";

export default function Features() {
  const [icons, setIcons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadIcons() {
      try {
        const res = await fetch(
          "https://api.iconify.design/collection?prefix=fluent-emoji-flat"
        );

        const data = await res.json();
        console.log("Full data:", data);

        // categories is like: { "Animals & Nature": ["dog", "cat"], ... }
        const categories = data.categories || {};

        let merged: string[] = [];

        // Loop each category
        for (const categoryName in categories) {
          const arr = categories[categoryName]; // array of icon names
          merged = merged.concat(arr);
        }

        // Remove duplicates just in case
        merged = [...new Set(merged)];

        setIcons(merged);
      } catch (err) {
        console.error("Error fetching icons:", err);
      } finally {
        setLoading(false);
      }
    }

    loadIcons();
  }, []);

  if (loading) return <p>Loading icons...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>All Fluent Emoji Flat Icons (merged)</h1>
      <p>Total icons: {icons.length}</p>

      <pre
        style={{
          maxHeight: "500px",
          overflowY: "auto",
          background: "#222",
          color: "lime",
          padding: 20,
          borderRadius: 8,
          whiteSpace: "pre-wrap",
        }}
      >
        {JSON.stringify(icons, null, 2)}
      </pre>
    </div>
  );
}
