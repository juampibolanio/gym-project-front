import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/common/components/layout/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://gymsystem-pro.vercel.app"),
  title: {
    template: "%s | GymSystem",
    default: "GymSystem - Terminal de Administradores",
  },
  description: "Terminal de gestión y administración para centros de entrenamiento.",
  openGraph: {
    title: "GymSystem - Terminal de Administradores",
    description: "Plataforma integral de gestión para tu gimnasio.",
    siteName: "GymSystem",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
