"use client";
import { useSession } from "next-auth/react";


import { signIn, signOut } from "../_actions/auth";
import { Button } from "@headlessui/react";

export default function AuthButton() {
  const session = useSession();

  return session?.data?.user ? (
    <Button
      onClick={async () => {
        await signOut();
        await signIn();
      }}
    >
      {session.data?.user?.name} : Sign Out
    </Button>
  ) : (
    <Button onClick={async () => await signIn()}>Sign In</Button>
  );
}