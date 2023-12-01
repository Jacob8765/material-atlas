"use client";
import React, { FC, useEffect } from "react";
import "@react-sigma/core/lib/react-sigma.min.css";
import Graph from "graphology";
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
import { Material } from "@/types/entities";

interface SearchGraphSubplotProps extends Subplot {
  handleNodeClicked: (data: any) => void;
  showMaterialInfo: (material: Material) => void;
}

const SearchGraphSubplot: FC<SearchGraphSubplotProps> = ({
  type,
  identity,
  name,
  handleNodeClicked,
  showMaterialInfo,
}) => {
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
        clickNode: (event) => {
          const { node } = event;
          const identity = sigma.getGraph().getNodeAttribute(node, "identity");
          const type = sigma.getGraph().getNodeAttribute(node, "node_type");
          const name = sigma.getGraph().getNodeAttribute(node, "label");

          //if the user clicks on the material for the current subplot, show the material info. else, show the hierarchy
          if (
            ENTITY_TYPES[type as keyof typeof ENTITY_TYPES] ===
              ENTITY_TYPES.Material &&
            data &&
            name === data.name
          ) {
            showMaterialInfo(data as Material);
          } else {
            handleNodeClicked({
              identity,
              type: ENTITY_TYPES[type as keyof typeof ENTITY_TYPES],
              name,
            });
          }
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
