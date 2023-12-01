import { dbSession } from "@/server/db";
import type { BaseQueryResponse, Filters } from "@/types/queries";
import type { Material, Paper, Mix } from "@/types/entities";

const BASE_QUERY = `
MATCH(m)-[:PART_OF_CLUSTER]->(c:Centroid)
OPTIONAL MATCH (m)-[hm:HAS_MIX]->(mx:Mix)
OPTIONAL MATCH (mx)-[he:HAS_ELEMENT]->(e:Element)

WITH collect({name: e.name, amount: he.amount, unit: he.unit}) as allElements, mx, m, e, he, hm, c
WITH collect({name: mx.name, cementType: "cement", mechanicalProperties: [{name: "density", amount: mx.density, unit: mx.densityUnit}, {name: "strength", amount: mx.strength, unit: mx.strengthUnit}], elements: allElements}) as mixes, m, c //e, he, hm, mx
WITH collect({name: m.name, metadata: {overview: m.overview}, elementId: id(m), identity: id(m), tsne_x: m.tsne_x, tsne_y: m.tsne_y, mixes: mixes, centroid: {id: c.id, title: c.title}}) as data, collect(DISTINCT m) as allMaterials

RETURN data, [] as _nodes, [] as _relationships 
`;

const NO_SEARCH = `
MATCH(m:Material)
${BASE_QUERY}
`;

const WITH_MATERIAL_NAME_SEARCH = `
MATCH(m:Material)
WHERE m.name CONTAINS $query
${BASE_QUERY}
`;

const WITH_MATERIAL_EMBEDDING_SEARCH = `
call db.index.vector.queryNodes('material-embeddings', 3, $embedding) YIELD node as m, score
${BASE_QUERY}
`;

export async function getSearchResults(query: string, filters?: Filters) {
  const data = [];
  const queryLength = query.split(" ").length;

  try {
    if (query !== "") {
      if (queryLength > 4) {
        // if the user types in 4 or more words, we assume they are trying to search by embedding
        const queryEmbedding = query.split(" ").map((q) => parseFloat(q)); //TODO: replace with actual embedding

        const dbQuery = await dbSession.executeRead((tx) =>
          tx.run(WITH_MATERIAL_EMBEDDING_SEARCH, {
            embedding: queryEmbedding,
          }),
        );

        const searchResults = dbQuery.records[0]!.get("data");
        data.push(...searchResults);
      }

      const dbQuery = await dbSession.executeRead((tx) =>
        tx.run(WITH_MATERIAL_NAME_SEARCH, {
          query: query,
        }),
      );

      const searchResults = dbQuery.records[0]!.get("data");
      data.push(...searchResults);
    } else {
      console.log("getting all materials");
      const dbQuery = await dbSession.executeRead((tx) =>
        tx.run(NO_SEARCH, {}),
      );

      const searchResults = dbQuery.records[0]!.get("data");
      data.push(...searchResults);
    }
  } catch (e) {
    console.log(e);
    throw new Error("An error occured while searching for materials");
  }

  return { data } as BaseQueryResponse<Material[]>;
}
