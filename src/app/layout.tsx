import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Setup Inter for Body (Default)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Setup Plus Jakarta Sans for Headings
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // Masukkan kedua variable
        className={`${inter.variable} ${jakarta.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}