import type React from "react"
import type { Metadata } from "next"
import { Navbar } from "@/Components/Layout/Navbar"
import { Footer } from "@/Components/Layout/Footer"
import { AuthProviderWrapper } from "@/Components/Providers/AuthProviderWrapper"
import { I18nProvider } from "@/lib/i18n/context"

import "./globals.css"

export const metadata: Metadata = {
  title: "Saba Match - Empowering Girls Through Safe Digital Job Matching",
  description: "A safe, secure platform connecting girls and women with remote work opportunities. Apply from home with confidence and digital safety protection.",

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <I18nProvider>
          <AuthProviderWrapper>
            <Navbar />
            {children}
            <Footer />
          </AuthProviderWrapper>
        </I18nProvider>
      </body>
    </html>
  )
}
