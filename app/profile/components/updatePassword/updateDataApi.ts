"use server";
import { UserCollection } from "@/app/db/db";
import { updateData } from "@/app/interfaces/user";
import { hashPassword } from "@/app/utils/utils";
import { getCookie } from 'cookies-next';

export default async function updateDataApi(username:string) {
    let password = getCookie("password");
    // let username = getCookie("username");
        // let username1 = username;
        try{
            let infoData = await UserCollection.findOne(
                { username },
                { projection: { _id: 0 } }
                );    
            return { message: infoData};
        }catch(error){
            return { message: 'fail' };
        }

        // console.log("123132")
        // return 1
      }
