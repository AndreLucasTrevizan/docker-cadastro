'use client';

import { Button, Input } from '@heroui/react';

import { signIn } from 'next-auth/react'

export default function HomePage() {


  return (
    <main className='h-screen flex justify-center items-center'>
      <Button color='primary' onPress={() => signIn("github", {
        callbackUrl: "/dashboard"
      })}>Login com Github</Button>
    </main>
  );
}