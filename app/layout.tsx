import type { Metadata } from "next";
import { Playfair_Display, Poppins, Pinyon_Script } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Lumière — Luxury Lash & Beauty Studio",
  description:
    "Lumière is a luxury lash & beauty studio in Woburn, MA specializing in lash extensions, brows, facials, and laser treatments — enhancement, not transformation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} ${pinyon.variable}`}
    >
      <body className="bg-cream-100 text-mocha-600 font-body antialiased">
        {children}
      </body>
    </html>
  );
}
