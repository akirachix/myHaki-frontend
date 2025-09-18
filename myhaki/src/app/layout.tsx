import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import InitAuthToken from "./components/InitAuthToken";


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: "MyHaki Admin App",
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
        <InitAuthToken />
        {children}
      </body>
    </html>
  );
}
