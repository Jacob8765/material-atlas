import { ENTITY_TYPES, NODE_COLOR_MAPPING } from "@/constants/dbProperties";
import { getEntityDetails } from "@/server/db/getEntityDetails";
import { Subplot } from "@/types/subplot";
import { MultiDirectedGraph } from "graphology";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

export function useEntityDetails({ identity, name, type }: Subplot) {
  //Will be an API req in the future
  const queryFn = async () => {
    const res = await getEntityDetails({ identity, type, name });
    if (!res) throw new Error("No data returned");

    return res;
  };

  const [isEnabled, setIsEnabled] = useState(true);

  const { data, isLoading, error } = useQuery(
    ["entityDetails", identity, type],
    queryFn,
    {
      enabled: isEnabled,
    },
  );

  //We don't need to fetch this data more than once
  useEffect(() => {
    setIsEnabled(false);
  }, [identity, type]);

  const graphologyData = useMemo(() => {
    if (!data) return null;
    const graph = new MultiDirectedGraph();

    const { elements, relationships } = data;
    // console.log(elements);

    const graphologyData = {
      nodes: elements.map((element: any) => ({
        key: element.elementId,
        attributes: {
          label: element.properties.name,
          identity: element.identity,
          node_type: element.labels[0],
          size: 7,
          x: Math.random(),
          y: Math.random(),
          color: NODE_COLOR_MAPPING[element.labels[0] as ENTITY_TYPES],
        },
      })),
      edges: relationships.map((relationship: any) => ({
        key: relationship.elementId,
        source: relationship.startNodeElementId,
        target: relationship.endNodeElementId,
        attributes: {
          label: relationship.type,
        },
      })),
    };
    console.log(graphologyData);

    graph.import(graphologyData);

    return graph;
  }, [data]);

  return { data: data?.data, isLoading, error, graphologyData };
}
