import { ENTITY_TYPES, NODE_COLOR_MAPPING } from "@/constants/dbProperties";
import { getEntityDetails } from "@/server/db/getEntityDetails";
import { getSearchResults } from "@/server/db/getSearchResults";
import { MultiDirectedGraph } from "graphology";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import type { Filters } from "@/types/queries";
import { Centroid } from "@/types/entities";
import iwanthue from "iwanthue";

const palette = iwanthue(10, { seed: "Material Atlas" });
const centroidColorOptions = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
];

export function useSearchResults(query: string, filters?: Filters) {
  //Will be an API req in the future
  const queryFn = async () => {
    const res = await getSearchResults(query, filters);
    if (!res) throw new Error("No data returned");

    return res;
  };

  const {
    data: queryRes,
    isLoading,
    error,
  } = useQuery(["entityDetails", query, filters], queryFn, {
    enabled: true,
    refetchOnWindowFocus: false,
  });

  let uniqueCentroids: Centroid[] = [];
  let centroidColorMapping: Record<string, string> = {};

  const graphologyData = useMemo(() => {
    if (!queryRes) return null;
    uniqueCentroids = [];
    centroidColorMapping = {};
    palette.reverse();
    const graph = new MultiDirectedGraph();

    const { data, elements, relationships } = queryRes;
    // console.log(elements);

    const graphologyData = {
      nodes: data.map((material) => {
        const centroid = material.centroid as Centroid;
        // console.log(centroid, palette.pop());
        if (!centroidColorMapping[centroid.title]) {
          centroidColorMapping[centroid.title] = palette.pop() as string;
          //add the color to the centroid using iwanthue
          centroid.color = centroidColorMapping[centroid.title];
          uniqueCentroids.push(centroid);
        }
        console.log(uniqueCentroids);

        return {
          key: material.elementId!,
          attributes: {
            label: material.name.substring(0, 10) + "...",
            identity: material.identity,
            size: 15,
            x: material.tsne_x,
            y: material.tsne_y,
            color: centroidColorMapping[centroid.title],
          },
        };
      }),

      //   nodes: elements.map((element: any) => {
      //     const centroid = element.properties.centroid as Centroid;
      //     if (!uniqueCentroidIds.has(centroid.id)) {
      //       //add the color to the centroid using iwanthue
      //       centroid.color = palette.pop();
      //       uniqueCentroids.push(centroid);
      //     }

      //     return {
      //       key: element.elementId,
      //       attributes: {
      //         label: element.properties.name.substring(0, 10) + "...",
      //         identity: element.identity,
      //         size: 15,
      //         x: Math.random(),
      //         y: Math.random(),
      //         color: centroid.color,
      //       },
      //     };
      //   }),

      edges: [],
    };

    graph.import(graphologyData);

    return graph;
  }, [queryRes]);

  return {
    data: queryRes?.data,
    isLoading,
    error,
    graphologyData,
    centroids: uniqueCentroids,
  };
}
