import z from "zod";
import {
  materialSchema,
  paperSchema,
  mixSchema,
  elementSchema,
  centroidSchema,
} from "@/schemas/entities";

export type Material = z.infer<typeof materialSchema>;
export type Paper = z.infer<typeof paperSchema>;
export type Mix = z.infer<typeof mixSchema>;
export type Element = z.infer<typeof elementSchema>;
export type Centroid = z.infer<typeof centroidSchema>;
