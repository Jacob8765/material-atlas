import { ENTITY_TYPES } from "@/constants/dbProperties";

interface Identity {
  low: number;
  high: number;
}

export interface Subplot {
  type: ENTITY_TYPES;
  identity: Identity;
  name: string;
}
