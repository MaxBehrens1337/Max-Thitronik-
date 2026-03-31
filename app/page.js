"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function Home() {
  const router = useRouter();
  const { Auth } = useAuth();

  useEffect(() => {
    if (Auth && Auth.isLoggedIn()) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [Auth, router]);

  return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Leite weiter...</div>;
}
