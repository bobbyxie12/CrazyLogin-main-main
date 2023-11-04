// "use client"

"use server";
import { UserCollection } from "@/app/db/db";
// import { cookies } from "next/headers";
import { LoginData } from "@/app/interfaces/user";
import { hashPassword } from "@/app/utils/utils";
import { setCookie } from 'cookies-next';


export default async function handleLogin(data: LoginData) {
  let username = String(data.email);
  let password = hashPassword(String(data.password));

  try {
    let user = await UserCollection.findOne({ username });
    if (user && user.password === password) {
      setCookie('username', username);
      setCookie('password', password);
      setCookie('region', user.region ?? "SYD");
      // cookies().set("username", username);
      // cookies().set("password", password);
      // cookies().set("region", user.region ?? "SYD");

      return {message: 'success'}
      //submit username and password to the backend
    } else {
      return { message: 'fail to login' };
    }
  } catch(error) {
    return { message: error };
  }
}
