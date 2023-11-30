import { Material } from "@/types/entities";

export default function TableElement({ material }: { material: Material }) {
  return (
    <div className="border-ivory mt-4 rounded-lg border border-dashed p-4">
      <h1 className="mb-2 font-mono text-xl">
        {material.name.substring(0, 25) + "..."}
      </h1>

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-md font-mono">
            {material.metadata.overview?.substring(0, 50) + "..."}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-md font-mono">
            {material.metadata.year?.substring(0, 50) + "..."}
          </p>
        </div>

        <p className="text-md font-mono text-blue-300">More details...</p>

        {/* <div className="flex flex-col items-center justify-center">
          {material.mixes.map((mix, i) => (
            <div className="flex flex-col items-center justify-center">
              <p className="text-md font-mono">
                {mix.name?.substring(0, 50) + "..."}
              </p>
              {mix.mechanicalProperties?.map((process: any) => (
                <p className="text-md font-mono">
                  <b>{process.name}</b>: {process.amount} {process.unit}
                </p>
              ))}
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
