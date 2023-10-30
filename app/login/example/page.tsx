// "use client"
import { UserCollection } from "@/app/db/db";
import { hashPassword } from "@/app/utils/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "./_components/LoginForm";
import { LoginData } from "@/app/interfaces/user";

const LoginPage: React.FC = () => {
  // const handleLogin = async (data: FormData) => {

  async function handleLogin(data: LoginData) {
    "use server";

    let username = String(data.email);
    let password = hashPassword(String(data.password));
    let user = await UserCollection.findOne({ username });
    if (user && user.password === password) {
      cookies().set("username", username);
      cookies().set("password", password);
      cookies().set("region", user.region ?? "SYD");
      redirect("/next2");

      //submit username and password to the backend
    }
  }

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
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
