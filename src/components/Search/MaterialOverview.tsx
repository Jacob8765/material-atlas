import type { Material } from "@/types/entities";
import MaterialMixTable from "../Material/MaterialMixTable";
import Link from "next/link";

export default function MaterialOverview({ material }: { material: Material }) {
  return (
    <div className="p-3">
      <h1 className="mb-2 font-mono text-xl">{material.name}</h1>

      <div className="my-2 flex flex-row items-center">
        <button className="mr-2 rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600">
          Add to Comparison
        </button>
        <Link
          href={`/material/${material.elementId}`}
          className="text-black hover:text-black"
        >
          <button className="border-ivory hover:border-brown-400 rounded-md border p-2">
            Material Page
          </button>
        </Link>
      </div>

      <p className="text-md my-2 font-mono">
        <b>Overview: </b> {material.metadata.overview}
      </p>
      <p className="text-md my-2 font-mono">
        <b>Year: </b> {material.metadata.year}
      </p>

      <p className="my-2 font-mono text-lg">Mix Table:</p>

      <MaterialMixTable material={material} />
    </div>
  );
}
