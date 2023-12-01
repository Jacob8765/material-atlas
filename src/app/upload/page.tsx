"use client";
import MaterialForm from "@/components/MaterialForm/MaterialForm";
import ResearchPaperUpload from "@/components/MaterialForm/ResearchPaperUpload";
import { uploadMaterial } from "@/server/db/uploadMaterial";
import { Material } from "@/types/entities";
import { Spin } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";

const DUMMY_MATERIAL: Material = {
  name: `SuperCrete LK-${Math.floor(Math.random() * 100)}}`,
  bioactivity: {
    totalNumDays: 1,
    totalNumSpecies: 42,
  },
  metadata: {
    authors: "Lyla Wu",
    doi: "10.1234/1234",
    year: "2021",
    title: "SuperCrete: A Living Building Material",
    abstract:
      "Symbioses provide a way to surpass the limitations of individual microbes. Natural communities exemplify this in symbioses like lichens and biofilms that are robust to perturbations, an essential feature in fluctuating environments. Metabolic capabilities also expand in consortia enabling the division of labor across organisms as seen in photosynthetic and methanogenic communities. In engineered consortia, the external environment provides levers of control for microbes repurposed from nature or engineered to interact through synthetic biology. Consortia have successfully been applied to real-world problems including remediation and energy, however there are still fundamental questions to be answered. It is clear that continued study is necessary for the understanding and engineering of microbial systems that are more than the sum of their parts.",
    overview:
      "Symbioses provide a way to surpass the limitations of individual microbes. Natural communities exemplify this in symbioses like lichens and biofilms that are robust to perturbations, an essential feature in fluctuating environments. Metabolic capabilities also expand in consortia enabling the division of labor across organisms as seen in photosynthetic and methanogenic communities. In engineered consortia, the external environment provides levers of control for microbes repurposed from nature or engineered to interact through synthetic biology. Consortia have successfully been applied to real-world problems including remediation and energy, however there are still fundamental questions to be answered. It is clear that continued study is necessary for the understanding and engineering of microbial systems that are more than the sum of their parts.",
    applications: "Applications of this material include building materials, construction, and architecture.",
    reportType: "scientific_report",
    formulaName: "Geopolymer Concrete",
  },
  mixes: [
    {
      name: "Mix 1",
      cementType: "geopolymer",
      elements: [
        {
          name: "H20",
          amount: 1,
          unit: "g",
        },
        {
          name: "Na",
          amount: 2,
          unit: "g",
        },
        {
          name: "Li",
          amount: 2,
          unit: "g",
        },
      ],
      mechanicalProperties: [
        {
          name: "density",
          amount: 1,
          unit: "MPa",
        },
        { name: "strength", amount: undefined, unit: "MPa" },
        {
          name: "shrinkage",
          amount: undefined,
          unit: "%",
        },
        {
          name: "permeability",
          amount: undefined,
          unit: "m/s",
        },
        {
          name: "workability",
          amount: undefined,
          unit: "mm",
        },
      ],
    },
    {
      name: "Mix 2",
      cementType: "cement",
      elements: [
        {
          name: "O",
          amount: 1,
          unit: "g",
        },
        {
          name: "Li",
          amount: 2,
          unit: "g",
        },
        {
          name: "H20",
          amount: 2,
          unit: "g",
        },
        {
          name: "Na",
          amount: 2,
          unit: "g",
        },
      ],
      mechanicalProperties: [
        {
          name: "density",
          amount: 50,
          unit: "kg/m3",
        },
        { name: "strength", amount: undefined, unit: "MPa" },
        {
          name: "shrinkage",
          amount: undefined,
          unit: "%",
        },
        {
          name: "permeability",
          amount: undefined,
          unit: "m/s",
        },
        {
          name: "workability",
          amount: undefined,
          unit: "mm",
        },
      ],
    },
  ],
};

export const INITIAL_FORM_DATA: Material = {
  name: "",
  bioactivity: {
    totalNumDays: 0,
    totalNumSpecies: 0,
  },
  metadata: {
    authors: "",
    doi: "",
    year: "",
    title: "",
    abstract: "",
    overview: "",
    applications: "",
    reportType: "scientific_report",
    formulaName: "",
  },
  mixes: [
    {
      name: "",
      cementType: "",
      elements: [
        {
          name: "",
          amount: 0,
          unit: "g",
        },
      ],
      mechanicalProperties: [
        {
          name: "density",
          amount: undefined,
          unit: "kg/m3",
        },
        { name: "strength", amount: undefined, unit: "MPa" },
        {
          name: "shrinkage",
          amount: undefined,
          unit: "%",
        },
        {
          name: "permeability",
          amount: undefined,
          unit: "m/s",
        },
        {
          name: "workability",
          amount: undefined,
          unit: "mm",
        },
      ],
    },
  ],
};

export default function UploadMaterialPage() {
  const [initialFormData, setInitialFormData] = useState<Material>(INITIAL_FORM_DATA);
  const [isUploadingPaper, setIsUploadingPaper] = useState(false);
  const [hasUploadedPaper, setHasUploadedPaper] = useState(false);
  const [isUploadingMaterial, setIsUploadingMaterial] = useState(false);

  const router = useRouter();

  const handleUpload = async (file: any) => {
    console.log(file);
    setIsUploadingPaper(true);
    setTimeout(() => {
      console.log("Uploading...");
      setInitialFormData(DUMMY_MATERIAL);
      setIsUploadingPaper(false);
      setHasUploadedPaper(true);
    }, 30000);
  };

  const handleMaterialSubmission = async (data: Material) => {
    setIsUploadingMaterial(true);
    try {
      console.log(data);
      const res = await uploadMaterial(data);
      router.push(`/database`);
      // console.log(res);
    } catch (e) {
      console.log(e);
    } finally {
      setIsUploadingMaterial(false);
    }
  };

  return (
    <div className="max-w-xxl mx-auto rounded-md p-6">
      <div className="my-3 mb-4">
        <h1 className="font-mono text-xl">Instructions</h1>
        <p className="text-md font-mono">
          Upload a research paper to get started. Our AI will extract the information from the paper and prefill the form for you. Once completed, click the "Submit" button to add the material to the
          database.
        </p>
      </div>

      {!hasUploadedPaper && <ResearchPaperUpload handleUpload={handleUpload} />}
      {isUploadingPaper ? (
        <div className="my-10 flex flex-1 items-center justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className="my-3">
          <MaterialForm initialFormData={initialFormData} handleMaterialFormSubmit={handleMaterialSubmission} isUploadingMaterial={isUploadingMaterial} />
        </div>
      )}
    </div>
  );
}
