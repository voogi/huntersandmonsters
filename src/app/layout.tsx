import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/app/components/header/header';
import Footer from '@/app/components/footer/footer';

const anton = localFont({
  // src: "./fonts/badaboom.ttf",
  // src: "./fonts/AntonSC-Regular.ttf",
  src: './fonts/Anta-Regular.ttf',
  variable: '--font-anton',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Hunters and Monsters',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={`${anton.className} antialiased p-2 flex flex-col`} style={{ height: '100vh', maxHeight: '100vh' }}>
        <Header />
        <div className={'flex-1 w-full flex max-h-[calc(100%_-_5rem)]'}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
