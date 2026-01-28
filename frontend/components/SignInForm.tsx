"use client";

import { Button, Form, Input } from "@heroui/react";
import { FormEvent } from "react";

import { signIn } from 'next-auth/react';

export default function SignInForm() {
  async function formActionSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      email: formData.get("email"),
      password: formData.get("password")
    }

    signIn('credentials', {
      ...data,
      callbackUrl: "/dashboard"
    });
  }

  return (
    <Form className="w-xl gap-10" onSubmit={formActionSignIn}>
      <span>Delta Code Crafter</span>
      <Input
        name="email"
        type="email"
        label="E-mail"
        labelPlacement="outside"
        placeholder="Digite seu e-mail"
        required
        errorMessage="Preencha o campo com um e-mail valido"
      />
      <Input
        name="password"
        type="password"
        label="Senha"
        labelPlacement="outside"
        placeholder="Digite sua senha"
        required
        errorMessage="Preencha o campo com a sua senha"
      />
      <div>
        <Button type="submit" color="primary">Entrar</Button>
      </div>
    </Form>
  );
}