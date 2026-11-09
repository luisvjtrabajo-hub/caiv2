import type { Metadata } from "next";
import "./globals.css";
import "./public.css";

export const metadata: Metadata = {
  title: "CAI · Cruzada Apologética Itinerante",
  description: "Una sola fe. Una misión compartida. Tu espacio de misiones, comunidad y crecimiento en la Cruzada Apologética Itinerante.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
