"use client";
import React, { useState } from "react";
import "@react-sigma/core/lib/react-sigma.min.css";
import Link from "next/link";
import iwanthue from "iwanthue";
import { useSearchResults } from "../hooks/useSearchResults";
import { ENTITY_TYPES } from "@/constants/dbProperties";
import { Subplot } from "@/types/subplot";
import { SearchResultsGraph } from "@/components/Search/SearchResultsGraph";
import SearchBar from "@/components/Search/SearchBar";
import { SearchResultsViewTab } from "@/components/Search/SearchResultsViewTab";
import SearchResultsGraphView from "@/components/Search/SearchResultsGraphView";
import SearchResultsTableView from "@/components/Search/TableView/SearchResultsTableView";

export default function databasePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultsView, setSearchResultsView] = useState<"graph" | "table">(
    "graph",
  );

  const { data, graphologyData, centroidColorMapping } =
    useSearchResults(searchQuery);

  //   const showMaterialDrawer = (material: any) => {
  //     setSelectedMaterial(material);
  //     setIsMaterialDrawerOpen(true);
  //   };

  //   const closeMaterialDrawer = () => {
  //     setIsMaterialDrawerOpen(false);
  //   };

  return (
    <div className="h-full p-4">
      {/* <Drawer
        title="Material Info"
        placement="right"
        onClose={closeMaterialDrawer}
        open={isMaterialDrawerOpen}
      >
        <p>{JSON.stringify(selectedMaterial)}</p>
      </Drawer> */}

      <div className="my-3 mb-4">
        <h1 className="font-mono text-xl">Instructions</h1>
        <p className="text-md font-mono">
          Click on a paper in the graph to see its materials. If you have a
          material selected, the details will appear in the right-side drawer.
          Explore the paper database visualization, which provides a graphical
          representation of papers and their relationships. Click on nodes in
          the graph to interact with specific papers. If you want to filter the
          content or customize your view, click on the "Filters" text in the
          "Paper Database" section.
        </p>
      </div>

      <div className="my-3 flex items-center justify-between">
        <SearchResultsViewTab
          onTabChange={setSearchResultsView}
          selectedTab={searchResultsView}
        />
        <h2 className="cursor-pointer font-mono text-lg text-blue-500 hover:text-blue-600">
          filters
        </h2>
      </div>

      <SearchBar setSearchQuery={setSearchQuery} />

      {searchResultsView === "graph" && graphologyData ? (
        <SearchResultsGraphView
          graphologyData={graphologyData}
          centroidColorMapping={centroidColorMapping}
        />
      ) : (
        <SearchResultsTableView data={data} />
      )}
    </div>
  );
}
