import React from "react";
import {
  useFormContext,
  Controller,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { Form, Input, Select, Button, Space, Row, Col } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { CEMENT_TYPE, MECHANICAL_PROPERTIES } from "@/constants/dbProperties";
import AddRemoveForm from "./AddRemoveFormButton";
import AddRemoveFormButton from "./AddRemoveFormButton";
import { Material } from "@/types/entities";

// Define the props type
interface MixFormProps {
  register: UseFormRegister<Material>;
  control: any;
}

const ElementForm: React.FC<MixFormProps & { mixIndex: number }> = ({
  register,
  control,
  mixIndex,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `mixes.${mixIndex}.elements`,
  });

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-2 gap-2">
          {/* Elements */}
          <Controller
            control={control}
            name={`mixes.${mixIndex}.elements.${index}.name`}
            render={({ field }) => (
              <Form.Item label="Element Name">
                <Select
                  {...field}
                  style={{ width: "100%", maxWidth: "600px" }}
                  placeholder="Select an element"
                >
                  {[
                    "Si",
                    "Al",
                    "Fe",
                    "Ca",
                    "Mg",
                    "Na",
                    "K",
                    "Ti",
                    "Mn",
                    "P",
                    "S",
                    "Cl",
                    "F",
                    "C",
                    "O",
                    "H",
                  ].map((element) => (
                    <Select.Option key={element} value={element}>
                      {element}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          />

          {/* Amount */}
          <Controller
            control={control}
            name={`mixes.${mixIndex}.elements.${index}.amount`}
            render={({ field }) => (
              <Form.Item label="Amount">
                <Input
                  {...field}
                  className="w-40"
                  addonAfter={
                    <Controller
                      control={control}
                      name={`mixes.${mixIndex}.elements.${index}.unit`}
                      render={({ field }) => (
                        <Select {...field}>
                          <Select.Option value="g">g</Select.Option>
                          <Select.Option value="kg">kg</Select.Option>
                          <Select.Option value="%">%</Select.Option>
                        </Select>
                      )}
                    />
                  }
                />
              </Form.Item>
            )}
          />
        </div>
      ))}

      <AddRemoveFormButton
        append={append}
        remove={() => remove(fields.length - 1)}
      />
    </>
  );
};

const UpdatedMixForm: React.FC<MixFormProps> = ({ register, control }) => {
  // const { control } = useFormContext() // useFormContext hook from react-hook-form

  const { fields, append, remove } = useFieldArray({
    control,
    name: "mixes",
  });

  return (
    <>
      <div className="grid grid-cols-10 gap-4 overflow-scroll">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="col-span-3 max-h-[425px] overflow-y-scroll rounded-lg border border-dashed p-2"
          >
            <h1 className="mb-2 text-lg font-semibold">Mix {index + 1}</h1>
            {/* Ingredients */}
            <Controller
              control={control}
              name={`mixes.${index}.cementType`}
              render={({ field }) => (
                <Form.Item label="Cement Type">
                  <Select
                    {...field}
                    style={{ width: "100%", maxWidth: "600px" }}
                  >
                    {CEMENT_TYPE.map((type) => (
                      <Select.Option key={type.value} value={type.value}>
                        {type.displayName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            />

            <h1 className="my-2 text-lg font-semibold">Elements:</h1>
            <ElementForm
              register={register}
              control={control}
              mixIndex={index}
            />

            {/* Mechanical Properties */}
            <h1 className="my-2 mt-4 text-lg font-semibold">
              Mechanical Properties:
            </h1>
            {MECHANICAL_PROPERTIES.map((property, propIndex) => (
              <div key={property.value}>
                <Controller
                  control={control}
                  name={`mixes.${index}.mechanicalProperties.${propIndex}.name`}
                  render={({ field }) => (
                    <Form.Item label="Property Name" hidden={true}>
                      <Input
                        {...field}
                        defaultValue={property.value || "strength"}
                      />
                    </Form.Item>
                  )}
                />
                <Controller
                  control={control}
                  name={`mixes.${index}.mechanicalProperties.${propIndex}.amount`}
                  render={({ field }) => (
                    <Form.Item label={property.displayName}>
                      <Input
                        {...field}
                        addonAfter={
                          <Controller
                            control={control}
                            name={`mixes.${index}.mechanicalProperties.${propIndex}.unit`}
                            render={({ field }) => (
                              <Select
                                {...field}
                                defaultValue={property.units[0]}
                              >
                                {property.units.map((unit) => (
                                  <Select.Option key={unit} value={unit}>
                                    {unit}
                                  </Select.Option>
                                ))}
                              </Select>
                            )}
                          />
                        }
                      />
                    </Form.Item>
                  )}
                />
              </div>
            ))}
          </div>
        ))}

        <div className="col-span-1 flex min-h-[425px] w-full flex-col items-center justify-around rounded-lg border border-dashed border-blue-300 p-2">
          <PlusCircleOutlined
            className="mb-2 cursor-pointer text-4xl hover:text-green-500"
            onClick={() => append({ cementType: "OPC", elements: [] })}
          />
          <MinusCircleOutlined
            className={`text-4xl ${
              fields.length && "cursor-pointer hover:text-red-500"
            }`}
            onClick={() => remove(fields.length - 1)}
          />
        </div>
      </div>
    </>
  );
};

export default UpdatedMixForm;
