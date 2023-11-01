import sha256 from "crypto-js/sha256";

export const hashPassword = (rawPassword: string) =>
  JSON.stringify(sha256(JSON.stringify(sha256(rawPassword).words)).words);
