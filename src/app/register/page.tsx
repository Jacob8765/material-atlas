"use client";
import RegisterForm from "@/components/Register/RegisterForm";
import { User } from "@/types/user";

export default function RegisterPage() {
  const handleRegistrationFormSubmit = (data: User) => {
    console.log(data);
  };

  return (
    <div className="mt-8 flex h-full items-center justify-center">
      <div className="min-w-[600px] rounded-lg bg-ivory p-4">
        <h1 className="mb-4 text-2xl font-bold">Register</h1>

        <RegisterForm handleRegistrationFormSubmit={handleRegistrationFormSubmit} />
      </div>
    </div>
  );
}
