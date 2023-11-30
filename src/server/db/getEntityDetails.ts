import { dbSession } from "@/server/db";
import type { BaseQueryResponse } from "@/types/queries";
import type { Material, Paper, Mix, Element } from "@/types/entities";
import { ENTITY_TYPES } from "@/constants/dbProperties";
import { materialSchema } from "@/schemas/entities";
import { Subplot } from "@/types/subplot";

const QUERY_MAPPING: Record<ENTITY_TYPES, string> = {
  [ENTITY_TYPES.Material]: `
  MATCH(m:Material)
  WHERE id(m) = $id
  OPTIONAL MATCH (m)-[hm:HAS_MIX]->(mx:Mix)
  OPTIONAL MATCH (mx)-[he:HAS_ELEMENT]->(e:Element)
  
  WITH collect({name: e.name, amount: he.amount, unit: he.unit}) as allElements, mx, m, e, he, hm
  
  WITH collect({name: mx.name, cementType: "cement", mechanicalProperties: [{name: "density", amount: mx.density, unit: mx.densityUnit}, {name: "strength", amount: mx.strength, unit: mx.strengthUnit}], elements: allElements}) as mixes, collect(distinct e) + collect(DISTINCT mx) as _nodes, collect(DISTINCT he) + collect(DISTINCT hm) as _relationships, m //e, he, hm, mx
  
  return {name: m.name, overview: "my material", mixes: mixes} as data, _nodes + m as _nodes, _relationships
    `,
  [ENTITY_TYPES.Paper]: `
        MATCH (paper:Paper {elementId: $elementId})
        RETURN paper, paper.elementId AS elementId
    `,
  [ENTITY_TYPES.Mix]: `
  MATCH(mx:Mix)
  WHERE id(mx) = $id
  OPTIONAL MATCH (mx)-[he:HAS_ELEMENT]->(e:Element)
  
  WITH collect({name: e.name, amount: he.amount, unit: he.unit}) as allElements, collect(DISTINCT e) as all_e, collect(DISTINCT he) as all_he, mx
  
  OPTIONAL MATCH (m:Material)-[hm:HAS_MIX]->(mx)
  
  WITH mx, {name: mx.name, cementType: "cement", mechanicalProperties: [{name: "density", amount: mx.density, unit: mx.densityUnit}, {name: "strength", amount: mx.strength, unit: mx.strengthUnit}], elements: allElements} as mix, collect(DISTINCT m) as all_m, collect(DISTINCT hm) as all_hm, all_he, all_e
  
  //WITH mix, materialNodes, collect(DISTINCT he) + collect(DISTINCT hm) as relationships, mx
  
  RETURN mix as data, all_m + mx + all_e as _nodes, all_he + all_hm as _relationships
  
    `,
  [ENTITY_TYPES.Element]: `
  MATCH(e:Element)
  WHERE id(e) = $id
  OPTIONAL MATCH (mx)-[he:HAS_ELEMENT]->(e:Element)
  
  WITH {name: e.name} as data, collect(DISTINCT mx) as all_mx, collect(DISTINCT he) as all_he, e
 
  RETURN data, all_mx + e as _nodes, all_he as _relationships
    `,
};

export async function getEntityDetails({ identity, name, type }: Subplot) {
  //In the future this should probably be an api route
  const result = await dbSession.executeRead((tx) =>
    tx.run(QUERY_MAPPING[type], { id: identity }),
  );

  if (!result.records[0] || !result.records[0].get("data"))
    throw new Error("No data returned");

  const relationships = result.records[0]!.get("_relationships");
  const elements = result.records[0]!.get("_nodes");
  const data = result.records[0]!.get("data");
  console.log(data);

  switch (type) {
    case ENTITY_TYPES.Material:
      return { data, elements, relationships } as BaseQueryResponse<Material>;
    case ENTITY_TYPES.Mix:
      console.log("returning mix", data);
      return { data, elements, relationships } as BaseQueryResponse<Mix>;
    // case ENTITY_TYPES.Mix:
    //   return (result.records[0]?.get("mix") as Mix) ?? null;
    case ENTITY_TYPES.Element:
      return { data, elements, relationships } as BaseQueryResponse<Element>;
  }
}
