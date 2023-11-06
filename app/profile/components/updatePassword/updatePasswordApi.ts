"use server";
import { UserCollection } from "@/app/db/db";
import { updatePasswordData } from "@/app/interfaces/user";
import { hashPassword } from "@/app/utils/utils";


export default async function handleUpdatePassword(data: updatePasswordData) {
      
        let password = data.password;
        let username = data.username;

        // let username = cookies().get("username");
        // let username = "wendy"
        // let password = "123456789";
        let newPassword = hashPassword(String(password));

        try{
            await UserCollection.updateOne(
            { username },
            { $set: { password: newPassword } }
            );
            return { message: 'success' };
        }catch(error){
            return { message: 'fail' };
        }

      }
