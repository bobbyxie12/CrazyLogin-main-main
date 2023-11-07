"use server";
import { UserCollection } from "@/app/db/db";
import { updatePasswordData } from "@/app/interfaces/user";
import { hashPassword } from "@/app/utils/utils";
// import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export default async function handleUpdatePassword(data: updatePasswordData) {

  
  let newPassword = data.newPassword;
  let oldPassword = data.oldPassword;
    let username = data.username;
    let newPassword1 = hashPassword(String(newPassword));
  // let username = cookies().get("username");
  // let username = "wendy"
  // let password = "123456789";

  try {

    let user = await UserCollection.findOne({ username });
    if (user && user.password === oldPassword) {
      await UserCollection.updateOne(
        { username },
        { $set: { password: newPassword1 } }
      );
      return { message: "success" };
    }
    else{
        return{meesgae:"password and username do not match"}
    }
  } catch (error) {
    return { message: "fail" };
  }
}
