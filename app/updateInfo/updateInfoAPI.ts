"use server";
import { UserCollection } from "@/app/db/db";
import { updateInfo } from "@/app/interfaces/user";
import { hashPassword } from "@/app/utils/utils";
import { cookies } from "next/headers";

export default async function handleUpdatePassword(data: updateInfo) {
      
        // let username = cookies().get("username");
        let username = "liang";

        let Newbirthday = data.birthday
        let Newemail = data.email
        let Newphone = data.phone
        let Newaddressline1 = data.addressline1
        let Newaddressline2 = data.addressline2
        let Newcity = data.city
        let Newstate = data.state
        let Newpastcode =data.postcode
        try{
            // if(Token){}
            await UserCollection.updateOne(
            { username },
            { 
                $set: { 
  
                    birthday: Newbirthday,
                    email: Newemail,
                    phone: Newphone,
                    addressLine1: Newaddressline1,
                    addressLine2: Newaddressline2,
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
