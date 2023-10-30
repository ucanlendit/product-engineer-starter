"use client";
// import Image from 'next/image'
// import { Button } from "@nextui-org/button";
import Stepper from '@/components/stepper'

export default function Home() {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-between pt-0 p-24 light">
      <Stepper/>
    </main>
  );
}
