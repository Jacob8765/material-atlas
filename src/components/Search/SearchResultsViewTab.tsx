import React from "react";

interface SearchResultsViewTabProps {
  onTabChange: (tab: "graph" | "table") => void;
  selectedTab: "graph" | "table";
}

interface TabData {
  label: string;
  value: "graph" | "table";
}

export function SearchResultsViewTab({
  onTabChange,
  selectedTab,
}: SearchResultsViewTabProps) {
  const data: TabData[] = [
    {
      label: "Graph",
      value: "graph",
    },
    {
      label: "Table",
      value: "table",
    },
  ];

  return (
    <div className="rounded-lg bg-gray-100 py-1">
      {data.map((tab) => (
        <button
          key={tab.value}
          className={`mx-1 rounded-lg ${
            selectedTab == tab.value ? "bg-gray-300" : "bg-gray-200"
          } p-1 px-3 hover:bg-gray-300`}
          onClick={() => onTabChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
