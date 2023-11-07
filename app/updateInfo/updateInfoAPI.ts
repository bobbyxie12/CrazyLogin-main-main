"use server";
import { UserCollection } from "@/app/db/db";
import { updateInfo } from "@/app/interfaces/user";
import { hashPassword } from "@/app/utils/utils";
import { cookies } from "next/headers";

export default async function handleUpdatePassword(
  data: updateInfo,
  username: string,
  password: string
) {
    let newFirstName = data.firstName;
    let newLastName = data.lastName;
    let newBirthday = data.dob;
    let newEmail = data.email;
    let newPhone = data.phone;
    let newAddressline1 = data.addressline1;
    let newAddressline2 = data.addressline2;
    let newCity = data.city;
    let newState = data.state;
    let newPastcode = data.postcode;
  try {
    // if(Token){}
    let user = await UserCollection.findOne({ username });
    if (user && user.password === password) {
      await UserCollection.updateOne(
        { username },
        {
          $set: {
            preferName:newFirstName,
            lastName:newLastName,
            dob: newBirthday,
            email: newEmail,
            phone: newPhone,
            addressLine1: newAddressline1,
            addressLine2: newAddressline2,
            city: newCity,
            state: newState,
            postcode: newPastcode,
          },
        }
      );
      return { message: "success" };
    } else {
      return { message: "something is wrong" };
    }
  } catch (error) {
    return { message: "fail" };
  }
}
