import { SlideButton } from "@/app/components/Button/SlideButton";
import { TextField } from "@/app/components/Input/TextField";
import { UserCollection } from "@/app/db/db";
import { hashPassword } from "@/app/utils/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const Login = () => {
  async function login(data: FormData) {
    "use server";
    let username = String(data.get("username")),
      password = hashPassword(String(data.get("password")));
    let user = await UserCollection.findOne({ username });
    if (user && user.password === password) {
      cookies().set("username", username);
      cookies().set("password", password);
      cookies().set("region", user.region ?? "SYD");
      
      redirect("/next2");

    }    


  }

  return (
    <div className="relative w-96 h-fit p-4 flex flex-col items-center rounded-md group bg-white/75">
      <div className="w-96 my-4 relative z-10">
        <p className="w-full text-center text-xl my-4">
          Username/Password Login
        </p>
      </div>
      <form
        action={login as any}
        className="flex flex-col gap-2 mb-4 relative z-10"
      >
        <TextField title="Username" name="username" />
        <TextField type="password" title="Password" name="password" />
        <SlideButton className="my-2 self-end" type="submit" text="SUBMIT" />
      </form>
      <p>Note: </p>
      <p>username: harry</p>
      <p>password: 123456</p>
    </div>
  );
};
