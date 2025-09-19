"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="flex-grow flex flex-col justify-center max-w-md w-full mx-auto px-6 py-10 items-center">
                <div className="mb-6">
                    <Image
                        src="/signin-images/successimage.png"
                        alt="Lock"
                        width={200}
                        height={200}
                        priority
                        className="mx-auto"
                    />
                </div>
                <h1 className="text-4xl font-bold text-center text-[#7B1824] mb-4 leading-relaxed">
                    Congratulations!
                </h1>
                <p className="text-lg text-gray-700 mb-6 text-center whitespace-nowrap leading-relaxed">
                    Your account has been successfully recovered.
                </p>

                <button
                    className="w-48 bg-[#a7744a] hover:bg-[#7e5b32] text-white font-semibold py-2 px-4 rounded-lg text-lg shadow transition mb-16 mt-10"
                    onClick={() => router.push("/authentication/sign-in")}
                >
                    Sign In
                </button>
            </div>
            <div className="relative w-full flex-shrink-0" style={{ height: "280px" }}>
                <Image
                    src="/signin-images/Group 20.png"
                    alt="Wave"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="100vw"
                    priority
                />
            </div>
        </div>
    );
}

