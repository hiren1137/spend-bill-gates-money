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

// Schema Data
const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      'name': 'Spend Bill Gates Money',
      'applicationCategory': 'FinanceApplication, GameApplication',
      'description': 'Interactive simulator that lets you experience spending Bill Gates money on luxury items, investments, and world-changing projects.',
      'url': 'https://www.spendbillgatesmoney.xyz',
      'image': 'https://www.spendbillgatesmoney.xyz/spend-bill-gates-money.webp',
      'creator': {
        '@type': 'Person',
        'name': 'H'
      },
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'features': [
        'Interactive spending simulator',
        'Real-time balance updates',
        'Various luxury items and investments',
        'Share results on social media'
      ]
    },
    {
      '@type': 'Game',
      'name': 'Spend Bill Gates Money Simulator',
      'description': 'Experience what it\'s like to spend Bill Gates\' fortune through an interactive simulator.',
      'url': 'https://www.spendbillgatesmoney.xyz',
      'image': 'https://www.spendbillgatesmoney.xyz/spend-bill-gates-money.webp',
      'genre': ['Simulation', 'Educational', 'Finance'],
      'inLanguage': 'en',
      'isAccessibleForFree': true,
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      }
    }
  ]
};

export const metadata: Metadata = {
  title: "Spend Bill Gates Money - Experience How To Spend Billions",
  description: "Spend Bill Gates money in this interactive simulator. Ever wondered how to spend Bill Gates money? Experience what it's like to spend billions on luxury items, investments, and world-changing projects!",
  keywords: "spend bill gates money, bill gates spend money, billionaire simulator, spend billions, bill gates fortune",
  metadataBase: new URL('https://www.spendbillgatesmoney.xyz'),
  alternates: {
    canonical: 'https://www.spendbillgatesmoney.xyz',
  },
  openGraph: {
    title: 'Spend Bill Gates Money - Interactive Billions Spending Simulator',
    description: 'Spend Bill Gates money in our interactive simulator! See how you would spend Bill Gates money on luxury items, investments, and world-changing projects.',
    url: 'https://www.spendbillgatesmoney.xyz',
    siteName: 'Spend Bill Gates Money',
    images: [
      {
        url: '/spend-bill-gates-money.webp',
        width: 1200,
        height: 630,
        alt: 'Spend Bill Gates Money Simulator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spend Bill Gates Money - Interactive Billions Simulator',
    description: 'Spend Bill Gates money in our interactive simulator! Experience spending billions on luxury items, investments, and world-changing projects.',
    images: ['/spend-bill-gates-money.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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
      {/* Schema.org Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      {/* Google AdSense */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3157767614642943"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      
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