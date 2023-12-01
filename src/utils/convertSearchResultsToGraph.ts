import { Centroid, Material } from "@/types/entities";
import { BaseQueryResponse } from "@/types/queries";
import { MultiDirectedGraph } from "graphology";
import iwanthue from "iwanthue";

export const convertSearchResultsToGraph = (
  searchResults: BaseQueryResponse<Material[]>,
) => {
  const palette = iwanthue(10, { seed: "Material Atlas" });

  const centroidColorMapping: Record<string, string> = {};

  const { data: materials } = searchResults;
  const nodes = [];

  for (const material of materials) {
    const centroid = material.centroid as Centroid;

    if (!centroidColorMapping[centroid.title]) {
      centroidColorMapping[centroid.title] = palette.pop() as string;
      centroid.color = centroidColorMapping[centroid.title];
    }

    nodes.push({
      key: material.elementId!,
      attributes: {
        label: material.name.substring(0, 10) + "...",
        identity: material.identity,
        size: 15,
        x: material.tsne_x,
        y: material.tsne_y,
        color: centroidColorMapping[centroid.title],
      },
    });
  }

  const graph = new MultiDirectedGraph();
  graph.import({
    nodes,
    edges: [],
  });

  return { graph, centroidColorMapping };
};
