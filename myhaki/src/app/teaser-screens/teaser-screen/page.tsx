"use client";

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WelcomePageFirst() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const dots = [0, 1, 2];

  const routes = ['/teaser-screens/teaser-screen', '/teaser-screens/teaser-SecondScreen', '/teaser-screens/welcome-screen'];

  return (
    <div className="flex min-h-screen ">
      <div className="w-200 relative">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/right-one.png"
            alt="Legal scale"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      </div>

      <div className="w-3/5 flex flex-col justify-center items-center p-12 bg-white ">
        <h1 className="text-6xl font-semi-bold mb-4">Welcome!</h1>
        <p className="text-center mb-10 max-w-120 mt-10 text-3xl">
          Empowering you to manage legal aid cases with clarity and control.
        </p>

        <div className="flex space-x-6 mb-10 mt-10">
          {dots.map((dot) => (
            <span
              key={dot}
              className={`block w-3 h-3 rounded-full cursor-pointer ${dot === step ? 'bg-[#7B1824]' : 'bg-[#A87352]'
                }`}
              onClick={() => {
                setStep(dot);
                router.push(routes[dot]);
              }}
              aria-label={`Step ${dot + 1}`}
            />
          ))}
        </div>



        <div className="flex items-center gap-6">
          <button
            onClick={() => router.push('/teaser-screens/teaser-SecondScreen')}
            className="bg-[#7B1824] text-white py-1.5 px-5 rounded font-semibold text-lg hover:bg-red-900 transition cursor-pointer w-70 h-13"
          >
            Next
          </button>
          <button
            onClick={() =>router.push('/signup')}
            className="bg-[#A87352] text-white py-1 px-4 rounded font-semibold text-lg hover:bg-grey-100 transition cursor-pointer w-60 h-12"
          >
            Skip
          </button>
        </div>

      </div>
    </div>
  );
}
