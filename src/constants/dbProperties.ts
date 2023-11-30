export const CEMENT_TYPE = [
  { value: "cement", displayName: "Cement" },
  { value: "lime", displayName: "Lime" },
  {
    value: "geopolymer",
    displayName: "Geopolymer (sodium silicate+sodium hydroxide)",
  },
  {
    value: "pozzolanic",
    displayName:
      "Pozzolanic material - volcanic ash, fly ash, blast furnace slag, silica fume, quartz, metakaolin",
  },
  { value: "magnesium-based", displayName: "Magnesium-based" },
  { value: "calcium aluminate", displayName: "Calcium aluminate" },
  {
    value: "biopolymer",
    displayName:
      "Biopolymer (polysaccharides, alginate, bacterial cellulose, chitosan)",
  },
  { value: "aggregate", displayName: "Aggregate (fine, coarse, other)" },
  { value: "water", displayName: "Water" },
  {
    value: "admixture",
    displayName:
      "Admixture (air entraining agent, water-reducing admixture, pozzolanic materials, palm oil fuel ash, rice husk ash, metakaolin, diatomaceous earth, zeolite, plasticizer)",
  },
  {
    value: "reinforcement",
    displayName: "Reinforcement (fiber, 3d spacer, rebar)",
  },
];

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
