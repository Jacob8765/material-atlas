export const CEMENT_TYPE = [
  { value: "cement", displayName: "Cement-Based" },
  {
    value: "geopolymer",
    displayName: "Geopolymer (sodium silicate+sodium hydroxide)",
  },
  {
    value: "biopolymer",
    displayName: "Biopolymer (polysaccharides, alginate, bacterial cellulose, chitosan)",
  },
];

export const CEMENT_TYPE_COLOR_MAPPING: Record<string, string> = {
  cement: "#ff0000",
  geopolymer: "#0000ff",
  biopolymer: "#ff8000",
  other: "#8884d8",
};

export const MECHANICAL_PROPERTIES = [
  {
    value: "density",
    displayName: "Density",
    units: ["kg/m3"],
  },
  {
    value: "strength",
    displayName: "Compressive Strength",
    units: ["MPa"],
  },
  {
    value: "shrinkage",
    displayName: "Shrinkage",
    units: ["%"],
  },
  {
    value: "permeability",
    displayName: "Permeability",
    units: ["m/s"],
  },
  {
    value: "workability",
    displayName: "Workability (Slum test)",
    units: ["mm"],
  },
];

export enum ENTITY_TYPES {
  "Material",
  "Mix",
  "Paper",
  "Element",
}

export const NODE_COLOR_MAPPING: Record<string, string> = {
  Material: "#ff0000",
  Mix: "#00ff00",
  Paper: "#0000ff",
  Element: "#ffff00",
};
