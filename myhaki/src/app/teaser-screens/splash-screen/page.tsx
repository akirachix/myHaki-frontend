"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-nunito',
});

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/teaser-screens/teaser-screen");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col justify-between items-center h-screen bg-white" style={{
      fontFamily: nunito.style.fontFamily
    }}>

      <div className="flex flex-col items-center mt-24">
        <Image
          src="/images/logo-two.png"
          alt="MyHaki Logo"
          width={200}
          height={120}
          priority
        />
        <p className="mt-25 font-semibold text-black text-2xl">
          Your choice. Your Justice. Your Haki.
        </p>
      </div>

      <div className="w-480 relative bottom-0">
        <Image
          src="/images/bottom.png"
          alt="Bottom Wave"
          width={1000}
          height={200}
          priority
          className="object-cover"
          style={{ width: "100%", height: "auto" }}
        />

      </div>
    </main>
  );
}
