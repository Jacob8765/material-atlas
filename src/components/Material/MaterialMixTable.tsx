import { Element, Material } from "@/types/entities";

export default function MaterialMixTable({ material }: { material: Material }) {
  return (
    <div>
      {material.mixes.map((mix, i) => (
        <div key={i} className="my-3">
          <p className="font-mono text-xl">
            {mix.name?.substring(0, 50) + "..."}
          </p>

          <p className="font-mono text-lg">Mechanical Properties</p>
          {mix.mechanicalProperties?.map((process: any, j) => (
            <p className="text-md font-mono" key={j}>
              <b>{process.name}</b>: {process.amount} {process.unit}
            </p>
          ))}

          <p className="font-mono text-lg">Elements</p>
          {mix.elements?.map((element: Element, j) => (
            <p className="text-md font-mono" key={j}>
              <b>{element.name}</b>: {element.amount as string} {element.unit}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
