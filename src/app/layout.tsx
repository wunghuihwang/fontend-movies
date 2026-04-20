"use client"

import Header from "@/shared/ui/Header";
import { usePathname } from "next/navigation";
import "./globals.css";
import Providers from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    const hideHeader = pathname === '/login'

    return (
        <html lang="ko">
            <body>
                <Providers>
                    {!hideHeader && <Header />}
                    {children}
                </Providers>
            </body>
        </html>
    )
}