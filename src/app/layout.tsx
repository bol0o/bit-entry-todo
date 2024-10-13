import React from 'react';
import { Rubik } from 'next/font/google';
import '../../sass/globals.scss';

const inter = Rubik({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'] });

export const metadata = {
    title: 'To-Do',
    description: 'Zadanie rekrutacyjne do BIT Webu :)',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={inter.className}>
            <body>{children}</body>
        </html>
    );
}
