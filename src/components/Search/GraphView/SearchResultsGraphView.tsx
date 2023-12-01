import React, { useEffect, useState } from "react";
import { SearchResultsGraph } from "./SearchResultsGraph";
import "@react-sigma/core/lib/react-sigma.min.css";
import Graph from "graphology";
import { ControlsContainer, FullScreenControl, SigmaContainer, ZoomControl } from "@react-sigma/core";
import SearchGraphSubplot from "@/components/Search/GraphView/SearchGraphSubplot";
import { ENTITY_TYPES } from "@/constants/dbProperties";
import { Subplot } from "@/types/subplot";
import { Material } from "@/types/entities";

export default function SearchResultsGraphView({
  graphologyData,
  centroidColorMapping,
  showMaterialInfo,
}: {
  graphologyData: Graph | null;
  centroidColorMapping: Record<string, string>;
  showMaterialInfo: (material: Material) => void;
}) {
  const [subplots, setSubplots] = useState<Subplot[]>([]);

  const handleNodeClicked = async ({ identity, type, name }: Subplot) => {
    console.log("CLICKED", identity, type, name);
    setSubplots((prev) => [...prev, { type: type as ENTITY_TYPES, identity, name }]);
  };

  const removeSubplot = (index: number) => {
    setSubplots((prev) => {
      const newSubplots = [...prev];
      newSubplots.splice(index, 1);
      return newSubplots;
    });
  };

  useEffect(() => {
    console.log(centroidColorMapping);
  }, [centroidColorMapping]);

  return (
    <>
      <div className="mt-4 rounded-lg bg-ivory p-4">
        <h1 className="mb-2 font-mono text-xl">material database</h1>

        <div className="d-flex justify-content-between mt-1 flex-row">
          {Object.entries(centroidColorMapping).map(([key, value], i) => (
            <div className="flex flex-row items-center" key={i}>
              <div className="mr-2 h-4 w-4 rounded-full" style={{ backgroundColor: value }}></div>
              <p className="text-sm">{key}</p>
            </div>
          ))}
        </div>

        <SigmaContainer
          style={{ height: "400px", backgroundColor: "#F2E3D5" }}
          settings={{
            labelDensity: 0.07,
            labelGridCellSize: 10,
            labelRenderedSizeThreshold: 9,
            labelFont: "Lato, sans-serif",
            zIndex: true,
          }}
        >
          <SearchResultsGraph graphologyData={graphologyData} handleNodeClicked={handleNodeClicked} />
          {/* <ControlsContainer position={"bottom-right"}>
            <ZoomControl />
            <FullScreenControl />
          </ControlsContainer> */}
        </SigmaContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {subplots.map((subplot, i) => (
          <div className="col-span-1 rounded-lg bg-ivory p-3" key={`${JSON.stringify(subplot.identity)}${subplot.type}${i}`}>
            <div className="flex justify-between">
              <h1 className="mb-2 font-mono text-lg">
                {ENTITY_TYPES[subplot.type]}: {subplot.name}
              </h1>
              <h2 className="cursor-pointer" onClick={() => removeSubplot(i)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black hover:text-red-800" // Customize the width, height, and colors
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </h2>
            </div>
            <SearchGraphSubplot {...subplot} handleNodeClicked={handleNodeClicked} showMaterialInfo={showMaterialInfo} />
          </div>
        ))}
      </div>
    </>
  );
}
