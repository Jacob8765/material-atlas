import { RESEARCH_AREAS, ROLE_TYPES } from "@/constants/dbProperties";
import z from "zod";

export const userSchema = z.object({
  userId: z.string().optional(),
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  institution: z.string(),
  researchArea: z.enum(RESEARCH_AREAS as [string, ...string[]]),
  role: z.enum(ROLE_TYPES as [string, ...string[]]),
});
