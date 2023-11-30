import { dbSession } from "@/server/db";
import type { BaseQueryResponse, Filters } from "@/types/queries";
import type { Material, Paper, Mix } from "@/types/entities";
import { ENTITY_TYPES } from "@/constants/dbProperties";
import { materialSchema } from "@/schemas/entities";

const QUERY_WITH_SEARCH = `
MATCH(m:Material)
WHERE m.name = $query

OPTIONAL MATCH (m)-[hm:HAS_MIX]->(mx:Mix)
OPTIONAL MATCH (mx)-[he:HAS_ELEMENT]->(e:Element)

WITH collect({name: e.name, amount: he.amount, unit: he.unit}) as allElements, mx, m, e, he, hm

WITH collect({name: mx.name, cementType: "cement", mechanicalProperties: [{name: "density", amount: mx.density, unit: mx.densityUnit}, {name: "strength", amount: mx.strength, unit: mx.strengthUnit}], elements: allElements}) as mixes, m //e, he, hm, mx

WITH collect({name: m.name, overview: "my material", mixes: mixes}) as data, collect(DISTINCT m) as allMaterials

RETURN data, allMaterials as _nodes, [] as _relationships 
    `;

const QUERY_WITHOUT_SEARCH = `
MATCH(m:Material)
MATCH(m)-[:PART_OF_CLUSTER]->(c:Centroid)
OPTIONAL MATCH (m)-[hm:HAS_MIX]->(mx:Mix)
OPTIONAL MATCH (mx)-[he:HAS_ELEMENT]->(e:Element)

WITH collect({name: e.name, amount: he.amount, unit: he.unit}) as allElements, mx, m, e, he, hm, c

WITH collect({name: mx.name, cementType: "cement", mechanicalProperties: [{name: "density", amount: mx.density, unit: mx.densityUnit}, {name: "strength", amount: mx.strength, unit: mx.strengthUnit}], elements: allElements}) as mixes, m, c //e, he, hm, mx

WITH collect({name: m.name, metadata: {overview: m.overview}, elementId: id(m), identity: id(m), tsne_x: m.tsne_x, tsne_y: m.tsne_y, mixes: mixes, centroid: {id: c.id, title: c.title}}) as data, collect(DISTINCT m) as allMaterials

RETURN data, [] as _nodes, [] as _relationships 
    `;

export async function getSearchResults(query: string, filters?: Filters) {
  //In the future this should probably be an api route
  const result = await dbSession.executeRead((tx) =>
    tx.run(query !== "" ? QUERY_WITH_SEARCH : QUERY_WITHOUT_SEARCH, {
      query: query,
    }),
  );

  if (!result.records[0] || !result.records[0].get("data"))
    throw new Error("No data returned");

  const relationships = result.records[0]!.get("_relationships");
  const elements = result.records[0]!.get("_nodes");
  const data = result.records[0]!.get("data");
  console.log(data);

  return { data, elements, relationships } as BaseQueryResponse<Material[]>;
}
