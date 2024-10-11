import React from 'react';
import '../../sass/globals.scss';

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
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
