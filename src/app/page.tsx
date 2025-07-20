'use client';

import { Inter } from 'next/font/google';
import { HomePage } from '../components/home/home-page';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className={inter.className}>
      <HomePage />
    </div>
  );
}