interface BaseElement {
  elementId: string;
  labels: string[]; //why is this an array?
  properties: Record<string, any>;
}

interface BaseRelationship {
  elementId: string;
  startNodeElementId: string;
  endNodeElementId: string;
  type: string;
  properties: Record<string, any>;
}

export interface BaseQueryResponse<T> {
  data: T;
  elements: BaseElement[];
  relationships: BaseRelationship[];
}

export interface Filters {
  name?: string;
}

//We can just get this type from ZOD
// export interface Material extends BaseElement {
//   labels: ["Material"];
//   properties: {
//     name: string;
//     overview: string;
//   };
// }
