/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import TextInput from "./textinput";
import SubmitButton from "./submitbutton";
import CustomCarousel from "./customcarousel";
import ImageInput from "./imageupload";
import { RegisterInputTypes } from "@/Types/types";
import { baseUrl } from "./categoryform";
import toast from "react-hot-toast";
import Image from "next/image";

export default function AuthRegisterForm() {

  const initialImage = "/Profile-1.svg";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInputTypes>();
//   const router = useRouter();
  async function onSubmit(data: RegisterInputTypes) {
    data.profileImage = imageUrl
    // console.log(data);
    try {
        setIsLoading(true)
        const response = await fetch(`${ baseUrl }/api/v1/users`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(data)
        })
        setIsLoading(false)
        toast.custom((t:any) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={data.profileImage}
                      alt=""
                      width={500}
                      height={300}
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {data.fullName}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      ✅ New User Created Successfully 👍🏾!!!
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ))
        reset()
        console.log(response); 
    } catch (error) {
        setIsLoading(false)
        console.log(error);
    }
  }
  return (
    <div className="w-full flex h-screen relative p-4">
      <div className="w-full md:w-1/2">
            <div className="mx-auto md:max-w-2xl">
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Create an Account</h1>
            </div>
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                label="Full Name"
                register={register}
                name="fullName"
                errors={errors}
                placeholder="eg John Doe"
                />
                <TextInput
                label="Email Address"
                register={register}
                name="email"
                type="email"
                errors={errors}
                placeholder="Eg. johndoe@gmail.com"
                />
                <TextInput
                label="Phone Number"
                register={register}
                name="phone"
                type="tel"
                errors={errors}
                placeholder=""
                />
                <TextInput
                label="Password"
                register={register}
                name="password"
                type="password"
                errors={errors}
                placeholder="******"
                />
                
                <ImageInput
                    title="Profile Image"
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    endpoint="imageUploader"
                />
                <SubmitButton

                title="Sign Up"
                loading={isLoading}
                loadingTitle="Creating Account please wait..."
                />
            </form>
            <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                Login
                </Link>
            </div>
            </div>
      </div>
      <div className="hidden md:min-h-screen md:w-1/2 bg-muted md:block relative">
        <CustomCarousel />
      </div>
    </div>
  );
}
