import z from "zod";
import { MECHANICAL_PROPERTIES, CEMENT_TYPE } from "@/constants/dbProperties";

const neo4jNumSchema = z.custom((data) => {
  if (typeof data === "number") {
    // If it's already a number, no transformation needed
    return data;
  } else if (typeof data === "string") {
    // If it's a string, parse it
    const parsed = parseFloat(data);
    if (isNaN(parsed)) {
      throw new Error("Invalid amount format");
    }
    return parsed;
  } else if (typeof data === "object" && data !== null && "low" in data) {
    // If it's an object with 'low' property, use the low value
    return data.low;
  } else {
    // In other cases, the data is invalid
    throw new Error("Invalid amount format");
  }
});

export const materialMetadataSchema = z.object({
  overview: z.string(),
  applications: z.string(),
  reportType: z.enum(["scientific_report", "patent_number", "product_data_sheet"]),
  doi: z.string(),
  authors: z.string().describe("First author, or manufacturer name for commercial materials"),
  year: z.string(),
  title: z.string(),
  embeddings: z.array(z.number()).optional().nullable(),
  abstract: z.string().optional().describe("Abstract of the paper"),
  formulaName: z.string(),
});

export const materialBioActivitySchema = z.object({
  numberInvertebrate: z.number().optional(),
  numberInvasive: z.number().optional(),
  numberCryptogenic: z.number().optional(),
  materialPH: z.number().optional(),
  totalNumSpecies: z.number().optional(),
  totalNumDays: z.number().optional(),
});

export const paperSchema = z.object({
  reportType: z.enum(["scientific_report", "patent_number", "product_data_sheet"]),
  doi: z.string(),
  authors: z.string().describe("First author, or manufacturer name for commercial materials"),
  year: z.string(),
  title: z.string(),
  abstract: z.string().optional().describe("Abstract of the paper"),
});

export const elementSchema = z
  .object({
    name: z.string(),
    amount: neo4jNumSchema,
    unit: z.enum(["g", "kg", "%"]),
  })
  .describe("Each element present in the current mix, as well as its amount and unit");

export const mixSchema = z.object({
  name: z.string(),
  cementType: z.enum(CEMENT_TYPE.map((cementType) => cementType.value) as [string, ...string[]]),
  elements: z.array(elementSchema),
  mechanicalProperties: z.array(
    z.object({
      name: z.enum(MECHANICAL_PROPERTIES.map((mp) => mp.value) as [string, ...string[]]),
      amount: neo4jNumSchema.optional(),
      unit: z.string().optional(),
    }),
  ),
});

export const mixesSchema = z.object({
  mixes: z.array(mixSchema),
});

export const centroidSchema = z.object({
  id: z.string(),
  title: z.string(),
  color: z.string().optional(),
});

export const materialSchema = z
  .object({
    name: z.string(),
    elementId: z.string().optional(),
    identity: z.string().optional(),
    tsne_x: z.number().optional(),
    tsne_y: z.number().optional(),
  })
  .merge(z.object({ metadata: materialMetadataSchema }))
  .merge(mixesSchema)
  .merge(z.object({ centroid: centroidSchema.optional() }))
  .merge(z.object({ bioactivity: materialBioActivitySchema }));
//   .merge(z.object({ paper: paperSchema.optional() }));
