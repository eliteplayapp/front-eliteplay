import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./global/components/header";
import { getInformacoesGlobais, getPaginaInicial, getStrapiMedia } from "./global/services/strapi.service";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ElitePlay",
  description: "A plataforma de entretenimento para arenas e espaços de lazer.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globais = await getPaginaInicial();

  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* {JSON.stringify(getStrapiMedia(globais?.logo?.url ?? null))} */}
        {JSON.stringify(globais)}

        {children}
      </body>
    </html>
  );
}
