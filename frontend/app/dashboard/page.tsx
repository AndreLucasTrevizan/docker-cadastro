import { Button } from "@heroui/button";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import ButtonLogout from "./ButtonLogout";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <header className="container mx-auto flex justify-end p-4">
        <ButtonLogout />
      </header>
      <main className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <p>Bem-vindo, {session?.user?.name}</p>
        {session.user?.image && (
          <Image
            width={200}
            height={200}
            src={session.user?.image}
            alt="Avatar Github"
          />
        )}
      </main>
    </>
  );
}