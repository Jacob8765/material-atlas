//prettier-ignore
"use server"

import { dbSession } from "@/server/db";
import type { Material, Paper, Mix } from "@/types/entities";
import { materialSchema } from "@/schemas/entities";
import { getServerAuthSession } from "../auth";

const QUERY = `
MATCH (u:User {id: $id})
MATCH (c:Centroid)
WITH $data as data_list, u, c LIMIT 1
UNWIND data_list AS data
MERGE (m:Material {name: data.name})
MERGE (u)-[:OWNS_MATERIAL]->(m)
MERGE (m)-[:PART_OF_CLUSTER]->(c)
SET m.overview = data.overview
SET m.applications = data.applications
SET m.numberInvertebrate = m.totalNumSpecies = data.bioactivity.totalNumSpecies, m.totalNumDays = data.bioactivity.totalNumDays
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
  const session = await getServerAuthSession();
  if (!session) throw new Error("Not authenticated");
  console.log("id", session.user.id);

  try {
    const parsedData = materialSchema.parse(data);

    const result = await dbSession.executeWrite((tx) => tx.run(QUERY, { data: parsedData, id: session.user.id }));

    console.log(result);
  } catch (e) {
    console.log(e);
    throw new Error("An error occured while uploading material");
  }
}
