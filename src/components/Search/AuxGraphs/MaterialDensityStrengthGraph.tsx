import { CEMENT_TYPE_COLOR_MAPPING } from "@/constants/dbProperties";
import { Material } from "@/types/entities";
import { useMemo } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell, TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

interface ScatterPlotData {
  x: number;
  y: number;
  name: string;
  mixName: string;
  color: string;
  idx: number;
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
          idx: data.length,
          mixName: mix.name,
          color: CEMENT_TYPE_COLOR_MAPPING[mix.cementType] ?? "#8884d8",
        });
        console.log(data[data.length - 1]);
      });
    });

    // console.log(data);
    return data;
  }, [materials]);

  if (!graphData) return null;

  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-sm bg-white p-2">
          <p className="text-md">{`${payload[0]?.payload.name}, ${payload[0]?.payload.mixName}`}</p>
          {payload.map((entry: any, i) => (
            <div key={i}>
              <p className="text-sm">{`${entry.name} : ${entry.value}${entry.unit}`}</p>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="rounded-lg bg-ivory p-4">
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
          <XAxis type="number" dataKey="x" name="Density" unit="kg/m3" />
          <YAxis type="number" dataKey="y" name="Strength" unit="MPa" />
          <Tooltip content={<CustomTooltip />} />
          <Scatter name="A school" data={graphData}>
            {graphData.map((entry, index) => (
              <Cell key={`cell-${index}-${entry.mixName}-${entry.idx}`} fill={entry.color ?? "#8884d8"} />
            ))}
            {/* <LabelList dataKey="x" /> */}
            {/* <LabelList dataKey="name" position="bottom" /> */}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      <div className="justify-left mt-1 flex flex-row">
        {Object.entries(CEMENT_TYPE_COLOR_MAPPING).map(([key, value], i) => (
          <div className="mr-8 flex flex-row items-center" key={i}>
            <div className="mr-1 h-4 w-4 rounded-full" style={{ backgroundColor: value }}></div>
            <p className="text-sm">{key}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
