"use client";
import React, { useEffect } from "react";

import "@react-sigma/core/lib/react-sigma.min.css";
import type Graph from "graphology";
import { useLoadGraph, useRegisterEvents, useSigma } from "@react-sigma/core";
import { ENTITY_TYPES } from "@/constants/dbProperties";

export const SearchResultsGraph = React.memo<{
  graphologyData: Graph | null;
  handleNodeClicked: (props: any) => void;
}>(({ graphologyData, handleNodeClicked }) => {
  const loadGraph = useLoadGraph();
  const registerEvents = useRegisterEvents();

  const sigma = useSigma();

  //clear the webgl instance after the graph is unmouted
  useEffect(() => {
    return () => {
      sigma.clear();
    };
  }, []);

  useEffect(() => {
    if (!graphologyData) return;
    loadGraph(graphologyData);
  }, [graphologyData]);

  useEffect(() => {
    registerEvents({
      // node events
      clickNode: (event) => {
        const { node } = event;
        const identity = sigma.getGraph().getNodeAttribute(node, "identity");
        console.log("LOGGING", identity);
        console.log(sigma.getGraph().getNodeAttributes(node));
        const name = sigma
          .getGraph()
          .getNodeAttribute(node, "label")
          .toLowerCase() as string;

        handleNodeClicked({
          identity,
          type: ENTITY_TYPES.Material,
          name,
        });
      },
    });
  }, [registerEvents]);

  return null;
});
