"use client";
import { User } from "@/types/user";
import { Form, Input, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { ControllerInput } from "../FormInputs/ControllerInput";
import { RESEARCH_AREAS, ROLE_TYPES } from "@/constants/dbProperties";

interface RegisterFormProps {
  handleRegistrationFormSubmit: (data: User) => void;
}

export default function RegisterForm({ handleRegistrationFormSubmit }: RegisterFormProps) {
  const { control, register, handleSubmit, setValue, formState } = useForm<User>({});

  const onSubmit = (data: User) => {
    handleRegistrationFormSubmit(data);
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="container mx-auto mt-5">
      <div className="grid grid-cols-2 gap-1">
        <ControllerInput control={control} name="firstName" label="First Name" placeholder="John" />
        <ControllerInput control={control} name="lastName" label="Last Name" placeholder="Doe" />
      </div>

      <div className="grid grid-cols-1 gap-0">
        <ControllerInput control={control} name="username" label="User Name" />
        <ControllerInput control={control} name="email" label="Email" />
        <ControllerInput control={control} name="password" label="Password" />
        <ControllerInput control={control} name="institution" label="Institution" />

        <Controller
          control={control}
          name={`researchArea`}
          render={({ field }) => (
            <Form.Item label="Research Area">
              <Select {...field} defaultValue={RESEARCH_AREAS[0]}>
                {RESEARCH_AREAS.map((researchArea) => (
                  <Select.Option key={researchArea} value={researchArea}>
                    {researchArea}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
        />

        <Controller
          control={control}
          name={`role`}
          render={({ field }) => (
            <Form.Item label="Role and Position">
              <Select {...field} defaultValue={ROLE_TYPES[0]}>
                {ROLE_TYPES.map((role) => (
                  <Select.Option key={role} value={role}>
                    {role}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
        />
      </div>
    </Form>
  );
}
