"use server";

import { UserCollection } from "@/app/db/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (username: string, password: string) => {
  let user = await UserCollection.findOne({ username });
  if (user && user.password === password) {
    cookies().set("username", username);
    cookies().set("password", password);
    cookies().set("region", user.region ?? "SYD");

    redirect("/profile");
  }
  return "password not match / user not found";
};
