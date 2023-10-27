"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
  cookies().set("username", "");
  cookies().set("password", "");
  redirect("/crazylogin");
};
