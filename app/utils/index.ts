// let user = await UserCollection.findOne({ username });
// if (user && user.password === password) {
//   cookies().set("username", username);
//   cookies().set("password", password);
//   cookies().set("region", user.region ?? "SYD");
//   redirect("/next2");

//   //submit username and password to the backend
// }
// else{
//   console.log('fail to login')
// }
import { UserCollection } from "@/app/db/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const Login123 = async(username:string, password:string)=>{
    let user = await UserCollection.findOne({ username });

    if (user && user.password === password) {
          cookies().set("username", username);
          cookies().set("password", password);
          cookies().set("region", user.region ?? "SYD");
          redirect("/next2");
        
          //submit username and password to the backend
        }
        else{
          console.log('fail to login')
        }


}