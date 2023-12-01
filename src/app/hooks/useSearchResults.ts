import { getSearchResults } from "@/server/db/getSearchResults";
import { MultiDirectedGraph } from "graphology";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import type { Filters } from "@/types/queries";
import { convertSearchResultsToGraph } from "@/utils/convertSearchResultsToGraph";

// Will be an API req in the future
const queryFn = async (query: string, filters?: Filters) => {
  const res = await getSearchResults(query, filters);
  if (!res) throw new Error("No data returned");

  return res;
};

export function useSearchResults(query: string, filters?: Filters) {
  const [graphologyData, setGraphologyData] = useState<MultiDirectedGraph>();
  const [centroidColorMapping, setCentroidColorMapping] = useState<
    Record<string, string>
  >({});

  const {
    data: queryRes,
    isLoading,
    error,
  } = useQuery(
    ["entityDetails", query, filters],
    () => queryFn(query, filters),
    {
      enabled: true,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (!queryRes) return;
    const { graph, centroidColorMapping } =
      convertSearchResultsToGraph(queryRes);
    setGraphologyData(graph);
    setCentroidColorMapping(centroidColorMapping);
  }, [queryRes]);

  return {
    data: queryRes?.data,
    isLoading,
    error,
    graphologyData,
    centroidColorMapping,
  };
}
