"use server";
import { UserCollection } from "@/app/db/db";
import { updateData } from "@/app/interfaces/user";
import { hashPassword } from "@/app/utils/utils";
import { getCookie } from 'cookies-next';

export default async function updateDataApi() {
        let username = "wendy";
        try{
           let infoData = await UserCollection.findOne({ username });
            return { message: infoData};
        }catch(error){
            return { message: 'fail' };
        }

        // console.log("123132")
        // return 1
      }
