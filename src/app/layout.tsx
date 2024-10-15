import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const anton = localFont({
  // src: "./fonts/badaboom.ttf",
  // src: "./fonts/AntonSC-Regular.ttf",
  src: "./fonts/Anta-Regular.ttf",
  variable: "--font-anton",
    weight: '400'
});

export const metadata: Metadata = {
  title: "Hunters and Monsters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${anton.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
