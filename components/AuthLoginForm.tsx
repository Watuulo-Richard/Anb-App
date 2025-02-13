"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
// import { useRouter } from "next/navigation";
// import CustomCarousel from "../carousels/custom-carousel";
import TextInput from "./textinput";
import SubmitButton from "./submitbutton";
import CustomCarousel from "./customcarousel";
import { LoginInputTypes } from "@/Types/types";
import { baseUrl } from "./categoryform";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AuthLoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("")
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<LoginInputTypes>();
//   const router = useRouter();
  async function onSubmit(data: LoginInputTypes) {
    //   console.log(data);
    try {
        setIsLoading(true)
        const response = await fetch(`${baseUrl}/api/v1/userlogins`,{
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(data)
        })
        if(response.status === 403){
          setIsLoading(false)
          setError("Wrong Credentials")
          toast.error("Wrong Credentials")
        } else if (response.status === 201){
          setIsLoading(false)
          toast.success("LoggedIn Successfully")
          router.push("/dashboard")
        }
        console.log(response)
    } catch (error) {
        console.log(error)
        setIsLoading(false)
    }
  }
  return (
    <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 relative ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          {/* <div className="absolute top-5 left-5">Simple UI</div> */}
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            {/* <TextInput
              label="Full Name"
              register={register}
              name="fullName"
              errors={errors}
              placeholder="eg John Doe"
            /> */}
            <TextInput
              label="Email Address"
              register={register}
              name="email"
              type="email"
              errors={errors}
              placeholder="Eg. johndoe@gmail.com"
            />
            <TextInput
              label="Password"
              register={register}
              name="password"
              type="password"
              errors={errors}
              placeholder="******"
            />

            <SubmitButton
              title="Login"
              loading={isLoading}
              loadingTitle="Logging In Account please wait..."
            />
            {error && <span className="text-xs text-red-600/45">{error}</span>}
          </form>
          <div className="mt-4 text-center text-sm">
            Don`&apos;`t have an account?{" "}
            <Link href="/Register" className="underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <CustomCarousel />
      </div>
    </div>
  );
}
