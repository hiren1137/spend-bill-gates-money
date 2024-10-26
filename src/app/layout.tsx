import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script"; 

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Spend Bill Gates' Money | Interactive Wealth Simulator",
  description: "Experience Bill Gates' Money through an interactive spending simulator. Buy luxuries, invest in tech, or change the world with a billionaire's budget.",
  icons: {
    icon: "/spend-bill-gates-money.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

    <head>
      {/* Google Analytics */}
      <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-8ZGBK23K4L"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8ZGBK23K4L');
          `}
          </Script>
    </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}