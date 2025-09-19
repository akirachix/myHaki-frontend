import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: "MyHaki",
  description: "Admin dashboard for managing legal cases",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
        
      >

        {children}
      </body>
    </html>
  );
}
