"use client";
import RegisterForm from "@/components/Register/RegisterForm";
import { registerUser } from "@/server/db/registerUser";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegistrationFormSubmit = async (data: User) => {
    await registerUser(data); //should definitely be an api route lol
    //after its finished, redirect to login page
    router.push("/api/auth/signin");
  };

  return (
    <div className="mt-8 flex h-full items-center justify-center">
      <div className="min-w-[600px] rounded-lg border border-dotted border-ivory p-4">
        <h1 className="mb-4 text-2xl font-bold">Register</h1>

        <RegisterForm handleRegistrationFormSubmit={handleRegistrationFormSubmit} />
      </div>
    </div>
  );
}
