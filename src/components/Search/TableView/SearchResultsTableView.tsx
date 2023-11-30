import React, { useEffect, useState } from "react";
import "@react-sigma/core/lib/react-sigma.min.css";
import Graph from "graphology";
import {
  ControlsContainer,
  FullScreenControl,
  SigmaContainer,
  ZoomControl,
} from "@react-sigma/core";
import SearchGraphSubplot from "@/components/Search/SearchGraphSubplot";
import { ENTITY_TYPES } from "@/constants/dbProperties";
import { Subplot } from "@/types/subplot";
import { Centroid, Material } from "@/types/entities";
import TableElement from "./TableElement";

export default function SearchResultsTableView({
  data,
}: {
  data: Material[] | undefined;
}) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-4 gap-3">
      {data.map((material) => (
        <TableElement material={material} key={material.name} />
      ))}
    </div>
  );
}
