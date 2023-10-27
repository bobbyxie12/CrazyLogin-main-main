"use client";

import { SlideButton } from "@/app/components/Button/SlideButton";
import { logout } from "./_logout";

export const LogoutButton = () => {
  return (
    <SlideButton
      text="Log out"
      onClick={() => {
        logout();
      }}
    />
  );
};
