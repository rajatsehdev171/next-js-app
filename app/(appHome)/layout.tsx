import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,params
}: Readonly<{
  children: React.ReactNode,params:any
}>) {
  console.log('childer000---',params)
  return (
    <html lang="en">
      <body className={inter.className}>
        {<Header/>}
        <main>
        {children}
        </main>
        {<Footer/>}
      </body>
    </html>
  );
}
