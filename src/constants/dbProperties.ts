export const CEMENT_TYPE = [
  { value: "cement", displayName: "Cement" },
  { value: "lime", displayName: "Lime" },
  {
    value: "geopolymer",
    displayName: "Geopolymer (sodium silicate+sodium hydroxide)",
  },
  {
    value: "pozzolanic",
    displayName: "Pozzolanic material - volcanic ash, fly ash, blast furnace slag, silica fume, quartz, metakaolin",
  },
  { value: "magnesium-based", displayName: "Magnesium-based" },
  { value: "calcium aluminate", displayName: "Calcium aluminate" },
  {
    value: "biopolymer",
    displayName: "Biopolymer (polysaccharides, alginate, bacterial cellulose, chitosan)",
  },
  { value: "aggregate", displayName: "Aggregate (fine, coarse, other)" },
  { value: "water", displayName: "Water" },
  {
    value: "admixture",
    displayName: "Admixture (air entraining agent, water-reducing admixture, pozzolanic materials, palm oil fuel ash, rice husk ash, metakaolin, diatomaceous earth, zeolite, plasticizer)",
  },
  {
    value: "reinforcement",
    displayName: "Reinforcement (fiber, 3d spacer, rebar)",
  },
];

export const CEMENT_TYPE_COLOR_MAPPING: Record<string, string> = {
  cement: "#ff0000",
  lime: "#00ff00",
  geopolymer: "#0000ff",
  pozzolanic: "#ffff00",
  "magnesium-based": "#ff00ff",
  "calcium aluminate": "#00ffff",
  biopolymer: "#ff8000",
  aggregate: "#ff0080",
  water: "#80ff00",
  admixture: "#0080ff",
  reinforcement: "#8000ff",
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
