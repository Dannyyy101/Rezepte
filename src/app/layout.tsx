import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import Navbar from "./components/ui/Navbar";
import ThemeProvider from "./components/ThemeProvider";
import { AuthContextProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rezepte101",
  description: "Leckere Rezepte :)",
  icons: {
    icon: "/favicon.png",
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
        <link rel="icon" href="/favicon.png" />
      </head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <body>
      <ThemeProvider>
        <AuthContextProvider>
            <Navbar />
            {children}
        </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
