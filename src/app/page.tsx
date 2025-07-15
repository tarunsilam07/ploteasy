// app/page.tsx
'use client'; // This is needed because HomePage and its children use client-side hooks

import { Inter } from 'next/font/google';
import { HomePage } from '../components/home/home-page'; // Adjust the path if needed

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className={inter.className}>
      <HomePage />
    </div>
  );
}