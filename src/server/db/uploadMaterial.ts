import { dbSession } from "@/server/db";
import type { BaseQueryResponse, Filters } from "@/types/queries";
import type { Material, Paper, Mix } from "@/types/entities";
import { ENTITY_TYPES } from "@/constants/dbProperties";
import { materialSchema } from "@/schemas/entities";

const QUERY = `
WITH $data as data_list
UNWIND data_list AS data
MERGE (m:Material {name: data.name})
SET m.overview = data.overview
WITH m, data
UNWIND data.mixes AS mix
MERGE (mx:Mix {name: mix.name})
SET mx.density = mix.mechanicalProperties[0].amount, mx.densityUnit = mix.mechanicalProperties[0].unit, mx.strength = mix.mechanicalProperties[1].amount, mx.strengthUnit = mix.mechanicalProperties[1].unit
MERGE (m)-[:HAS_MIX]->(mx)
WITH m, mix, mx
UNWIND mix.elements AS element
MERGE (e:Element {name: element.name})
MERGE (mx)-[:HAS_ELEMENT {amount: element.amount, unit: element.unit}]->(e)
    `;

export async function uploadMaterial(data: Material) {
  try {
    const parsedData = materialSchema.parse(data);

    const result = await dbSession.executeWrite((tx) =>
      tx.run(QUERY, { data: parsedData }),
    );

    console.log(result);
  } catch (e) {
    console.log(e);
    throw new Error("An error occured while uploading material");
  }
}
