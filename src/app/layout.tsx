import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "International Radio",
  description: "Listen to radio stations from around the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-[Poppins,sans-serif] antialiased">
        {children}
      </body>
    </html>
  );
}
