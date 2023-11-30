"use client";
import React, { FC, useEffect } from "react";
import "@react-sigma/core/lib/react-sigma.min.css";
import Graph, { MultiDirectedGraph } from "graphology";
import {
  SigmaContainer,
  useLoadGraph,
  useRegisterEvents,
  useSigma,
} from "@react-sigma/core";
import { useLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import { useEntityDetails } from "@/app/hooks/useEntityDetails";
import { ENTITY_TYPES } from "@/constants/dbProperties";
import { Subplot } from "@/types/subplot";

const SearchGraphSubplot: FC<
  Subplot & { handleNodeClicked: (data: any) => void }
> = ({ type, identity, name, handleNodeClicked }) => {
  const { data, graphologyData } = useEntityDetails({
    identity,
    type,
    name,
  });

  //   useEffect(() => {
  //     console.log(mix);
  //     console.log(graphologyData);
  //   }, [mix, graphologyData]);

  const Graph = React.memo<{ graphologyData: Graph }>(({ graphologyData }) => {
    const loadGraph = useLoadGraph();
    const registerEvents = useRegisterEvents();

    const sigma = useSigma();
    const { assign } = useLayoutForceAtlas2();

    //clear the webgl instance after the graph is unmouted
    useEffect(() => {
      return () => {
        sigma.clear();
      };
    }, []);

    useEffect(() => {
      loadGraph(graphologyData);
      assign();
    }, [graphologyData]);

    useEffect(() => {
      registerEvents({
        // node events
        clickNode: (event) => {
          const { node } = event;
          const identity = sigma.getGraph().getNodeAttribute(node, "identity");
          const type = sigma.getGraph().getNodeAttribute(node, "node_type");
          console.log(sigma.getGraph().getNodeAttributes(node));
          const name = sigma
            .getGraph()
            .getNodeAttribute(node, "label")
            .toLowerCase() as string;

          handleNodeClicked({
            identity,
            type: ENTITY_TYPES[type as keyof typeof ENTITY_TYPES],
            name,
          });
        },
      });
    }, [registerEvents]);

    return null;
  });

  if (!graphologyData) return null;

  return (
    <SigmaContainer
      style={{ height: "400px", backgroundColor: "#F2E3D5" }}
      settings={{ renderEdgeLabels: true }}
    >
      <Graph graphologyData={graphologyData} />
    </SigmaContainer>
  );
};

export default SearchGraphSubplot;
