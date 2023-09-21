import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Meme Gallery",
  description: "A fully responsive gallery for all your memes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
