"use client";

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    variable: '--font-nunito',
});

export default function WelcomePageThird() {
    const [step, setStep] = useState(2);
    const router = useRouter();

    const dots = [0, 1, 2];

    const routes = ['/teaser-screens/teaser-screen', '/teaser-screens/teaser-SecondScreen', '/teaser-screens/welcome-screen'];

    return (
        <div className="flex min-h-screen" >
            <div className="w-200 relative">
                <div className="absolute inset-0 overflow-hidden">
                    <Image
                        src="/images/right-third.png"
                        alt="Legal scale"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>
            </div>

            <div className="w-3/5 flex flex-col justify-center items-center p-12 bg-white">
                <p className="text-center mb-10 max-w-120 mt-10 text-3xl">
                    Log in to begin managing justice with confidence and generate reports efficiently.
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



                <button
                    onClick={() => router.push('/authentication/sign-in')}
                    className="bg-[#7B1824] text-white py-2 px-6 rounded font-semibold text-xl hover:bg-red-900 transition cursor-pointer w-80 h-15"
                >
                    Get started
                </button>

            </div>
        </div>
    );
}
