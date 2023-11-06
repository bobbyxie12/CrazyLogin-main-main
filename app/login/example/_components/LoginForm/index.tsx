"use client";

import { LoginData } from "@/app/interfaces/user";
import { useState,useEffect } from "react";
import RememberMeCheckbox from "./RememberMeCheckbox";
import handleLogin from './loginAPI';
import { redirect } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { getCookie,hasCookie } from "cookies-next";

export const LoginForm = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  //used to check email state
  const [email, setEmail] = useState<string>("");
  //used to check password state
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);


  useEffect(() => {
    if( hasCookie("username")){
      redirect("/profile");
    }

  },[])
  const handleRememberChange = (checked: boolean) => {
    setRememberMe(checked);
  };

  const  ClickButton = async() => {
    const data: LoginData = { email, password };
    const response = await handleLogin(data);
    console.log(response)
   if(response.message === "success"){
    toast("success to login");

    // setTimeout(() => {
    //   redirect("/profile");
    // }, 1000);

    redirect("/profile");

   }
  };

  return (
    <form className="mt-8 space-y-6" action={ClickButton}>
         <Toaster />
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type=""
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Enter your Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-3">
        <RememberMeCheckbox onRememberChange={handleRememberChange} />

        <button
          type="submit"
          className="group relative w-full flex justify-center my-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign In
        </button>
      </div>
      <div className="flex justify-center">
        <p className="text-slate-400">Don't have an account?</p>
        <p className="font-bold px-1 text-slate-600 underline underline-offset-4 ">
          Sign Up
        </p>
      </div>

      {message && (
        <div className="mt-4 text-center text-red-500">{message}</div>
      )}
    </form>
  );
};
