import { CEMENT_TYPE } from "@/constants/dbProperties";
import { dbSession } from "@/server/db";
import { Mix } from "@/types/entities";
import { MaterialBioActivity } from "@/types/materialPartial";

/*
* NOTE: This script is assuming the database is already partially seeded using the python script
*
* the data has the following properties:
SET m.overview = material.abstract
SET m.applications = material.abstract
SET m.abstract = material.abstract
SET m.report_type = "scientific_report"
SET m.doi = material.url
SET m.year = "2023"
SET m.formulaName = material.title
SET m.authors = "Lyla Wu"
SET m.embeddings = material.abstract_embedding
*/

const ELEMENTS = [
  "H20",
  "SI",
  "CA",
  "AL",
  "FE",
  "NA",
  "K",
  "MG",
  "S",
  "CL",
  "C",
  "O",
  "N",
  "P",
  "TI",
  "MN",
  "F",
  "CR",
  "Z",
  "CU",
  "NI",
  "MO",
  "CO",
  "V",
  "W",
  "PB",
  "B",
  "AS",
  "SE",
  "SN",
  "SB",
  "BE",
  "ZR",
];

const generateRandomMix = () => {
  const density = Math.floor(Math.random() * 100);
  const strength = Math.floor(Math.random() * 100);
  const densityUnit = "kg/m3";
  const strengthUnit = "MPa";
  const name = `Mix ${Math.floor(Math.random() * 100)}`;

  const cementType = CEMENT_TYPE[Math.floor(Math.random() * (CEMENT_TYPE?.length ?? 0))]?.value;

  const elementIdx = Math.floor(Math.random() * (ELEMENTS.length - 5));
  const mixElements = ELEMENTS.slice(elementIdx, elementIdx + 5).map((element) => {
    return {
      name: element,
      amount: Math.random() * 100,
      unit: "g",
    };
  });

  const mechanicalProperties = [
    {
      name: "density",
      amount: density,
      unit: densityUnit,
    },
    {
      name: "strength",
      amount: strength,
      unit: strengthUnit,
    },
  ];

  return {
    name,
    mechanicalProperties,
    cementType,
    elements: mixElements,
  } as Mix;
};

const generateRandomNumberOfMixes = () => {
  const mixes = [];
  const numMixes = Math.floor(Math.random() * 5) + 1;
  for (let i = 0; i < numMixes; i++) {
    mixes.push(generateRandomMix());
  }
  return mixes;
};

const generateRandomBioactivity = () => {
  const numberInvertebrate = Math.floor(Math.random() * 100);
  const numberInvasive = Math.floor(Math.random() * 100);
  const numberCryptogenic = Math.floor(Math.random() * 100);
  const materialPH = Math.random() * 14;
  const totalNumSpecies = Math.floor(Math.random() * 100);
  const totalNumDays = Math.floor(Math.random() * 100);

  return {
    numberInvertebrate,
    numberInvasive,
    numberCryptogenic,
    materialPH,
    totalNumSpecies,
    totalNumDays,
  } as MaterialBioActivity;
};

const GET_ALL_MATERIALS = `
MATCH (m:Material)
RETURN id(m) as id
`;

const ADD_MIX_AND_BIOACTIVITY = `
MATCH (m:Material)
WHERE id(m) = $id
SET m.numberInvertebrate = $bioactivity.numberInvertebrate, m.numberInvasive = $bioactivity.numberInvasive, m.numberCryptogenic = $bioactivity.numberCryptogenic, m.materialPH = $bioactivity.materialPH, m.totalNumSpecies = $bioactivity.totalNumSpecies, m.totalNumDays = $bioactivity.totalNumDays
WITH m
UNWIND $mixes as mix
MERGE (mx:Mix {name: mix.name, cementType: mix.cementType})
SET mx.density = mix.mechanicalProperties[0].amount, mx.densityUnit = mix.mechanicalProperties[0].unit, mx.strength = mix.mechanicalProperties[1].amount, mx.strengthUnit = mix.mechanicalProperties[1].unit
MERGE (m)-[:HAS_MIX]->(mx)
WITH mx, mix, m
UNWIND mix.elements as element
MERGE (e:Element {name: element.name})
MERGE (mx)-[:HAS_ELEMENT {amount: element.amount, unit: element.unit}]->(e)
`;

const seedDb = async () => {
  const result = await dbSession.executeRead((tx) => tx.run(GET_ALL_MATERIALS, {}));

  const ids = result.records.map((record) => record.get("id"));
  //   console.log(ids);

  for (const id of ids) {
    const mixes = generateRandomNumberOfMixes();
    const bioactivity = generateRandomBioactivity();

    await dbSession.executeWrite((tx) =>
      tx.run(ADD_MIX_AND_BIOACTIVITY, {
        id,
        bioactivity,
        mixes,
      }),
    );
  }

  console.log("done");
};

seedDb();
