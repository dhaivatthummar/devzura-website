import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Devzura IT Labs | Building Scalable Digital Solutions",
    template: "%s | Devzura IT Labs",
  },
  description:
    "Devzura IT Labs helps startups and businesses build powerful software products. Web development, mobile apps, SaaS, cloud & DevOps, UI/UX design, AI & automation.",
  keywords: [
    "software development",
    "web development",
    "mobile app development",
    "SaaS development",
    "cloud computing",
    "DevOps",
    "UI/UX design",
    "AI automation",
    "IT services",
    "Devzura",
  ],
  authors: [{ name: "Devzura IT Labs" }],
  creator: "Devzura IT Labs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devzura.com",
    siteName: "Devzura IT Labs",
    title: "Devzura IT Labs | Building Scalable Digital Solutions",
    description:
      "Devzura IT Labs helps startups and businesses build powerful software products.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Devzura IT Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devzura IT Labs",
    description: "Building Scalable Digital Solutions",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0B0F19" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main className="pt-[72px] lg:pt-[80px]">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
