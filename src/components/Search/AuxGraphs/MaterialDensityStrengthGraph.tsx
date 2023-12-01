import { Material } from "@/types/entities";
import { useMemo } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";

interface ScatterPlotData {
  x: number;
  y: number;
  name: string;
  mixName: string;
}

export default function MaterialDensityStrengthGraph({ materials }: { materials: Material[] | undefined }) {
  const graphData = useMemo(() => {
    if (!materials) return null;
    const data: ScatterPlotData[] = [];

    materials.forEach((material) => {
      const filteredMixes = material.mixes.filter(
        (mix) => mix.mechanicalProperties.find((property) => property.name === "density")?.amount && mix.mechanicalProperties.find((property) => property.name === "strength")?.amount,
      );
      if (filteredMixes.length === 0) return;

      filteredMixes.forEach((mix) => {
        const { amount: densityAmount, unit: densityUnit } = mix.mechanicalProperties.find((property) => property.name === "density")!;
        const { amount: strengthAmount, unit: strengthUnit } = mix.mechanicalProperties.find((property) => property.name === "strength")!;
        data.push({
          x: densityAmount as number,
          y: strengthAmount as number,
          name: material.name,
          mixName: mix.name,
        });
      });
    });

    console.log(data);
    return data;
  }, [materials]);

  if (!graphData) return null;

  return (
    <div className="mt-4 rounded-lg bg-ivory p-4">
      <h1 className="mb-2 font-mono text-xl">density vs. strength</h1>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="Density" unit="g" />
          <YAxis type="number" dataKey="y" name="Strength" unit="MPa" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="A school" data={graphData} fill="#8884d8">
            <LabelList dataKey="name" position="bottom" />
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
