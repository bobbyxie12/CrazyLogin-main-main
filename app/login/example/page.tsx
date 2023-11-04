// "use client"
const { MongoClient } = require('mongodb');

import { UserCollection } from "@/app/db/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "./_components/LoginForm";
import { LoginData } from "@/app/interfaces/user";
import { hashPassword } from "@/app/utils/utils";
import { setCookie } from 'cookies-next';


const LoginPage: React.FC = () => {
  // const handleLogin = async (data: FormData) => {



  // const handleData = (data:LoginData)=>{
  //   console.log(data)
  // }

  //if doesnt match

  return (
    <div className="">
      <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat bg-[url('/images/background.jpg')]">
        {/* login window */}
        <div className="max-w-md w-full space-y-8 ">
          <div>
            <h2 className="mt-6 text-center text-5xl font-extrabold text-gray-900">
              Welcome back to Ningle!
            </h2>
            <h6 className="mt-4 text-center text-slate-400">
              please enter your details
            </h6>
          </div>

          {/* login form */}

          {/* <LoginButton onLogin={handleLogin} /> */}
          <LoginForm/>
          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
