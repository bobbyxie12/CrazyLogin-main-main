"use server";
import { UserCollection } from "@/app/db/db";
import { User } from "@/app/interfaces/user";
import { hashPassword } from "@/app/utils/utils";
import { cookies } from "next/headers";

export default async function handleUpdatePassword(data: User) {
      
        let password = data.password;

        // let username = cookies().get("username");
        let username = "wendy"
        // let password = "123456789";
        let newPassword = hashPassword(String(password));
        let Newname 
        let Newdob 
        let Newemail 
        let Newphone 
        let Newaddressline
        let Newcity 
        let Newstate 
        let Newpastcode
        try{
            // if(Token){}
            await UserCollection.updateOne(
            { username },
            { 
                $set: { 
                    dob: Newdob,
                    email: Newemail,
                    phone: Newphone,
                    addressline: Newaddressline,
                    city: Newcity,
                    state: Newstate,
                    postcode: Newpastcode,

                }

            }
            );
            return { message: 'success' };
        }catch(error){
            return { message: 'fail' };
        }

      }
