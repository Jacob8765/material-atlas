import React from "react";
import DatabaseCard from "./DatabaseCard";

const DatabaseSection = () => {
  return (
    <>
      <div
        className="p-8 text-white"
        style={{
          backgroundColor: "rgb(99, 114, 104)",
        }}
      >
        <h2 className="border-rose-400 m-3 inline-block border-b-4 pb-2 text-3xl font-bold">Database</h2>
        <div
          className="grid grid-cols-3 gap-4 p-8 text-white"
          style={{
            backgroundColor: "rgb(99, 114, 104)",
          }}
        >
          <div>
            <DatabaseCard label={"INGREDIENT"} backgroundImage={"/assets/Quartz.jpg"} />
          </div>
          <div>
            <DatabaseCard label={"FORMULA"} backgroundImage={"/assets/lyla8638_concrete_ingredient_visualized_f4480005-0a81-4198-9691-e626d81b0605.png"} />
          </div>
          <div>
            <DatabaseCard label={"APPLICATION"} backgroundImage={"/assets/stonecycling-bespoke-wastebasedbricks-colours-4-1768x1457.jpg"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DatabaseSection;
