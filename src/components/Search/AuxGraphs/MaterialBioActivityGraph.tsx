import { CEMENT_TYPE_COLOR_MAPPING } from "@/constants/dbProperties";
import { Material } from "@/types/entities";
import { useMemo } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell, TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

interface ScatterPlotData {
  x: number;
  y: number;
  name: string;
  color: string;
}

export default function MaterialBioActivityGraph({ materials }: { materials: Material[] | undefined }) {
  const graphData = useMemo(() => {
    if (!materials) return null;
    const data: ScatterPlotData[] = [];

    materials.forEach((material) => {
      const totalNumDays = material.bioactivity.totalNumDays;
      const totalNumSpecies = material.bioactivity.totalNumSpecies;
      const cementType = material.mixes[0]?.cementType ?? "geopolymer"; // very hack haha

      if (!totalNumDays || !totalNumSpecies) return;

      data.push({
        x: totalNumDays,
        y: totalNumSpecies,
        name: material.name,
        color: CEMENT_TYPE_COLOR_MAPPING[cementType] ?? "#8884d8",
      });
    });

    console.log(data);
    return data;
  }, [materials]);

  if (!graphData) return null;

  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-sm bg-white p-2">
          <p className="text-md">{`${payload[0]?.payload.name}`}</p>
          {payload.map((entry: any, i) => (
            <div key={i}>
              <p className="text-sm">{`${entry.name} : ${entry.value} ${entry.unit}`}</p>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="rounded-lg bg-ivory p-4">
      <h1 className="mb-2 font-mono text-xl">number of species vs. number of days</h1>
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
          <XAxis type="number" dataKey="x" name="Number of Days" unit="days" />
          <YAxis type="number" dataKey="y" name="Number of Species" unit="" />
          <Tooltip content={<CustomTooltip />} />
          <Scatter name="A school" data={graphData}>
            {graphData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color ?? "#8884d8"} />
            ))}
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
