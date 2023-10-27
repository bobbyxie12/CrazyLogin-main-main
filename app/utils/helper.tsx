import sha256 from "crypto-js/sha256";
import { cookies } from "next/headers";
import { UserCollection } from "../db/db";

export const hashPassword = (rawPassword: string) =>
  JSON.stringify(sha256(JSON.stringify(sha256(rawPassword).words)).words);

export const getAuthUser = async (access: string) => {
  let username = cookies().get("username")?.value,
    password = cookies().get("password")?.value,
    authUser = null;

  let user = await UserCollection.findOne({ username, password });

  //back door for system account
  if (user?.username === "system") return user;

  if (user && user.isActive) {
    if (
      (user.accesses ?? []).find((grantedAccess) => grantedAccess === access)
    ) {
      authUser = user;
    }
  }
  return authUser;
};
