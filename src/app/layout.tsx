import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: `${site.name} — ${site.tagline}. A faith community rooted in love, worship, and serving the world around us.`,
  metadataBase: new URL("https://thescepterglobal.com"),
  openGraph: {
    title: site.name,
    description: `${site.tagline}. Worship, grow, and serve with ${site.name}.`,
    type: "website",
  },
  icons: {
    icon: "/logos/logo-cream-on-navy.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${robotoCondensed.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white font-display text-navy">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
