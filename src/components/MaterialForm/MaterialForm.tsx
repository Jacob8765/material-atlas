"use client";
import React, { useEffect } from "react";
import { Form, Input, Select, Button, Space, Row, Col } from "antd";
import { useForm, Controller } from "react-hook-form";
import UpdatedMixForm from "./MixForm";
import { Material } from "@/types/entities";

const { Option } = Select;

function MaterialForm({
  initialFormData,
  handleMaterialFormSubmit,
  isUploadingMaterial,
}: {
  initialFormData: Material | undefined;
  handleMaterialFormSubmit: (data: Material) => void;
  isUploadingMaterial: boolean;
}) {
  const { control, register, handleSubmit, setValue, formState } = useForm<Material>({ values: initialFormData });

  // const onSubmit: SubmitHandler<IFormValues> = (data) => {
  //   const schema = zodToJsonSchema(FormSchema);
  //   console.log(JSON.stringify(schema, null, 2));
  // };

  const onSubmit = (data: Material) => {
    handleMaterialFormSubmit(data);
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="container mx-auto mt-5">
      <div className="grid grid-cols-3 gap-x-4 gap-y-2">
        {/* make an input for the DOI number of the paper */}
        <Controller
          control={control}
          name="metadata.doi"
          render={({ field }) => (
            <Form.Item label="Reference" help="DOI, product datasheet reference, or patent number">
              <Input placeholder="DOI" {...field} />
            </Form.Item>
          )}
        />

        {/* make an input for the authors of the paper */}
        <Controller
          control={control}
          name="metadata.authors"
          render={({ field }) => (
            <Form.Item label="Author" help="First author, or manufacturer name for commercial materials" className="col-span-2">
              <Input placeholder="Authors" {...field} />
            </Form.Item>
          )}
        />

        {/* make an input for the year of the paper */}
        <Controller
          control={control}
          name="metadata.year"
          render={({ field }) => (
            <Form.Item label="Year" help="Year of publication">
              <Input placeholder="Year" {...field} />
            </Form.Item>
          )}
        />
        {/* make an input for the report type, can be either scientific report, patent number, or product data sheet */}
        <Controller
          control={control}
          name="metadata.reportType"
          render={({ field }) => (
            <Form.Item label="Report Type">
              <Select placeholder="Select the report type" {...field}>
                <Option value="scientific_report">Scientific Report</Option>
                <Option value="patent_number">Patent Number</Option>
                <Option value="product_data_sheet">Product Data Sheet</Option>
              </Select>
            </Form.Item>
          )}
        />

        {/* Name of the formula */}
        <Controller
          control={control}
          name="metadata.formulaName"
          render={({ field }) => (
            <Form.Item label="Formula Name">
              <Select placeholder="Select the name of the formula" {...field}>
                <Option value="cement based concrete">Cement Based Concrete</Option>
                <Option value="geopolymer concrete">Geopolymer Concrete</Option>
                <Option value="bioengineered concrete">Bioengineered concrete</Option>
                <Option value="other composite materials">Other Composite Materials</Option>
              </Select>
            </Form.Item>
          )}
        />

        {/* make an input for the title of the paper */}
        <Controller
          control={control}
          name="metadata.title"
          render={({ field }) => (
            <Form.Item label="Title" help="Report title or material name for commercial purposes" className="col-span-2">
              <Input placeholder="Title" {...field} />
            </Form.Item>
          )}
        />
      </div>

      <hr className="my-6" />
      {/* Ingredients and Related Fields */}
      <h3 className="my-4 text-lg font-normal">Ingredients and Related Fields</h3>
      <UpdatedMixForm register={register} control={control} />

      <hr className="my-6" />
      {/* Bio-activity */}
      <h3 className="my-4 text-lg font-normal">Bio-activity properties</h3>
      <div className="grid grid-cols-3 gap-x-4 gap-y-2">
        <Controller
          control={control}
          name="bioactivity.numberInvertebrate"
          render={({ field }) => (
            <Form.Item label="Number of invertebrate species attracted">
              <Input {...field} />
            </Form.Item>
          )}
        />
        <Controller
          control={control}
          name="bioactivity.numberInvasive"
          render={({ field }) => (
            <Form.Item label="Number of invasive species attracted">
              <Input {...field} />
            </Form.Item>
          )}
        />
        <Controller
          control={control}
          name="bioactivity.numberCryptogenic"
          render={({ field }) => (
            <Form.Item label="Number of cryptogenic species attracted">
              <Input {...field} />
            </Form.Item>
          )}
        />
        <Controller
          control={control}
          name="bioactivity.materialPH"
          render={({ field }) => (
            <Form.Item label="PH of the material">
              <Input placeholder="Value in logarithmic units" {...field} />
            </Form.Item>
          )}
        />
      </div>
      <div className="grid grid-cols-5 gap-x-4 gap-y-2">
        <Controller
          control={control}
          name="bioactivity.totalNumSpecies"
          render={({ field }) => (
            <Form.Item label="Number of species found">
              <Input {...field} />
            </Form.Item>
          )}
        />
        <Controller
          control={control}
          name="bioactivity.totalNumDays"
          render={({ field }) => (
            <Form.Item label="Number of days">
              <Input {...field} />
            </Form.Item>
          )}
        />
      </div>

      <hr className="my-6" />
      {/* Ingredients and Related Fields */}
      <h3 className="my-4 text-lg font-normal">General Info</h3>
      <Controller
        control={control}
        name="metadata.applications"
        render={({ field }) => (
          <Form.Item label="Description of usage (problems solved, etc.)">
            <Input.TextArea placeholder="Applications" {...field} />
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="metadata.overview"
        render={({ field }) => (
          <Form.Item label="General overview of the material proposed">
            <Input.TextArea placeholder="Description" {...field} />
          </Form.Item>
        )}
      />

      <Button type="default" htmlType="submit" className="mt-4">
        {isUploadingMaterial ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}

export default MaterialForm;
