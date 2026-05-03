import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/sections/global/header";
import { getInformacoesGlobais, getStrapiMedia } from "../services/strapi.service";

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
  const informacoesGlobais = await getInformacoesGlobais();

  const rawLogoUrl = informacoesGlobais?.logo_global?.url;
  const logoUrl = getStrapiMedia(rawLogoUrl);

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <Header
          logoUrl={logoUrl}
          logoAlt={informacoesGlobais?.logo_global?.alternativeText || "ElitePlay"}
          headerData={informacoesGlobais?.header}
        />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
