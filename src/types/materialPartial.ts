import z from "zod";
import { materialBioActivitySchema } from "@/schemas/entities";

export type MaterialBioActivity = z.infer<typeof materialBioActivitySchema>;
