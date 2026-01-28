"use client";

import { Button } from "@heroui/button";
import { signOut } from "next-auth/react";

export default function ButtonLogout() {
  return (
    <Button color="danger" onPress={() => signOut()}>Sair</Button>
  )
}