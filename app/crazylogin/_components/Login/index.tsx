"use client";

import { SlideButton } from "@/app/components/Button/SlideButton";
import { TextField } from "@/app/components/Input/TextField";
import { useState, useTransition } from "react";
import { login } from "./_login";
import { hashPassword } from "@/app/utils/utils";

export const Login = () => {
  const [credential, setCredential] = useState({
    username: "",
    password: "",
  });
  const [pending, start] = useTransition();

  return (
    <div className="relative w-96 h-fit p-4 flex flex-col items-center rounded-md group bg-white/75">
      <div className="w-96 my-4 relative z-10">
        <p className="w-full text-center text-xl my-4">
          Username/Password Login
        </p>
      </div>
      <div className="flex flex-col gap-2 mb-4 relative z-10">
        <TextField
          title="Username"
          value={credential.username}
          onChange={(e) => {
            setCredential({
              ...credential,
              username: e.target.value,
            });
          }}
        />
        <TextField
          type="password"
          title="Password"
          value={credential.password}
          onChange={(e) => {
            setCredential({
              ...credential,
              password: e.target.value,
            });
          }}
        />
        <SlideButton
          loading={pending}
          className="my-2 self-end"
          text="SUBMIT"
          onClick={() => {
            start(() => {
              (async () => {
                let response = await login(
                  credential.username,
                  hashPassword(credential.password)
                );
                if (typeof response === "string") alert(response);
              })();
            });
          }}
        />
      </div>
      <p>Note: </p>
      <p>username: harry</p>
      <p>password: 123456</p>
    </div>
  );
};
