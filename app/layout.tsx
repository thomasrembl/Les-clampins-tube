import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <head>
          <title>Clampins Tube</title>
          <link rel="apple-touch-icon" href="/flavicon.png" />
          <link rel="icon" href="/flavicon.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#0F0F0F" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased b-g-#0F0F0F`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
